const fs = require("fs");
const axios = require("axios");
class MediaController {
  //Hace una petición get para obtener la foto por medio del url que se recibe de la función GetUrlImag
  async SaveImage(url, idImg) {
    try {
      await axios
        .get(url, {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${process.env.TEMPTOKEN}`,
          },
        })
        .then(async (res) => {
          await fs.writeFileSync(`./imgs/${idImg}.jpeg`, res.data, (err) => {
            if (err) {
              throw err;
            }
          });
          fs.closeSync();
        });
    } catch (error) {
      return error;
    }
  }

  //Hace una petición get a la api usando el Id que viene en el mensaje del usuario
  async getUrlImg(id) {
    try {
      let url = await axios
        .get("https://graph.facebook.com/v13.0/" + id, {
          headers: {
            Authorization: `Bearer ${process.env.TEMPTOKEN}`,
            "Content-Type": "image/jpeg",
          },
        })
        .then(async (res) => {
          return res.data.url;
        });
      //llama a la función para guardar la imagen una vez el url se haya obetinido, tiene una duración de 5 minutos luego de eso el url es invalido
      await this.SaveImage(url, id);
      console.info("imagen guardada");
    } catch (error) {
      return error;
    }
  }
}
module.exports = new MediaController();
