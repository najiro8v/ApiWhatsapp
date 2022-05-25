const webhookcontrollers = require("./webhookcontrollers");
const Router = require("express");

router = Router();
router.get("/", webhookcontrollers.connectionWebhook);
router.post("/", webhookcontrollers.reciveMessage);

module.exports = router;
