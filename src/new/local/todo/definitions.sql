--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Debian 11.7-2.pgdg90+1)
-- Dumped by pg_dump version 11.7 (Debian 11.7-2.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "public";


--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


--
-- Name: todo_priority; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE "public"."todo_priority" AS ENUM (
    'high',
    'medium',
    'low'
);


--
-- Name: todo_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE "public"."todo_status" AS ENUM (
    'done',
    'pending',
    'cancelled'
);


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: todo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."todo" (
    "todo_id" bigint NOT NULL,
    "user_id" "text" NOT NULL,
    "description" character varying(255) NOT NULL,
    "priority" "public"."todo_priority" DEFAULT 'medium'::"public"."todo_priority" NOT NULL,
    "status" "public"."todo_status" DEFAULT 'pending'::"public"."todo_status" NOT NULL,
    "updated_on" timestamp with time zone,
    "created_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: todo_todo_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."todo_todo_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: todo_todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."todo_todo_id_seq" OWNED BY "public"."todo"."todo_id";


--
-- Name: todo todo_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."todo" ALTER COLUMN "todo_id" SET DEFAULT "nextval"('"public"."todo_todo_id_seq"'::"regclass");


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."todo"
    ADD CONSTRAINT "todo_pkey" PRIMARY KEY ("todo_id");


--
-- Name: user_id__idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "user_id__idx" ON "public"."todo" USING "btree" ("user_id");


--
-- PostgreSQL database dump complete
--

