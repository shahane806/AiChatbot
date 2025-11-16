import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
const SocketContext = createContext();

const GetSocket = () => useContext(SocketContext);
const SocketProvider = ({ Children }) => {
  const user = useSelector((state) => {
    return state?.firebase_user_reducer;
  });
  const user2 = useSelector((state) => {
    return state?.auth_reducer;
  });
  const [_id,setId] = useState(user?.user?.uid||user2?.user?._id);
  const [authtoken, setAuthToken ] = useState(user?.user?.stsTokenManager?.accessToken||user2?.authToken);
  const socket = useMemo( () =>  io(process.env.REACT_APP_SOCKET_BASE_URL,{
    auth:{_id,authtoken : `Bearer${authtoken}`}
  }), []);
  user2?.user?.email &&  socket.emit("userOnline",user2?.user?.email)
  user?.user?.email && socket.emit("userOnline",user?.user?.email)
  
  return (
    <SocketContext.Provider value={socket}>{Children}</SocketContext.Provider>
  );
};
export { GetSocket, SocketProvider };
