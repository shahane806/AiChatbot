const chatbotModel = require("../Models/chatbotModel");
const chatbotCRUD_Controller = async (req, res) => {
  console.log(req?.route?.methods);
  console.log(req?.body);

  const newChatbotData = req?.body;
  if (req?.route?.methods?.get == true) {
    const viewAllChatbots = await chatbotModel.find();

    res?.status(200).send(viewAllChatbots);
  } else if (req?.route?.methods?.post == true) {
    try {
      const newChatbot = await chatbotModel({
        icon: newChatbotData?.chatbotIcon,
        name: newChatbotData?.chatbotName,
        backendUrl: newChatbotData?.chatbotBackendUrl,
        frontendUrl: newChatbotData?.chatbotUIPath,
      }).save();
      console.log(newChatbot);
      res
        ?.status(200)
        .send({
          message: "Chatbot Added Successfully",
          newChatbot: newChatbot,
        });
    } catch (e) {
      res?.status(201).send(e.message);
    }
  } else if (req?.route?.methods?.patch == true) {
    const _id = req?.params?.id;
    let bot = await chatbotModel.findOne({_id:_id})
    if(bot == null || bot == undefined || bot == ""){
      return res?.status(201).send({Message:"Chatbot not found"})
    }else{
     if((!req?.body?.chatbotIcon || !req?.body?.chatbotName || !req?.body?.chatbotBackendUrl || !req?.body?.chatbotUIPath )&& req?.body?._id){
       return res?.status(200).send({Message:"Chatbot Found"});
      }else{
       await chatbotModel.findByIdAndUpdate({_id:_id},{$set:{icon:req?.body?.chatbotIcon,name:req?.body?.chatbotName,backendUrl:req?.body?.chatbotBackendUrl,frontendUrl:req?.body?.chatbotUIPath,modifyTime:new Date()}})
       return res?.status(200).send({Message:"Chatbot Updated."});
     }
      

    }
  } else if (req?.route?.methods?.delete == true) {
    try {
      const searchBot = await chatbotModel?.findOne({ _id: req?.params?.id });
      console.log(searchBot);
      if (searchBot == undefined || searchBot == null || searchBot == "") {
        return res?.status(201).send({ Message: "Chatbot Not Found" });
      } else {
        const deletedBot = await chatbotModel?.deleteOne({
          _id: req?.params?.id,
        });
        if (deletedBot != undefined || deletedBot != null || deletedBot != "") {
          res
            ?.status(200)
            .send({
              Message:
                "Chatbot Deleted Successfully of id : " + req?.params?.id,
            });
        } else {
          res?.status(500).send("Internal Server Error");
        }
      }
    } catch (error) {
      res?.send(500).send({ Message: "Internal Server Error" });
    }
  }
};
module.exports = { chatbotCRUD_Controller };
