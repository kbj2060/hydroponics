import io from "socket.io-client";

const {ip, socketIoPort} = require('root/values/preferences')

const socket = io.connect(`${ip}:${socketIoPort}`);

export default socket;
