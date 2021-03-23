import io from "socket.io-client";

const {SOCKET_HOST, SOCKET_PORT} = require('./values/preferences.json')

const socket = io.connect(`${SOCKET_HOST}:${SOCKET_PORT}`);

export default socket;
