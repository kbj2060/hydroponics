import io from "socket.io-client";

const {SOCKET_HOST, SOCKET_PORT} = require('root/values/preferences.json')

const socket = io.connect(`${SOCKET_HOST}:${SOCKET_PORT}`);

export default socket;
