import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from '@clerk/express';
import { response } from "express";
import axios from "axios";
import FormData from "form-data";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import { pdf } from "pdf-parse";



const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({ success: false, message: "Limit reached. Upgrade to continue." })
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const content = response.choices[0].message.content

        await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }
        
        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({ success: false, message: "Limit reached. Upgrade to continue." })
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt,},],
            temperature: 0.7,
            max_tokens: 700,
        });

        const content = response.choices[0].message.content

        await sql`INSERT INTO creations(user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog_title')`;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }
        
        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { prompt, publish } = req.body;
        const plan = req.plan;
 
        if (plan !== "premium" ) {
            return res.json({ success: false, message: "This feature is only available for premium users." })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)
        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers : {     'x-api-key': process.env.CLIPDROP_API_KEY,},
            responseType: "arraybuffer",
        })
        
        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

        const {secure_url} = await cloudinary.uploader.upload(base64Image)
 
 
        await sql`INSERT INTO creations(user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false })`;

 
        res.json({ success: true, content: secure_url })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


export const  removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth;
        const plan = req.plan;
        const image = req.file;
 
        if (plan !== "premium" ) {
            return res.json({ success: false, message: "This feature is only available for premium users." })
        }

        const {secure_url} = await cloudinary.uploader.upload(image.path, {
            transformation :[ {
                effect : 'background_removal',
                background_removal: 'remove_the_background'
            }
        ]
        })
 
 
        await sql`INSERT INTO creations(user_id, prompt, content, type ) VALUES (${userId}, 'remove background from image', ${secure_url}, 'image')`;

        res.json({ success: true, content: secure_url })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


export const  removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth;
        const {  object } = req.body;
        const plan = req.plan;
        const image = req.file;
 
        if (plan !== "premium" ) {
            return res.json({ success: false, message: "This feature is only available for premium users." })
        }

        const {public_id} = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id,{
            transformation : [{effect: `gen_remove:${object}`}],
            resource_type: 'image'
        } )
 
 
        await sql`INSERT INTO creations(user_id, prompt, content, type ) VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;
        
        res.json({ success: true, content: imageUrl })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const  resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth;
        const plan = req.plan;
        const resume = req.file;
 
        if (plan !== "premium" ) {
            return res.json({ success: false, message: "This feature is only available for premium users." })
        }
            
        if(resume.size > 5 * 1024 * 1024){
            return res.json({success : false, message : "resume file size exceeds 5MB"})
        }
        
        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        const prompt = `You are an intelligent document reviewer. Analyze the uploaded document and follow these rules carefully:

        **STEP 1: Identify Document Type**
        First, determine if this document is a professional resume/CV or not.
        
        A resume/CV must contain at least 2 of these elements:
        - Professional work experience with job titles and descriptions
        - Education details (degree, university, graduation dates)
        - Professional skills section
        - Contact information with career-related details
        - Career objective or professional summary
        
        **STEP 2: If it IS a resume/CV, provide this analysis:**
        
        ## Resume Analysis
        
        ### Merit Points (Strengths)
        - List all strong points already present in the resume
        - Highlight well-written sections
        - Note good formatting choices
        - Mention impressive achievements
        
        ### Areas for Improvement
        - List missing elements that should be added
        - Identify weak sections that need strengthening
        - Suggest content improvements
        - Point out vague or unclear descriptions
        
        ### ATS Optimization Suggestions
        - Suggest keyword improvements for better ATS scanning
        - Recommend formatting changes for ATS compatibility
        - Advise on section organization and structure
        - Suggest standard section headers to use
        
        ### ATS Score: [X]/100
        Provide a realistic score from 0-100 based on:
        - Keyword density and relevance
        - Format compatibility with ATS systems
        - Content completeness
        - Section organization and clarity
        - Use of action verbs and quantifiable results
        
        ---
        
        ## Updated Resume (LaTeX Code)
        
        Then, generate ONLY the updated LaTeX resume code using this exact template structure with FontAwesome icons:
        
        \`\`\`latex
        \\documentclass[a4paper,10pt]{article}
        \\usepackage[a4paper,margin=0.75in]{geometry}
        \\usepackage{enumitem}
        \\usepackage{xcolor}
        \\usepackage{hyperref}
        \\usepackage{titlesec}
        \\usepackage{parskip}
        \\usepackage{fontawesome}
        
        % Colors
        \\definecolor{linkcolor}{HTML}{0A66C2}
        \\hypersetup{
          colorlinks=true,
          linkcolor=linkcolor,
          urlcolor=linkcolor
        }
        
        % Section formatting
        \\titleformat{\\section}{\\large\\bfseries\\sffamily}{}{0em}{}[\\titlerule]
        
        \\begin{document}
        
        % Header
        \\begin{center}
          {\\Huge \\textbf{[FULL NAME FROM RESUME]}}\\\\[0.5em]
          \\href{mailto:[email]}{\\faEnvelope\\ [email]} \\quad| 
          \\faMapMarker\\ [City, State] \\quad| 
          \\faPhone\\ [phone number]\\\\
          \\href{[linkedin url]}{\\faLinkedin\\ LinkedIn} \\quad|
          \\href{[github url]}{\\faGithub\\ GitHub} \\quad|
          \\href{[portfolio url]}{\\faGlobe\\ Portfolio}
        \\end{center}
        
        \\vspace{1em}
        
        % Professional Summary
        \\section*{\\faUser\\ \\hspace{0.5em}Professional Summary}
        [Write a compelling 3-4 line professional summary based on the resume content. Highlight years of experience, key expertise areas, major achievements, and career focus. Make it impactful and results-oriented.]
        
        % Experience
        \\section*{\\faBriefcase\\ \\hspace{0.5em}Experience}
        
        \\textbf{[Job Title] – [Company Name]} \\hfill \\textit{[Start Date] – [End Date/Present]}\\\\
        \\textit{[City, State]}
        \\begin{itemize}[leftmargin=*]
          \\item \\textbf{[Key Achievement or Responsibility]:} [Description with quantifiable results - use action verbs and metrics]
          \\item \\textbf{[Impact or Project]:} [Description showing business value and outcomes]
          \\item \\textbf{[Technical Achievement]:} [Description of technical skills applied and results achieved]
          \\item [Add 2-4 more bullet points based on resume content]
        \\end{itemize}
        
        [Repeat for each job in the resume - most recent first]
        
        \\textbf{[Previous Job Title] – [Company Name]} \\hfill \\textit{[Start Date] – [End Date]}\\\\
        \\textit{[City, State]}
        \\begin{itemize}[leftmargin=*]
          \\item [Achievement with metrics]
          \\item [Responsibility with impact]
          \\item [Technical contribution]
        \\end{itemize}
        
        % Education
        \\section*{\\faGraduationCap\\ \\hspace{0.5em}Education}
        
        \\textbf{[Degree Name]} \\hfill \\textit{[Start Year] – [End Year]}\\\\
        [University Name], [City, State] \\quad — \\textbf{[GPA/CGPA if available and > 3.0]}\\\\
        [Add relevant coursework, honors, or achievements if mentioned]
        
        [Add more education entries if available]
        
        % Skills
        \\section*{\\faCogs\\ \\hspace{0.5em}Skills}
        
        \\textbf{Programming Languages:} [List from resume - e.g., Python, JavaScript, Java, C++]\\\\
        \\textbf{Frameworks \\& Libraries:} [List from resume - e.g., React, Node.js, Django, TensorFlow]\\\\
        \\textbf{Tools \\& Technologies:} [List from resume - e.g., Git, Docker, AWS, Jenkins]\\\\
        \\textbf{Databases:} [List from resume - e.g., MySQL, MongoDB, PostgreSQL]\\\\
        \\textbf{Soft Skills:} [List from resume - e.g., Leadership, Communication, Problem-Solving]\\\\
        \\textbf{Languages:} [List spoken languages if mentioned]
        
        % Projects (if applicable)
        \\section*{\\faCode\\ \\hspace{0.5em}Projects}
        
        \\textbf{[Project Name]} \\hfill \\href{[github/demo link if available]}{\\faGithub\\ Code | \\faExternalLink\\ Demo}\\\\
        [Brief description of the project, technologies used, and key features. Mention impact or results if available.]
        
        \\textbf{[Project Name 2]} \\hfill \\href{[link]}{\\faGithub\\ Code}\\\\
        [Description with technologies and outcomes]
        
        [Add more projects based on resume content]
        
        % Certifications
        \\section*{\\faCertificate\\ \\hspace{0.5em}Certifications}
        
        \\textbf{[Certification Name] – [Issuing Organization]} \\hfill \\href{[certificate link if available]}{Certificate Link}\\\\
        [Brief description or key skills learned]\\\\[1em]
        
        \\textbf{[Certification 2] – [Organization]} \\hfill \\href{[link]}{Certificate Link}\\\\
        [Description]
        
        [Add all certifications from resume. Remove section if none available]
        
        % Achievements
        \\section*{\\faTrophy\\ \\hspace{0.5em}Achievements}
        
        \\begin{itemize}[leftmargin=*]
          \\item \\textbf{[Achievement Title]:} [Description with specific metrics, dates, and impact]
          \\item \\textbf{[Award/Recognition]:} [Details about the achievement and its significance]
          \\item \\textbf{[Competition/Hackathon]:} [What was achieved and the outcome]
          \\item [Add more achievements from resume]
        \\end{itemize}
        
        [Remove this section if no achievements are mentioned in the resume]
        
        % Publications (if applicable for academic/research roles)
        \\section*{\\faFileText\\ \\hspace{0.5em}Publications}
        
        \\textbf{[Paper Title]} \\hfill \\href{[DOI/link]}{\\faExternalLink\\ Link}\\\\
        [Authors]. \\textit{[Conference/Journal Name]}, [Year]
        
        [Add publications if mentioned. Remove section if none available]
        
        % Volunteer Experience (if applicable)
        \\section*{\\faHeart\\ \\hspace{0.5em}Volunteer Experience}
        
        \\textbf{[Role] – [Organization]} \\hfill \\textit{[Date Range]}\\\\
        [Description of volunteer work and impact]
        
        [Add if mentioned in resume. Remove section if not applicable]
        
        \\end{document}
        \`\`\`
        
        **Important Instructions for LaTeX Generation:**
        1. Extract ALL information from the original resume accurately
        2. Improve descriptions with strong action verbs (Led, Developed, Implemented, Achieved, Optimized, etc.)
        3. Add quantifiable metrics wherever possible (percentages, numbers, timeframes)
        4. Use appropriate FontAwesome icons for each section
        5. Maintain professional tone and formatting consistency
        6. Remove sections that don't have content in the original resume (e.g., if no certifications, remove that section)
        7. For technical roles: emphasize Programming Languages, Frameworks, Tools sections
        8. For non-technical roles: emphasize relevant professional skills and achievements
        9. Keep bullet points concise but impactful (1-2 lines each)
        10. Ensure all hyperlinks are properly formatted with \\href{url}{text}
        11. Use proper LaTeX escaping for special characters (&, %, $, #, etc.)
        12. Maintain chronological order (most recent first) for experience and education
        
        ---
        
        **STEP 3: If it is NOT a resume/CV:**
        
        Do NOT generate any LaTeX code. Instead, provide this analysis:
        
        ## Document Analysis
        
        ### Document Type Identification
        This document is: [Clearly identify what type of document this is - e.g., "ration card statement", "bank statement", "invoice", "report", "article", "legal document", etc.]
        
        ### Document Overview
        [Provide a clear 3-5 sentence summary explaining what this document contains and its purpose. Be specific about the type of information present.]
        
        ### Key Information Identified
        - **Primary Content:** [What is the main content of this document?]
        - **Document Purpose:** [What is this document used for?]
        - **Key Details Found:** [List 3-5 main details or data points in the document]
        
        ### Important Keywords
        [List 5-10 important keywords or terms found in the document]
        
        ### Professional Context
        [Explain in 2-3 sentences whether this document has any professional/career value and why it cannot be converted into a resume]
        
        ---
        
        **CRITICAL RULES:**
        1. DO NOT generate LaTeX code for non-resume documents
        2. DO NOT try to convert random documents (invoices, statements, receipts, etc.) into resumes
        3. If the document lacks professional work experience AND education details, it is NOT a resume
        4. Be honest and clear about document type identification
        5. For resumes, the LaTeX code must be complete, properly formatted, and ready to compile
        6. Use proper LaTeX escaping for special characters: & → \\&, % → \\%, $ → \\$, # → \\#, _ → \\_
        7. All URLs must be properly formatted with \\href{url}{display text}
        8. Section icons must match the content type appropriately
        
        ---
        
        Now analyze this document:
        
        Resume Content:
        
        ${pdfData.text}`;
                const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens:  7000,
        });

        const content = response.choices[0].message.content

        await sql`INSERT INTO creations(user_id, prompt, content, type ) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;
        
        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}