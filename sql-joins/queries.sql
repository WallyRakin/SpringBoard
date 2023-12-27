-- Join the two tables so that every column and record appears, regardless of if there is not an owner_id
SELECT *
FROM owners
LEFT JOIN vehicles ON owners.id = vehicles.owner_id;

-- Count the number of cars for each owner and display the owners' first_name, last_name, and count of vehicles, ordered by first_name in ascending order
SELECT first_name, last_name, COUNT(vehicles.id) AS count
FROM owners
LEFT JOIN vehicles ON owners.id = vehicles.owner_id
GROUP BY owners.id
ORDER BY first_name ASC;

-- Count the number of cars for each owner, display the average price for each of the cars as integers, along with the owners' first_name, last_name, average price, and count of vehicles. Order by first_name in descending order, and only display results with more than one vehicle and an average price greater than 10000
SELECT first_name, last_name, CAST(AVG(price) AS INTEGER) AS average_price, COUNT(vehicles.id) AS count
FROM owners
LEFT JOIN vehicles ON owners.id = vehicles.owner_id
GROUP BY owners.id
HAVING COUNT(vehicles.id) > 1 AND AVG(price) > 10000
ORDER BY first_name DESC;
