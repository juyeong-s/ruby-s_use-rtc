import { STUN_SERVER } from "../constants/rtc";

export const peerConnectionConfig = {
  iceServers: [
    {
      urls: STUN_SERVER,
    },
  ],
};
