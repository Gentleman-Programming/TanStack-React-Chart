import { Trade } from "./Trade";

export interface SocketData {
  topic: string;
  symbol: string;
  data: Trade[];
}
