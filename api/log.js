export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("Visitor Info:", req.body); // ✅ shows in VS Code terminal when running `vercel dev`
    res.status(200).json({ status: "logged" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
