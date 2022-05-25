const axios = require("axios");
class MessageTextController {
  async sendResponseFood(number) {
    try {
      let response = await axios
        .post(
          "https://graph.facebook.com/v13.0/111352084917163/messages",
          {
            messaging_product: "whatsapp",
            to: number,
            recipient_type: "individual",
            type: "text",
            text: {
              body: "Hola, tenemos de 1lts, 2lts,  2.5lts y 3lts pero solo de sabores",
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.TEMPTOKEN}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.info(res.status));
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  }
  async sendResponseForm(number, res) {
    try {
      let textRes = "";
      if (res === "Sí") {
        textRes =
          "Pronto estaremos enviando un formulario de registro, les deseamos un buen día";
      } else {
        textRes = "Agradecemos su tiempo, les deseamos un buen día";
      }
      let response = await axios
        .post(
          "https://graph.facebook.com/v13.0/111352084917163/messages",
          {
            messaging_product: "whatsapp",
            to: number,
            recipient_type: "individual",
            type: "text",
            text: {
              body: textRes,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.TEMPTOKEN}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => console.info(response.status));
      return;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new MessageTextController();
