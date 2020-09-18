const db = require("../data/db-config.js");

module.exports = {
	insert,
	update,
	remove,
	getAll,
	findById,
};

async function insert(burger) {
	return db("burgers")
		.insert(burger, "id")
		.then((ids) => ids[0]);
}

async function update(id, changes) {
	return null;
}

function remove(id) {
	return db("burgers").where({ id }).del();
}

function getAll() {
	return db("burgers");
}

function findById(id) {
	return db("burgers");
}
