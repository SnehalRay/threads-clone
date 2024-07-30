import { createContext, useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        const socket = io("https://threads-clone-api-one.vercel.app/", {
            query: {
                userId: user?._id
            },
            withCredentials: true
        });
        setSocket(socket);

        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        }) // I AM LISTENING TO THE EVENTS

        return () => socket && socket.close();
    }, [user?._id]);

    console.log(onlineUsers, "Online Users");

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}
