import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const AdminGetSocket = () => useContext(SocketContext);
const AdminSocketProvider = ({ Children }) => {
  const _id = JSON.parse(localStorage.getItem("admin-info"))?._id;
  const authtoken = localStorage.getItem("admin-access-token");
  const socket = useMemo( () =>  io(process.env.REACT_APP_SOCKET_BASE_URL,{
    auth:{_id,authtoken : `Bearer${authtoken}`}
  }), []);
  socket.emit("userOnline",JSON.parse(localStorage.getItem("admin-info"))?.adminLoginEmail)
  return (
    <SocketContext.Provider value={socket}>{Children}</SocketContext.Provider>
  );
};
export { AdminGetSocket, AdminSocketProvider };
