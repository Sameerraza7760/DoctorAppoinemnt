import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import socketUrl from "../services/socketService";

const useSocket = () => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = io(socketUrl, { transports: ["websocket"] });

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };

    
  }, []);

  return { socket: isConnected ? socketInstance : null, isConnected };
};

export default useSocket;
