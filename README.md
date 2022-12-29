# RTC

## Installation

1. `$ npm i @ruby-s/use-rtc`
2. Add `import useRTC from "@ruby-s/use-rtc"`

## How to use

### preinstalled-package

`$ npm install socket.io-client`

### Parameters

Only one object parameter is required.

```ts
{
  socket,
  participants,
  setParticipants,
}
```

`socket`

- type: `Socket` -> It depends on socket.io-client.

`participants`

- type: `Map<string, MediaStream>`

`setParticipants`

- type: `React.Dispatch<React.SetStateAction<Map<string, MediaStream>>>`

## Example

```ts
import { io } from "socket.io-client";

const socket = io("SERVER_URL");
const [participants, setParticipants] = useState<Map<string, MediaStream>>(
  new Map()
);

useRTC({ socket, participants, setParticipants });
```

Beware that if you create io inside a component, the socket object may be recreated every time it is rendered.

**participants**

participants is a Map.
The `key` is a string type `socketId`, and the `value` is a `MediaStream` type.

## Things to note

I have not been able to deploy Signaling Server because I have no financial income.
You should implement a simple signaling server.
The following are socket event name constants of Signaling Server.
Please make sure to name it below!

`server`  
| Event Name | EMIT or ON | description |
| --- | --- | --- |
| "send-hello" | ON | Get client connection |
| "receive-hello" | EMIT | Informing other clients of a particular client's position |
| "send-offer" | ON | Get an offer |
| "receive-offer" | EMIT | Send an offer to a specific client |
| "send-answer" | ON | Get an answer |
| "receive-answer" | EMIT | Send an answer to a specific client |
| "send-ice" | ON | Get an ice candidate |
| "receive-ice" | EMIT | Send an ice candidate to a specific client |
| "send-bye" | ON | Receive client exit event |
| "receive-bye" | EMIT | Notifying other clients of a specific client's exit |

## Example Code (Signaling socket server)

```ts
// .ts
import { Server } from "socket.io";

function SignalingSocketServer(io: Server) {
  io.on("connection", (socket) => {
    socket.on("send-hello", () => {
      const senderId = socket.id;
      socket.broadcast.emit("receive-hello", senderId); // broadcast
    });

    socket.on("send-offer", (offer, receiverId) => {
      const senderId = socket.id;
      socket.to(receiverId).emit("receive-offer", offer, senderId);
    });

    socket.on("send-answer", (answer, receiverId) => {
      const senderId = socket.id;
      socket.to(receiverId).emit("receive-answer", answer, senderId);
    });

    socket.on("send-ice", (ice, receiverId) => {
      const senderId = socket.id;
      socket.to(receiverId).emit("receive-ice", ice, senderId);
    });

    socket.on("send-bye", () => {
      const senderId = socket.id;
      socket.broadcast.emit("receive-bye", senderId);
    });
  });
}

export default SignalingSocketServer;
```
