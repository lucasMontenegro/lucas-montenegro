CREATE TYPE sex_type AS ENUM ('male', 'female');
CREATE TYPE marital_status_type AS ENUM (
  'single',
  'complicated',
  'dating',
  'engaged',
  'married',
  'divorced',
  'widowed'
);
CREATE TABLE "profiles" (
  "username" varchar(36) PRIMARY KEY,
  "login_id" text NOT NULL UNIQUE,
  "created_on" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  "name" text,
  "surname" text,
  "picture" text, -- URL
  "cover_picture_small" text, -- URL
  "cover_picture_medium" text, -- URL
  "cover_picture_big" text, -- URL
  "birthdate" timestamp without time zone,
  "birthplace" text,
  "place_of_residence" text,
  "occupation" text,
  "education" text,
  "sex" "sex_type",
  "marital_status" "marital_status_type"
);
CREATE INDEX "profiles_username_idx" ON "profiles" ("username");
CREATE INDEX "profiles_login_id_idx" ON "profiles" ("login_id");