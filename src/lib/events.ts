import { EventEmitter } from 'events';

// Global singleton for the event emitter
// In a real production environment, you'd use Redis or a Message Broker
// but for a local demo, this is the most efficient and reliable way.
const eventEmitter = new EventEmitter();

export const IOT_EVENT = 'iot_update';

export const broadcastUpdate = (data: any) => {
  eventEmitter.emit(IOT_EVENT, data);
};

export const subscribeToUpdates = (callback: (data: any) => void) => {
  eventEmitter.on(IOT_EVENT, callback);
  return () => eventEmitter.off(IOT_EVENT, callback);
};
