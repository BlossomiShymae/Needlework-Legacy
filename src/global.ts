export {}
declare global {
  interface Window {
    "ipcRenderer": {
      send: (channel: string, data: any) => void;
      invoke: (channel: string, data?: any) => Promise<any>;
      receive: (channel: string, func: any) => void;
      once: (channel: string, func: any) => void;
    }
  }
}