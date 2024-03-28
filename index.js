require("dotenv").config();
const connectDb = require("./services/mongoose");
const Routes = require("./routes/routes.js");
const authRoutes = require("./routes/auth.route.js")
const formRoutes = require("./routes/form.route.js")

const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;

connectDb().catch((err) => console.log(err));

app.use(express.json());
app.use(Routes);

async function createForm(title, fields) {
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
      `https://api.typeform.com/forms/${formId}/responses`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("err", err);
  }
}

async function QCMForm() {
  const form = await createForm("Testing form", [
    {
      title: "Connaissez-vous cette marque ?",
      type: "yes_no",
      validations: { required: true },
    },
    {
      title: "Quelle est votre adresse email ?",
      type: "email",
      validations: { required: true },
    },
    {
      title: "Quel est votre prénom ?",
      type: "short_text",
      validations: { required: true },
    },
    {
      title: "Quel est votre nom de famille ?",
      type: "short_text",
      validations: { required: true },
    },
    {
      title: "Quel est votre âge ?",
      type: "number",
      validations: { required: true },
    },
    {
      title: "Quel est votre code postal ?",
      type: "number",
      validations: { required: true },
    },
    {
      title: "Que pensez-vous de la pub que vous avez scanné ?",
      type: "multiple_choice",
      validations: { required: true, max_selection: 1 },
      properties: {
        choices: [
          { label: "J'adore" },
          { label: "J'aime" },
          { label: "J'aime assez" },
          { label: "Je n'aime pas" },
          { label: "Je déteste" },
        ],
      },
    },
    {
      title: "Cette pub vous a t'elle donné(e) envie d'aller découvrir JBL ?",
      type: "opinion_scale",
      validations: { required: true },
      properties: {
        steps: 6,
      },
    },
    {
      title:
        "Après avoir vu cette pub, recommanderiez-vous cette marque a un ami ?",
      type: "yes_no",
      validations: { required: true },
    },
    {
      title: "Avez-vous des remarques ou des suggestions envers cette pub ?",
      type: "long_text",
      validations: { required: true },
    },
    {
      title: "Qu'avez vous pensé du formulaire ?",
      type: "rating",
      validations: { required: true },
      properties: {
        steps: 5,
      },
    },
  ]);
  console.log(form);
  const answers = await getAnswers(form.id);
  console.log(answers);
}

async function FreeForm() {
  const form = await createForm("Testing form", [
    {
      title: "Connaissez-vous cette marque ?",
      type: "short_text",
      validations: { required: true },
    },
    {
      title: "Quelle est votre adresse email ?",
      type: "email",
      validations: { required: true },
    },
    {
      title: "Quel est votre prénom ?",
      type: "short_text",
      validations: { required: true },
    },
    {
      title: "Quel est votre nom de famille ?",
      type: "short_text",
      validations: { required: true },
    },
    {
      title: "Quel est votre âge ?",
      type: "number",
      validations: { required: true },
    },
    {
      title: "Quel est votre code postal ?",
      type: "number",
      validations: { required: true },
    },
    {
      title: "Que pensez-vous de la pub que vous avez scanné ?",
      type: "long_text",
      validations: { required: true },
    },
    {
      title: "Cette pub vous a t'elle donné(e) envie d'aller découvrir JBL ?",
      type: "short_text",
      validations: { required: true },
    },
    {
      title:
        "Après avoir vu cette pub, recommanderiez-vous cette marque a un ami ?",
      type: "short_text",
      validations: { required: true },
    },
    {
      title: "Avez-vous des remarques ou des suggestions envers cette pub ?",
      type: "long_text",
      validations: { required: true },
    },
    {
      title: "Qu'avez vous pensé du formulaire ?",
      type: "long_text",
      validations: { required: true },
    },
  ]);
  console.log(form);
  const answers = await getAnswers(form.id);
  console.log(answers);
}

// Appeler la fonction du formulaire : QCMForm() / FreeForm()
// QCMForm();

app.listen(port, () => console.log(`Le serveur est lancé sur le port ${port}`));
