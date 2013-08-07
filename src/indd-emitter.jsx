#target InDesign-7.0
#include "emitter.js"

// https://github.com/necolas/emitter.js

// -- emit.js prototype override

Emitter.prototype.off = function (event, callback) {
  var argsLen = arguments.length;
  var callbacks;
  var index;

  // if there are no arguments, delete the registry
  if (argsLen === 0) {
    removeEvent.call(this);
    return this;
  }
  
  // if there is one argument, delete the event
  if (argsLen === 1) {
    removeEvent.call(this, event);
    return this;
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError('Emitter.off(): the 2nd argument must be a function.')
  }
  else {
    callbacks = this.getListeners(event);
    index = indexOf(callbacks, callback);
    // if the callback is not found,
    // check if it's registered as a one-off callback
    if (index === -1) {
      index = indexOf(callbacks, callback._wrapper);
    }
    // if the callback is registered or wrapped, remove it
    if (index !== -1) {
      callbacks.splice(index, 1);
      // if there are no callbacks left, delete the event
      if (callbacks.length === 0) {
        removeEvent.call(this, event);
      }
    }
  }

  return this;
  
  // remove an event
  // if an event is not specified, delete the entire registry
  function removeEvent(event) {
    // don't bother if there's no registry yet
    if (this.__proto__._registry) {
      if (event) {
        // delete the event from the registry
        delete this.__proto__._registry[event];
      }
      else {
        // delete the registry
        delete this.__proto__._registry;
      }
    }
  }
};

Emitter.prototype.getListeners = function (event) {
  // get the registry; create it if missing
  var registry = this.__proto__._registry || (this.__proto__._registry = {});
  // get the array of callbacks for an event; create it if missing
  var callbacks = registry[event] || (registry[event] = []);
  
  return callbacks;
};

// -- my emitter

var InddEmitter = function(obj){
  var proto = Emitter.prototype;
  for(var k in proto){
    if(Object.prototype.hasOwnProperty.call(proto,k)){
      obj.__proto__[k] = proto[k];
    }
  }
  return obj;
};