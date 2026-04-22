import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Home page under movies route"
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "Hello, World!"
  });
});

router.put("/", (req, res) => {
  res.json({
    message: "Hello, World!"
  });
});

router.delete("/", (req, res) => {
  res.json({
    message: "Hello, World!"
  });
});

export default router;
