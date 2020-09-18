const db = require("../data/db-config.js");
const BM = require("./mcdonaldsModel.js");

describe("mcdonaldsModel", () => {
	// Truncate to work with empty database
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("burgers").truncate();
	}); // PASSING

	// TESTING insert()
	describe("insert()", () => {
		it("should add a burger", async () => {
			// make reqeust, send data
			await BM.insert({
				name: "insert TEST burger",
			});

			// check the burger is in the database (without using GET / route)
			const burger = await db("burgers");

			expect(burger).toHaveLength(1);
		});
	}); // PASSING

	// TESTING getAll()
	describe("getAll()", () => {
		it("should return all burgers", async () => {
			const BurgersAll1 = await db("burgers");

			expect(BurgersAll1).toHaveLength(0);
			// expect(allBurgers).toHaveLength(1); // intentional failure
		});
	}); // PASSING

	// TESTING findById()
	describe("findById()", () => {
		it("should return a single burger by ID", async () => {
			// step 1 show that the db is empty
			const BurgersById1 = await db("burgers");
			expect(BurgersById1).toHaveLength(0);

			// step 2 add an item to the database and prove it exists
			await BM.insert({
				name: "find by ID TEST burger",
			});
			const BurgersById2 = await db("burgers");
			expect(BurgersById2).toHaveLength(1);

			// step 3 find the item by ID
			expect(BurgersById2[0].id).toBe(1);
		});
	}); // PASSING

	// TESTING remove()
	describe("remove()", () => {
		it("should delete a single burger by ID", async () => {
			// step 1 show that the db is empty
			const BurgersDel1 = await db("burgers");
			expect(BurgersDel1).toHaveLength(0);

			// step 2 add an item to the database and prove it exists
			await BM.insert({
				name: "delete TEST burger",
			});
			const BurgersDel2 = await db("burgers");
			expect(BurgersDel2).toHaveLength(1);

			// step 3 delete the item just added and prove it has been deleted
			const BurgersDel3 = await db("burgers");
			expect(BurgersDel3).toHaveLength(1);
			const id = BurgersDel3[0].id;
			await BM.remove(id).del();

			// step 4 prove that it was removed
			const BurgersDel4 = await db("burgers");
			expect(BurgersDel4).toHaveLength(0);
		});
	}); // PASSING
});
