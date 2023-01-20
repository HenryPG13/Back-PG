let cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dyq3k2znh",
  api_key: "796244116793665",
  api_secret: "2u7vlmMKX7rgR1GbJFkPyH5Um0E",
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log("funciona, amen");
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: "se rompio todo, contacté con Maxi :)" });
    });
  });
};

module.exports = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) =>{
      if(result && result.secure_url){
        console.log("funciona, amen")
        return resolve(result.secure_url)
      }
      console.log(error.message)
      return reject({message: "se rompio todo, contacté con Maxi :)"})
    })
  })

};

module.exports.uploadMultipleImages = (images) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => uploadImage(base));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};