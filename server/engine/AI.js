const uuid = require('uuid/v4');
const generateName = require('../util/name');

class AI {
	constructor(user) {
		this.id = user ? user.id : uuid();
		this.name = user ? `${user.name}'s AI buddy` : generateName();
	}
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			ai: true,
		};
	}
}

module.exports = AI;
