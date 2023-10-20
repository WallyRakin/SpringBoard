CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctors(id),
    patient_id INT REFERENCES patients(id),
    visit_date DATE NOT NULL
);

CREATE TABLE visit_diseases (
    visit_id INT REFERENCES visits(id),
    disease_id INT REFERENCES diseases(id),
    PRIMARY KEY (visit_id, disease_id)
);