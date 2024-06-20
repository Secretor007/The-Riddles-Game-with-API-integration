import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://riddles-api.vercel.app/random");
    const result = response.data;
    if (
      response.data.riddle.length > 500 ||
      response.data.answer.length > 500
    ) {
      res.redirect("/");
    } else {
      res.render("index.ejs", { content: result });
    }
  } catch (error) {
    res.send(500);
  }
});

app.get("/next", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
