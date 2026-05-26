export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("Visitor Info:", req.body); // ✅ GPS + IP appear in VS Code terminal
    res.status(200).json({ status: "logged" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
