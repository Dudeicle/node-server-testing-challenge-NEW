exports.seed = function (knex, Promise) {
	return knex("burgers")
		.truncate()
		.then(function () {
			return knex("burgers").insert([
				{
					name: "Burger",
				},
				{
					name: "Bacon Burger",
				},
				{
					name: "Cheese Burger",
				},
			]);
		});
};
