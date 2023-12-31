DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text,
    notes text DEFAULT '' NOT NULL
);

CREATE TABLE reservations (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    customer_id integer NOT NULL REFERENCES customers,
    start_at timestamp without time zone NOT NULL,
    num_guests integer NOT NULL,
    notes text DEFAULT '' NOT NULL,
    CONSTRAINT reservations_num_guests_check CHECK ((num_guests > 0))
);


SELECT pg_catalog.setval('public.customers_id_seq', 100, true);
SELECT pg_catalog.setval('public.reservations_id_seq', 200, true);

CREATE INDEX reservations_customer_id_idx ON public.reservations USING btree (customer_id);
CREATE INDEX reservations_start_at_idx ON public.reservations USING btree (start_at);
