import express from "express";

const app = express();
app.use(express.json());

app.post("/api/log", (req, res) => {
  console.log("Visitor Info:", req.body);
  return res.status(200).json({ status: "logged" });
});

app.listen(3000, () => {
  console.log("Logger running at http://localhost:3000");
});