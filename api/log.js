import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { ipinfo, gps, device } = req.body;

    try {
      await sql`
        INSERT INTO visitor_logs (ip, city, region, country, latitude, longitude, device)
        VALUES (
          ${ipinfo?.ip || null},
          ${ipinfo?.city || null},
          ${ipinfo?.region || null},
          ${ipinfo?.country || null},
          ${gps?.latitude || null},
          ${gps?.longitude || null},
          ${device || null}
        )
      `;

      console.log("Saved visitor info:", req.body);
      res.status(200).json({ status: "saved" });
    } catch (err) {
      console.error("DB insert error:", err);
      res.status(500).json({ error: "Failed to save visitor info" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
