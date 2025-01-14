const db = require("../models");
let createSpecialty = (data) => {
  console.log("mvh cche",data)
  return new Promise(async (resolve, reject) => {
    console.log("mvh cche",data);
    try {
      // if(!data.descriptionHTML) {

      //   // Gán giá trị mặc định
      //   data.descriptionHTML = 'a';
      // }
      if (
        !data.name ||
        !data.imageBase64  ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) 
      
      {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMesssage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errMessage: "ok",
        errCode: 0,
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
// let getDetailSpecialtyById = (inputId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!inputId) {
//         resolve({
//           errCode: 1,
//           errMessage: "Missing parameter",
//         });
//       } else {
//         let data = await db.Specialty.findOne({
//           where: {
//             id: inputId,
//           },
//           attributes: ["descriptionHTML", "descriptionMarkdown"],
//         });
//         if (data) {
//           //do something
//         } else data = {};
//         resolve({
//           errMessage: "ok",
//           errCode: 0,
//           data,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  // getDetailSpecialtyById: getDetailSpecialtyById,
};
