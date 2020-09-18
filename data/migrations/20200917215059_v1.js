exports.up = function (knex) {
	return knex.schema
		.createTable("users", (tbl) => {
			tbl.increments("id");
			tbl.string("username").notNullable().unique();
			tbl.string("password").notNullable();
		})
		.createTable("burgers", (tbl) => {
			tbl.increments("id");
			tbl.string("name");
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("burgers").dropTableIfExists("users");
};

// tbl.boolean("bacon").notNullable().defaultTo(false);
// tbl.boolean("cheese").notNullable().defaultTo(false);
// tbl.boolean("onions").notNullable().defaultTo(false);
// tbl.boolean("pickles").notNullable().defaultTo(false);
// tbl.boolean("lettuce").notNullable().defaultTo(false);
// tbl.boolean("ketchup").notNullable().defaultTo(false);
// tbl.boolean("mustard").notNullable().defaultTo(false);
// tbl.boolean("toasted_bun").notNullable().defaultTo(false);
