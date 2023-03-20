const EventEmitter = require('events');

module.exports = class TicketManager extends EventEmitter {
  constructor(supply) {
    super();
    this.supply = supply;
  }

  buy(email, price) {
    this.supply--;
    this.emit('buy', email, price, Date.now());
  }
};
