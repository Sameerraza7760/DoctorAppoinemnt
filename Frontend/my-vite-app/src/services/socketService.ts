import io from "socket.io-client";

const socketUrl = "http://localhost:8001";
const socket = io(socketUrl, { transports: ["websocket"] });

export default socket;
