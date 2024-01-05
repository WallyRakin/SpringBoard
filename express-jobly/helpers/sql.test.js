const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", () => {

    test("It should generate a proper partial update query with one field", () => {
        const result = sqlForPartialUpdate(
            { name: "TestCompany" },
            { name: "name" }
        );
        expect(result).toEqual({
            setCols: `"name"=$1`,
            values: ["TestCompany"],
        });
    });

    test("It should generate a proper partial update query with multiple fields", () => {
        const result = sqlForPartialUpdate(
            { name: "TestCompany", numEmployees: 100 },
            { name: "name", numEmployees: "num_employees" }
        );
        expect(result).toEqual({
            setCols: `"name"=$1, "num_employees"=$2`,
            values: ["TestCompany", 100],
        });
    });

    test("It should correctly use the jsToSql mapping", () => {
        const result = sqlForPartialUpdate(
            { firstName: "John", age: 30 },
            { firstName: "first_name", age: "age" }
        );
        expect(result).toEqual({
            setCols: `"first_name"=$1, "age"=$2`,
            values: ["John", 30],
        });
    });

    test("It should throw a BadRequestError when no data is provided", () => {
        expect(() => {
            sqlForPartialUpdate({}, {});
        }).toThrow(BadRequestError);
    });
});
