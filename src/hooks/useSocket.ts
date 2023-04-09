import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function useSocket(path: string, namespace: string) {
  const [socket, setSocket] = useState(io(path + namespace));

  useEffect(() => {
    setSocket(io(path + namespace));
  }, [path, namespace]);

  return socket;
}

export default useSocket;
