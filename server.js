const express = require("express");
const cors = require("cors");
const axios = require("axios");
const curl = require("curl");
const port = 3000;
const app = express();
var bodyParser = require("body-parser");
const ngrok = require("ngrok");
const { text } = require("body-parser");

app.options("*", cors);
app.listen(port, () => {
  console.log("conectado");
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    axios.ad;
    let response = await axios
      .post(
        "https://graph.facebook.com/v13.0/111352084917163/messages",
        {
          messaging_product: "whatsapp",
          to: "50662002879",
          recipient_type: "individual",
          type: "text",
          text: {
            body: "Bienvenido a la nueva Api-test (Whatsapp) de RDS",
          } /*
          type: "interactive",
          interactive: {
            type: "button",
            body: {
              text: "your-text-body-content",
            },
            action: {
              buttons: [
                {
                  type: "reply",
                  reply: {
                    id: "unique-postback-id",
                    title: "First Button’s Title",
                  },
                },
                {
                  type: "reply",
                  reply: {
                    id: "unique-postback-id",
                    title: "Second Button’s Title",
                  },
                },
              ],
            }, // # end action
          },*/,
        },
        {
          headers: {
            Authorization:
              "Bearer EAAQoTCUDJ5MBANp7Ss3Blno8Mb21aF3ylZCT4qvhbHJZA56uqgJ5nYnlR3yZAuSK7TjqKBFWSug3nNsyiW3bEdNbOGI2OrMQAL4KcOpFmSbvz47b3BwzFXQLGnvZC70CiAm26DIA8rtgUGpFSyxg4yVfV5o5x8ffPMTjsxYfoLWohA7FD0tLSa8R5r6ZBOZA17dFGEXJDZA1QZDZD",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res.status));
    console.log(response);
    res.send("Woriking");
  } catch (err) {
    console.log(err);
  }
});

app.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === "testapitokenwhatsapp") {
    res.send(req.query["hub.challenge"]);
  } else {
    res.send("No tiene permisos para acceder");
  }
});
app.post("/webhook", (req, res) => {
  let data = req.body;
  //data.entry[0].changes[0].value.messages[0].text.body;
  if (data.object === "whatsapp_business_account") {
    if (data.entry !== undefined && data !== undefined) {
      data.entry.forEach((pageEntry) => {
        if (pageEntry !== undefined && pageEntry.changes !== undefined) {
          pageEntry.changes.forEach((data) => {
            if (
              data !== undefined &&
              data.value !== undefined &&
              data.value.messages !== undefined
            ) {
              data.value.messages.forEach((message) => {
                console.log(message);
                if (message.type === "text") {
                  let text = message.text.body;
                  if (text.toLowerCase().includes("coca")) {
                    sendResponseFood(message.from);
                  }
                }
                if (message.type === "button") {
                  sendResponseForm(message.from, message.button.text);
                }
              });
            }
          });
        }
      });
    }
    res.sendStatus(200);
  }
});

async function sendResponseFood(number) {
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
          Authorization:
            "Bearer EAAQoTCUDJ5MBANp7Ss3Blno8Mb21aF3ylZCT4qvhbHJZA56uqgJ5nYnlR3yZAuSK7TjqKBFWSug3nNsyiW3bEdNbOGI2OrMQAL4KcOpFmSbvz47b3BwzFXQLGnvZC70CiAm26DIA8rtgUGpFSyxg4yVfV5o5x8ffPMTjsxYfoLWohA7FD0tLSa8R5r6ZBOZA17dFGEXJDZA1QZDZD",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => console.log(res.status));
  return;
}

async function sendResponseForm(number, res) {
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
          Authorization:
            "Bearer EAAQoTCUDJ5MBANp7Ss3Blno8Mb21aF3ylZCT4qvhbHJZA56uqgJ5nYnlR3yZAuSK7TjqKBFWSug3nNsyiW3bEdNbOGI2OrMQAL4KcOpFmSbvz47b3BwzFXQLGnvZC70CiAm26DIA8rtgUGpFSyxg4yVfV5o5x8ffPMTjsxYfoLWohA7FD0tLSa8R5r6ZBOZA17dFGEXJDZA1QZDZD",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => console.log(response.status));
  return;
}
