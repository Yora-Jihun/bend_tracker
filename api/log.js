import { neon } from '@neondatabase/serverless';

export const config = {
  runtime: 'nodejs20.x',
};

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    let body = req.body;
    
    if (!body || typeof body === 'string') {
      try {
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(chunk);
        }
        const rawBody = Buffer.concat(chunks).toString();
        body = rawBody ? JSON.parse(rawBody) : {};
      } catch (e) {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    try {
      await sql`CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        ipinfo JSONB,
        device TEXT,
        gps JSONB,
        latitude NUMERIC,
        longitude NUMERIC
      )`;
      
      await sql`INSERT INTO visitors (ipinfo, device, gps, latitude, longitude)
        VALUES (${JSON.stringify(body.ipinfo)}, ${body.device}, ${JSON.stringify(body.gps)},
                ${body.gps?.latitude}, ${body.gps?.longitude})`;
      
      console.log("Visitor saved:", body);
      return res.status(200).json({ status: "logged" });
    } catch (e) {
      console.error("Database error:", e);
      return res.status(500).json({ error: "Database write failed" });
    }
  }
  
  return res.status(405).json({ error: "Method not allowed" });
}