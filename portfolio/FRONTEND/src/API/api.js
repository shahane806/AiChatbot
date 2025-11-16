import axios, { toFormData } from "axios";
const API = axios.create({
  baseURL: process.env.REACT_APP_REST_API_BASE_URL,
});
export let getFile = async (_id, authToken, filename) => {
  const res = await API.get("/uploads/" + _id + "/" + filename, {
    headers: { _id, Authorization: `Bearer${authToken}` },
  }).then((res) => {
    return res;
  });
  return res;
};
export let uploadFile = async (formData) => {
  console.log(formData);
  const _id = formData.get("_id");
  const authToken = formData.get("authToken");
  const lastModified = formData.get("lastModified");
  console.log(authToken);
  const res = await API.post("/upload", formData, {
    headers: {
      // "Content-Type": "multipart/form-data",
      _id,
      Authorization: `Bearer${authToken}`,
      lastModified : lastModified,
    },
  }).then((res) => {
    return res;
  });
  console.log(res);
  return res;
};
export let uploadMultiFiles = async (multiFiles) => {
  console.log(multiFiles);
  const _id = multiFiles.get("_id");
  const authToken = multiFiles.get("authToken");
  console.log(authToken);
  const res = await API.post("/upload/multiFiles", multiFiles, {
    headers: {
      "Content-Type": "multipart/form-data",
      _id,
      Authorization: `Bearer${authToken}`,
    },
  }).then((res) => {
    return res;
  });
  return res;
};
export let signUpWithEmailIdAndPassword = async (username, email, password) => {
  const res = await API.post("/auth/signup", {
    username,
    email,
    password,
  }).then((res) => {
    return res;
  });
  return res;
};
export let loginWithEmailIdAndPassword = async (email, password) => {
  const res = await API.post("/auth/login", { email, password }).then((res) => {
    return res;
  });
  return res;
};
export let adminLoginWithEmailIdAndPassword = async (email, password) => {
  const res = await API.post("/Admin/Auth", { email, password }).then((res) => {
    return res;
  });
  return res;
};

export let forgetPassword = async (email, currentPassword, newPassword) => {
  const res = await API.post("/auth/forgetPassword", {
    email,
    currentPassword,
    newPassword,
  }).then((res) => {
    return res;
  });
  return res;
};
export let getAllChatsAndResponses = async (_id, authToken) => {
  console.log("API",_id,authToken)
  const res = await API.get("/getAllChatsAndResponses", {
    headers: { _id, Authorization: `Bearer${authToken}` },
  }).then((res) => {
    return res;
  });
  return res;
};

export let getUserSignupCount = async(_id,authToken) =>{
  // const authToken = localStorage.getItem("admin-access-token");
  // const _id = JSON.parse(localStorage.getItem("admin-info"))?._id;
  console.log(_id,authToken)
  const res = await API.get("/getUserSignupCount",{ headers: { _id, Authorization: `Bearer${authToken}` }}).then((res)=>{
    return res?.data?.count
  })
  return res;
} 
export let getAdminSignupCount = async(_id,authToken)=>{
  console.log(_id,authToken)
  const res = await API.get("/getAdminSignupCount",{headers:{_id,Authorization:`Bearer${authToken}`}}).then((res)=>{
    return res?.data?.count
  })
  return res;
}

export let viewAllChatbots = async(_id,authToken)=>{
  console.log(_id,authToken)
  const res = await API.get("/Admin/Dashboard/Chatbot/viewAllChatbots",{headers:{_id,Authorization:`Bearer${authToken}`}}).then((res)=>{
    console.log(res)
    return res
  })
  return res;
}
export let addNewChatbot = async(_id,authToken,data)=>{
  console.log(_id,authToken)
  const res = await API.post("/Admin/Dashboard/Chatbot/addNewChatbot",data,{headers:{_id,Authorization:`Bearer${authToken}`}}).then((res)=>{
    console.log(res)
    return res
  })
  return res;
}
export let deleteChatbot = async(_id,authToken,data)=>{
  console.log(_id,authToken,data)
  const res = await API.delete(`/Admin/Dashboard/Chatbot/deleteChatbot/${data}`,{headers:{_id,Authorization:`Bearer${authToken}`}}).then((res)=>{
    return res
  })
  return res;
}
export let updateChatbot = async(_id,authToken,data)=>{
  console.log(_id,authToken,data)
  const res= await API.patch(`/Admin/Dashboard/Chatbot/updateChatbot/${data?._id}`,data,{headers:{_id,Authorization:`Bearer${authToken}`}}).then((res)=>{
    return res
  })
  return res
}
export let findChatbot = async(_id,authToken,data)=>{
  console.log(_id,authToken,data)
  const res = await API.get(`/Admin/Dashboard/Chatbot/findChatbot/${data?._id}`,data,{headers:{_id,Authorization:`Bearer${authToken}`}}).then((res)=>{
    return res
  })
  return res
}