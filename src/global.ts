import { SChannel, IChannel, RChannel, OChannel } from "./channels";

export {};
declare global {
  interface Window {
    ipcRenderer: {
      send: (channel: SChannel, data: any) => void;
      invoke: (channel: IChannel, data?: any) => Promise<any>;
      receive: (channel: RChannel, func: any) => void;
      once: (channel: OChannel, func: any) => void;
    };
  }
}
