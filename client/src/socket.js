import io from "socket.io-client";

const {ip, socketIoPort} = require('./PROPERTIES');
const socket = io.connect(`${ip}:${socketIoPort}`);

export default socket;
