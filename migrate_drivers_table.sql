CREATE TABLE drivers_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    driver_ref TEXT,
    number TEXT,
    code TEXT,
    forename TEXT,
    surname TEXT,
    dob TEXT,
    nationality TEXT,
    url TEXT
);

INSERT INTO drivers_new (
    driver_ref,
    number,
    code,
    forename,
    surname,
    dob,
    nationality,
    url
)
SELECT
    driver_ref,
    number,
    code,
    forename,
    surname,
    dob,
    nationality,
    url
FROM drivers;


DROP TABLE drivers;

ALTER TABLE drivers_new RENAME TO drivers;
