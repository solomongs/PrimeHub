import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// In-Memory Lead Store
interface Lead {
  id: string;
  clientName: string;
  email: string;
  targetRoles: string;
  location: string;
  roleVolume: number;
  industry: string;
  notes?: string;
  timestamp: string;
  emailSimulated: {
    sent: boolean;
    recipient: string;
    sender: string;
    subject: string;
    body: string;
    smtpLog: string;
  };
}

const leads: Lead[] = [
  {
    id: "lead-1",
    clientName: "Lagos TechScale Ventures",
    email: "hiring@techscale.ng",
    targetRoles: "Senior Backend Engineer, Product Manager",
    location: "Lagos",
    roleVolume: 2,
    industry: "FinTech & Banking",
    notes: "Requires fast staffing as we expand our merchant portals. Need PenCom regulatory templates checklist, and customized Nigeria job offers templates.",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    emailSimulated: {
      sent: true,
      recipient: "support@primehubhr.com",
      sender: "leads-gateway@primehubhr.com",
      subject: "[PrimeHub Lead Portal] New Executive Placement request from Lagos TechScale Ventures",
      body: "Company: Lagos TechScale Ventures\nEmail: hiring@techscale.ng\nHiring: Senior Backend Engineer, Product Manager\nLocation: Lagos Core\nStrategic Advisory Notes: Wants PenCom checklists and customizable local contracts.",
      smtpLog: "220 smtp.primehubhr.com ESMTP Postfix\nHELO mail.primehubhr.com\n250 mail.primehubhr.com, pleased to meet you\nMAIL FROM:<leads-gateway@primehubhr.com>\n250 2.1.0 Ok\nRCPT TO:<support@primehubhr.com>\n250 2.1.5 Ok\nDATA\n354 End data with <CR><LF>.<CR><LF>\nSubject: [PrimeHub Lead Portal] New Executive Placement request\n\nMESSAGE DELIVERED SUCCESSFULLY TO QUEUE."
    }
  }
];

// POST /api/leads
app.post("/api/leads", (req, res) => {
  const { clientName, email, targetRoles, location, roleVolume, industry, notes } = req.body;
  
  if (!clientName || !email || !targetRoles) {
    return res.status(400).json({ error: "Missing required fields: clientName, email, targetRoles" });
  }

  const id = `lead-${Date.now()}`;
  const timestamp = new Date().toISOString();

  // Create Simulated Support Email Log
  const smtpLog = `220 smtp.primehubhr.com ESMTP Postfix\nHELO mail.primehubhr.com\n250 mail.primehubhr.com, pleased to meet you\nMAIL FROM:<leads-gateway@primehubhr.com>\n250 2.1.0 Ok\nRCPT TO:<support@primehubhr.com>\n250 2.1.5 Ok\nDATA\n354 End data with <CR><LF>.<CR><LF>\nSubject: [PrimeHub Lead Portal] New Advisory & Hiring Request from ${clientName}\nTo: support@primehubhr.com\nFrom: leads-gateway@primehubhr.com\n\n=========================================\nPRIMEHUB SECURE LEAD NOTIFICATION GATEWAY\n=========================================\n\nCompany Name: ${clientName}\nContact Email: ${email}\nDesired Roles: ${targetRoles}\nLocation Basis: ${location || 'Not Specified'}\nVolume Count: ${roleVolume || 1}\nBusiness Sector: ${industry || 'Not Specified'}\n\nStrategic Advisory Notes:\n${notes || 'No extra notes provided.'}\n\n-----------------------------------------\nLocal Compliance Matrix Suggested Requirements:\n- Pension Act (PRA 2014) dual enrollment setup\n- NSITF Employee compensation 1% payroll deduction\n- ITF training registration audits if turnover > ₦50M\n\n=========================================\n250 2.0.0 Ok: queued as ${id}-smtp-spool-server\nQUIT\n221 2.0.0 Bye`;

  const newLead: Lead = {
    id,
    clientName,
    email,
    targetRoles,
    location: location || "Lagos",
    roleVolume: roleVolume || 1,
    industry: industry || "FinTech & Banking",
    notes: notes || "",
    timestamp,
    emailSimulated: {
      sent: true,
      recipient: "support@primehubhr.com",
      sender: "leads-gateway@primehubhr.com",
      subject: `[PrimeHub Lead Portal] New Advisory & Hiring Request from ${clientName}`,
      body: `Company Name: ${clientName}\nEmail: ${email}\nDesired Roles: ${targetRoles}\nLocation: ${location || 'Lagos'}\nSector: ${industry}\n\nClient notes: ${notes || 'None'}`,
      smtpLog
    }
  };

  leads.unshift(newLead);
  res.status(201).json({ success: true, lead: newLead });
});

// GET /api/leads
app.get("/api/leads", (req, res) => {
  res.json({ success: true, leads });
});

// POST /api/chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Missing message parameter" });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not defined in Secrets panel
      return res.json({
        text: `I am currently operating in Offline Expert Advisor Mode because the GEMINI_API_KEY environment variable is not defined in settings.

Nonetheless, I can still assist you under human guidelines! In Nigeria, any company with 3 or more employees is contractually required by the Pension Reform Act of 2014 to structure payroll with minimum dual contributions: 10% employer-funded and 8% employee-funded.

Let's qualify your staffing requirements:
- **What is your company's name?**
- **What specific target vacancies are you currently hoping to fill?**
- **What is your primary contact email?**

Once we have these, you can click "Submit Lead info to Support" to send an email report directly to support@primehubhr.com!`
      });
    }

    const systemInstruction = 
      `You are the PrimeHub lead AI Support Advisor, a seasoned human resources expert, legal labor counsel, and recruitment systems engineer with over 15 years of operational experience in Nigeria (specifically active on the Lagos and Abuja legal state-level axes).

Your tone: Professional, articulate, highly informative, warm, yet exceptionally authoritative. Avoid generic boilerplate phrases. Give concrete, realistic advisory answers.

Your regulatory expertise:
1. Pension Reform Act (PRA 2014): Mandatory dual contributory scheme (10% Employer, 8% Employee) for companies with 3+ staffers. Managed via approved PFAs.
2. Nigeria Social Insurance Trust Fund (ECA / NSITF Act): 1% gross monthly payroll fee paid wholly by the employer config to protect workers against incidents.
3. Industrial Training Fund (ITF): 1% annual fee for firms with 5+ staff or ₦50M+ revenue. Offers 50% training audit refund recoveries.
4. State PAYE Rules: Direct state tax compliance setups (LIRS in Lagos, FCT-IRS in Abuja).

Your objective:
- Engage in premium corporate consulting with the user.
- Answer their direct questions regarding recruiting engineering, sourcing passive developers, executive hiring benchmarks, or payroll compliance.
- Help them assess their hiring needs. Proactively gather information to qualify them as a lead (Company Name, Target Roles to fill, and Contact Email).
- Keep conversations concise, structured, and split with clean linebreaks or micro headers.
- Since you can help them draft a lead form, summarize their inputs neatly, and then guide them to officially submit their lead on the page so it sends to our Support Desk via email.`;

    const chatHistory = history ? history.map((h: any) => {
      return {
        role: h.role, // 'user' or 'model'
        parts: [{ text: h.text }]
      };
    }) : [];

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory
    });

    const response = await chat.sendMessage({ message: message });
    res.json({ text: response.text });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI Advisor API." });
  }
});

// Configure dev vs prod static middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
