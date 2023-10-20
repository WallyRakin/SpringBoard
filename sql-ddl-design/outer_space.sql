-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

-- Stars Table
CREATE TABLE stars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Galaxies Table
CREATE TABLE galaxies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Moons Table
CREATE TABLE moons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Planets Table
CREATE TABLE planets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    orbital_period_in_years FLOAT NOT NULL,
    star_id INT REFERENCES stars(id),
    galaxy_id INT REFERENCES galaxies(id)
);

-- Junction table for planets and moons
CREATE TABLE planet_moons (
    planet_id INT REFERENCES planets(id),
    moon_id INT REFERENCES moons(id),
    PRIMARY KEY (planet_id, moon_id)
);
