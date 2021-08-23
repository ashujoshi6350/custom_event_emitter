class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, listener) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(listener);
  }

  off(name, listenerToRemove) {
    if (!this.events[name]) {
      throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
    }

    const removeListener = (listener) => listener !== listenerToRemove;

    this.events[name] = this.events[name].filter(removeListener);
  }

  emit(name, data) {
    if (!this.events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }

    this.events[name].forEach((fn) => {
      fn(data);
    });
  }
}



const myEventEmitter = new EventEmitter();

const handleMyEvent = (data) => {
 console.log(data);
};

const logEventHandler = () => {
 console.log('This is 2nd handler');
};


myEventEmitter.on('testEvent', handleMyEvent);
myEventEmitter.on('testEvent', logEventHandler);

myEventEmitter.emit('testEvent', 'hi');

myEventEmitter.off('testEvent', handleMyEvent);

console.log("after removing one handler:");
myEventEmitter.emit('testEvent', 'hi');

/* Output:
hi
This is 2nd handler
after removing one handler:
This is 2nd handler
*/

