export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Visitor Info:", req.body);
    return res.status(200).json({ status: "logged" });
  }
  return res.status(405).json({ error: "Method not allowed" });
}