const webhook = require("./Webhook/webhookRoutes");
class appRoutes {
  initRoutes(app, basePath) {
    app.use(`/webhook`, webhook);
  }
}

module.exports = new appRoutes();
