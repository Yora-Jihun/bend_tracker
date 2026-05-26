import express from "express";

const app = express();
app.use(express.json());

app.post("/log", (req, res) => {
  console.log("Visitor Info:", req.body); // ✅ This prints in VS Code terminal
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Logger running at http://localhost:3000");
});
