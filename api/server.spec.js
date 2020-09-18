const request = require("supertest");
const server = require("./server.js");
const db = require("../data/db-config.js");

describe("server", () => {
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("burgers").truncate();
	});

	describe("GET /", () => {
		// using return
		it("should return 200 OK", () => {
			return request(server)
				.get("/")
				.then((res) => {
					expect(res.status).toBe(200);
				});
		});
		// using async await
		it("should return 200 OK using async/await", async () => {
			const res = await request(server).get("/");
			expect(res.status).toBe(200);
		});
	}); // PASSING

	describe("GETALL /burgers", () => {
		it("should return an array of 1", async () => {
			// add an item
			await request(server).post("/burgers").send({
				name: "server.js getAll TEST burger",
			});

			// look for it
			const burgerArray = await db("burgers");
			expect(burgerArray).toHaveLength(1);

			// get array
			const res = await request(server).get("/burgers");
			// expect(res.body).toBe([{}]);
			expect(res.body).toEqual(expect.arrayContaining(burgerArray));
		});
	}); // PASSING

	describe("POST /burgers", () => {
		// using return
		it("should add a burger", async () => {
			await request(server).post("/burgers").send({
				name: "server.js post TEST burger",
			});

			// check that burger is in the database
			const burgs = await db("burgers");
			expect(burgs).toHaveLength(1);
		});
	}); // PASSING

	describe("DELETE /burgers/:id", () => {
		// using return
		it("should delete a burger", async () => {
			await request(server).post("/burgers").send({
				name: "server.js delete TEST burger",
			});

			// check that burger is in the database
			const burgerDelete = await db("burgers");
			expect(burgerDelete).toHaveLength(1);

			// delete that burger
			await request(server).delete("/burgers/1");

			// check for burger's existance
			const burgerExist = await db("burgers");
			expect(burgerExist).toHaveLength(0);
		});
	}); // PASSING
	// outer describe for server
});
