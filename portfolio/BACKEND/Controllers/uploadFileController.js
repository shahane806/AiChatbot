const attachmentModel = require("../Models/attachmentModel");
const uploadSingleFileController = async (req, res) => {
  let file = req?.file;
  let _id = req?.body?._id;
  if (file == null || file == undefined) {
    return res?.status(400).send("File not upload");
  }
  
  if (_id == "" || _id == null || _id == undefined) {
    return res?.status(401).send("no user found");
  }
  
 let attachment =  await new attachmentModel({
    userId: {
      _id: _id,
    },
    attachment: {
      fieldname: file?.fieldname,
      originalname: file?.originalname,
      encoding: file?.encoding,
      mimetype: file?.mimetype,
      destination: file?.destination,
      filename: file?.filename,
      path: file?.path,
      size: file?.size,
    },
  }).save();
  return res?.status(200).send({message : "File upload Successfully", attachment})

};
const uploadMultipleFilesController = (req,res)=>{
  let files = req?.files;
  let _id = req?.headers._id;
  if(files == null || files == undefined){
    return res?.status(400).send("File not uploaded");

  }
  if(_id == null || _id == undefined){
    return res?.status(401).send("Unauthorized user found please login or signup first");
  }
  files.forEach(file => {
    new attachmentModel({
      userId: {
        _id: _id,
      },
      attachment: {
        fieldname: file?.fieldname,
        originalname: file?.originalname,
        encoding: file?.encoding,
        mimetype: file?.mimetype,
        destination: file?.destination,
        filename: file?.filename,
        path: file?.path,
        size: file?.size,
      },
    }).save();
  });
  
  return res?.send("file uploaded successfully")
}
module.exports = {
  uploadSingleFileController,
  uploadMultipleFilesController
};
