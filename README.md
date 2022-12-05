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

const socket = io("SERVER_URL" + "namespace");
const [participants, setParticipants] = useState<Map<string, MediaStream>>(
  new Map()
);

useRTC({ socket, participants, setParticipants });
```

Beware that if you create io inside a component, the socket object may be recreated every time it is rendered.

**participants**

participants is a Map.
The `key` is a string type `socketId`, and the `value` is a `MediaStream` type.
