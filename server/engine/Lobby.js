const uuid = require('uuid/v4');
const generateName = require('../util/name');

class Lobby {
	constructor() {
		this.users = new Map();
		this.rooms = new Map();
	}

	register(user) {
		this.users.set(user.name, user);
		this.browse(user);
	}
	deregister(user) {
		this.users.delete(user.name);
	}
	
	browse(user) {
		user.room = null;
		user.socket.emit('rooms', Array.from(this.rooms.values()).filter((room) => !room.game));
	}
	join(user, room) {
		user.room = room;
		room.on(user.socket);
		room.players.push(user);
		room.update();
	}

	open(room) {
		this.rooms.set(room.id, room);
		this.broadcast('open', room);
	}
	update(room) {
		if (this.rooms.has(room.id))
			this.broadcast('update', room);
	}
	close(room) {
		this.rooms.delete(room.id);
		this.broadcast('close', room);
	}
	
	get browsing() {
		return Array.from(this.users.values()).filter((user) => !user.room);
	}
	broadcast(...args) {
		this.browsing.forEach((user) => user.socket.emit(...args));
	}
}

module.exports = new Lobby();
