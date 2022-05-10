export type MessageDTO = {
  opcode: number;
  event: string;
  object: {
    data: any;
    eventType: string;
    uri: string;
  };
};
