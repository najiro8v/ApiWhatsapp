const mediaController = require("./media/mediaControllers");

class WebhookController {
  async connectionWebhook(req, res) {
    if (req.query["hub.verify_token"] === "testapitokenwhatsapp") {
      res.send(req.query["hub.challenge"]);
    } else {
      res.send("No tiene permisos para acceder");
    }
  }

  async reciveMessage(req, res) {
    let data = req.body;
    try {
      //objeto que guarda los datos principales
      let object = {};
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
                    object = { message: message, Type: message.type };
                  });
                }
              });
            }
          });
        }
      }
      if (object.Type === "image") {
        await mediaController.getUrlImg(object.message.image.id);
      } else if (object.Type === "text") {
        console.log(object.message);
      }
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  }
}
module.exports = new WebhookController();
