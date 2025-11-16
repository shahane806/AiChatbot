const getFileController= async(req,res)=>{ 
    return await res?.sendFile(__dirname.split("\\Controllers")[0]+"/uploads/"+req?.params?.uid+"/"+req?.params?.filename)
    }

module.exports = getFileController;