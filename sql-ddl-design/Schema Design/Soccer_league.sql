CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    points INT DEFAULT 0
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    team_id INT REFERENCES teams(id)
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    team1_id INT REFERENCES teams(id),
    team2_id INT REFERENCES teams(id),
    date DATE NOT NULL,
    referee_id INT REFERENCES referees(id)
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    player_id INT REFERENCES players(id),
    match_id INT REFERENCES matches(id),
    timestamp TIME NOT NULL
);

CREATE TABLE seasons (
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);
