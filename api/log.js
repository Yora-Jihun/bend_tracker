import { json } from '@vercel/functions'; // if available
// or handle manually:

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await json(req);
      console.log("Visitor Info:", body);
      return res.status(200).json({ status: "logged" });
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}