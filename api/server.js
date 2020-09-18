const express = require("express");

const McD = require("../mcdonalds/mcdonaldsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.status(200).json({ api: "running..." });
});

server.get("/burgers", (req, res) => {
	McD.getAll()
		.then((burgers) => {
			res.status(200).json(burgers);
		})
		.catch((error) => {
			res.status(500).json("ERROR I WROTE");
		});
}); // WORKING

server.get("/burgers/:id", (req, res) => {
	const id = req.params.id;

	McD.findById(id)
		.then((burger) => {
			res.status(200).json(burger);
		})
		.catch((error) => {
			res.status(500).json("ERROR I WROTE");
		});
}); // WORKING

server.post("/burgers", (req, res) => {
	McD.insert(req.body)
		.then((ids) => {
			res.status(201).json({ data: ids });
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
}); // WORKING

server.delete("/burgers/:id", (req, res) => {
	const id = req.params.id;

	McD.remove(id)
		.then((ids) => {
			res.status(201).json({ message: `BURGER REMOVED!` });
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
});

module.exports = server;
