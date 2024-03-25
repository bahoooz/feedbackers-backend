require("dotenv").config();
const connectDb = require("./services/mongoose");
const Routes = require("./routes/routes");

const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;

connectDb().catch((err) => console.log(err));

app.use(express.json());
app.use(Routes);

async function createForm(title, field) {
  try {
    const url = "https://api.typeform.com/forms";
    const data = {
      title,
      fields,
    };
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("erreur :", err.response.data);
  }
}

async function getAnswers(formId) {
  try {
    const response = await axios.get(
      `https://api.typeform.com/forms/${formId}/responses`
    );
    return response.data;
  } catch (err) {
    console.error("err", err);
  }
}

async () => {
  const form = await createForm("Testing form", [
    { title: "What is your name ?", type: "short_text" },
    { title: "Any comments ?", type: "long_text" },
  ]);
  console.log(form);
  // const answers = await getAnswers(form.id);
  // console.log(answers)
};

app.listen(port, () => console.log(`Le serveur est lancé sur le port ${port}`));
