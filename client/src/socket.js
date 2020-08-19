import io from "socket.io-client";

const {ip, socketIoPort} = require('./client_property');
const socket = io.connect(`${ip}:${socketIoPort}`);

export default socket;
