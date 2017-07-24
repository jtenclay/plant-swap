-- psql -a -f migrations.sql

CREATE DATABASE plant_swap;

\c plant_swap;

CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(255), password_digest VARCHAR(255), location VARCHAR(255));

CREATE TABLE swaps (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), title VARCHAR(255), description TEXT, time TIMESTAMP, is_open BOOLEAN, coswap_id INT REFERENCES swaps(id), image_url VARCHAR);

CREATE TABLE tags (id SERIAL PRIMARY KEY, swap_id INT REFERENCES swaps(id), name VARCHAR(255));

CREATE TABLE comments (id SERIAL PRIMARY KEY, swap_id INT REFERENCES swaps(id), message TEXT, user_id INT REFERENCES users(id));

ALTER TABLE users ADD COLUMN token VARCHAR(255);

ALTER TABLE swaps DROP COLUMN time;

ALTER TABLE swaps ADD COLUMN created_at TIMESTAMP;