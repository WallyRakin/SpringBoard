### **Function: `sqlForPartialUpdate`**

**Purpose:**
Generates a partial SQL update statement for dynamically updating selected columns in a database record. It is particularly useful for patching records when only a subset of the fields need to be updated.

**Parameters:**

- **`dataToUpdate`** (Object): An object where the keys represent the JavaScript field names to be updated and the values are the new values for those fields.
- **`jsToSql`** (Object): An object mapping JavaScript camelCase field names to their corresponding SQL snake_case column names. If a mapping isn't provided for a field, it assumes the field name in the database is the same as in JavaScript.

**Returns:**
An object with two properties:

- **`setCols`** (String): A string representing the SQL code for setting the new values, formatted as **`'"columnName"=$1, "anotherColumnName"=$2'`**, etc. This string is intended to be used in an SQL **`UPDATE`** statement.
- **`values`** (Array): An array of the new values corresponding to the columns in **`setCols`**. The order of values matches the **`$1, $2, ...`** placeholders in **`setCols`**.

**Throws:**

- **`BadRequestError`**: If **`dataToUpdate`** is empty, indicating there's no data provided to update.

**Example Usage:**

```JavaScript
const dataToUpdate = { firstName: 'John', age: 30 };
const jsToSql = {
  firstName: "first_name",
  age: "age"
};

const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
// result.setCols would be '"first_name"=$1, "age"=$2'
// result.values would be ['John', 30]

```

**Implementation Notes:**

- The function dynamically generates the part of the SQL update statement dealing with setting new values, allowing for flexible updates with different sets of fields.
- It uses prepared statements (the **`$1, $2, ...`** syntax), which help prevent SQL injection attacks.
- The function is designed to work within a broader context where it's combined with other parts of an SQL statement to form a complete command.

**Usage Context:**
Typically used in an API or a server-side application where you need to update a record in the database, but you might only have some fields that need updating based on what the client sends in a request (common in PATCH operations).

**Error Handling:**
The function throws a **`BadRequestError`** if no fields are provided to update. The calling code should handle this error appropriately, likely by returning a suitable response to the client indicating that the request was invalid.

**Dependencies:**

- **`BadRequestError`**: A custom error class that should be defined elsewhere in the codebase, typically used to indicate a 400 HTTP response status.