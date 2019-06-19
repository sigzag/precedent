class EventConsumer {
	constructor(events) {
		const that = this;
		this.consumer = function(event, data) {
			if (events.includes(event)) try {
				that[event](data, this.user);
			} catch (e) {
				console.error(e);
				console.log(event, data);
				this.emit('alert', e.message);
			}
		};
	}
	on(socket) {
		if (socket)
			socket.on('message', this.consumer);
	}
	off(socket) {
		if (socket)
			socket.removeListener('message', this.consumer);
	}
}

module.exports = EventConsumer;
