import { io } from "socket.io-client";
import env from "../config";

function useSocket(namespace: string) {
  const socket = io(env.SERVER_PATH + namespace);

  return socket;
}

export default useSocket;
