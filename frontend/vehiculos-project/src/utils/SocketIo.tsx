import io from 'socket.io-client';

const socket = io('https://18.190.64.227/vehiculo/loc');
export default socket;