-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

-- Artists Table
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Albums Table
CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Producers Table
CREATE TABLE producers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Songs Table
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    duration_in_seconds INTEGER NOT NULL,
    release_date DATE NOT NULL,
    album_id INT REFERENCES albums(id)
);

-- Junction table for songs and artists
CREATE TABLE song_artists (
    song_id INT REFERENCES songs(id),
    artist_id INT REFERENCES artists(id),
    PRIMARY KEY (song_id, artist_id)
);

-- Junction table for songs and producers
CREATE TABLE song_producers (
    song_id INT REFERENCES songs(id),
    producer_id INT REFERENCES producers(id),
    PRIMARY KEY (song_id, producer_id)
);