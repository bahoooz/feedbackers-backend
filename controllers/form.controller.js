const createForm = async (req, res) => {
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
};

// A compléter
const QCMForm = async (req, res) => {
  res.json({ message: "Voici le formulaire" });

  try {
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
  } catch (error) {
    res.status(400).send(error);
  }
};

// A compléter
const freeForm = async (req, res) => {
  res.json({ message: "Voici le formulaire" });

  try {
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
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = createForm;
module.exports = freeForm;
module.exports = QCMForm;
