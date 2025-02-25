-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.1.6
-- PostgreSQL version: 17.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- -- object: postgres | type: DATABASE --
-- -- DROP DATABASE IF EXISTS postgres;
-- CREATE DATABASE postgres
-- 	ENCODING = 'UTF8'
-- 	LC_COLLATE = 'pt-BR'
-- 	LC_CTYPE = 'pt-BR'
-- 	TABLESPACE = pg_default
-- 	OWNER = postgres;
-- -- ddl-end --
-- COMMENT ON DATABASE postgres IS E'default administrative connection database';
-- -- ddl-end --
-- 

-- object: public._prisma_migrations | type: TABLE --
-- DROP TABLE IF EXISTS public._prisma_migrations CASCADE;
CREATE TABLE public._prisma_migrations (
	id character varying(36) NOT NULL,
	checksum character varying(64) NOT NULL,
	finished_at timestamp with time zone,
	migration_name character varying(255) NOT NULL,
	logs text,
	rolled_back_at timestamp with time zone,
	started_at timestamp with time zone NOT NULL DEFAULT now(),
	applied_steps_count integer NOT NULL DEFAULT 0,
	CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public._prisma_migrations OWNER TO postgres;
-- ddl-end --

-- object: public."BrazilianStates" | type: TYPE --
-- DROP TYPE IF EXISTS public."BrazilianStates" CASCADE;
CREATE TYPE public."BrazilianStates" AS
ENUM ('AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO');
-- ddl-end --
ALTER TYPE public."BrazilianStates" OWNER TO postgres;
-- ddl-end --

-- object: public."SpeciesEnum" | type: TYPE --
-- DROP TYPE IF EXISTS public."SpeciesEnum" CASCADE;
CREATE TYPE public."SpeciesEnum" AS
ENUM ('CACHORRO','GATO','OUTRO');
-- ddl-end --
ALTER TYPE public."SpeciesEnum" OWNER TO postgres;
-- ddl-end --

-- object: public."InstitutionRoles" | type: TYPE --
-- DROP TYPE IF EXISTS public."InstitutionRoles" CASCADE;
CREATE TYPE public."InstitutionRoles" AS
ENUM ('ADMIN','COLLABORATOR');
-- ddl-end --
ALTER TYPE public."InstitutionRoles" OWNER TO postgres;
-- ddl-end --

-- object: public."PersonType" | type: TYPE --
-- DROP TYPE IF EXISTS public."PersonType" CASCADE;
CREATE TYPE public."PersonType" AS
ENUM ('USER','INSTITUTION');
-- ddl-end --
ALTER TYPE public."PersonType" OWNER TO postgres;
-- ddl-end --

-- object: public."SystemAdmin_id_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."SystemAdmin_id_seq" CASCADE;
CREATE SEQUENCE public."SystemAdmin_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public."SystemAdmin_id_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."SystemAdmin" | type: TABLE --
-- DROP TABLE IF EXISTS public."SystemAdmin" CASCADE;
CREATE TABLE public."SystemAdmin" (
	id integer NOT NULL DEFAULT nextval('public."SystemAdmin_id_seq"'::regclass),
	name character varying(255) NOT NULL,
	cpf character varying(11) NOT NULL,
	email character varying(255) NOT NULL,
	phone character varying(255) NOT NULL,
	password character varying(255) NOT NULL,
	birthdate timestamp(3) NOT NULL,
	CONSTRAINT "SystemAdmin_pkey" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public."SystemAdmin" OWNER TO postgres;
-- ddl-end --

-- object: public."User_id_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."User_id_seq" CASCADE;
CREATE SEQUENCE public."User_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."User" | type: TABLE --
-- DROP TABLE IF EXISTS public."User" CASCADE;
CREATE TABLE public."User" (
	id integer NOT NULL DEFAULT nextval('public."User_id_seq"'::regclass),
	name character varying(255) NOT NULL,
	cpf character varying(11) NOT NULL,
	birthdate timestamp(3) NOT NULL,
	email character varying(255) NOT NULL,
	phone character varying(255) NOT NULL,
	street character varying(255) NOT NULL,
	complement character varying(255),
	number integer NOT NULL,
	neighborhood character varying(255) NOT NULL,
	city character varying(255) NOT NULL,
	state public."BrazilianStates" NOT NULL,
	"postalCode" character varying(255) NOT NULL,
	password text NOT NULL,
	"imgUrl" character varying(2083),
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "User_pkey" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public."User" OWNER TO postgres;
-- ddl-end --

-- object: public."Gender" | type: TYPE --
-- DROP TYPE IF EXISTS public."Gender" CASCADE;
CREATE TYPE public."Gender" AS
ENUM ('FEMEA','MACHO');
-- ddl-end --
ALTER TYPE public."Gender" OWNER TO postgres;
-- ddl-end --

-- object: public."Animal_id_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."Animal_id_seq" CASCADE;
CREATE SEQUENCE public."Animal_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public."Animal_id_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."Animal" | type: TABLE --
-- DROP TABLE IF EXISTS public."Animal" CASCADE;
CREATE TABLE public."Animal" (
	id integer NOT NULL DEFAULT nextval('public."Animal_id_seq"'::regclass),
	name character varying(255) NOT NULL,
	species public."SpeciesEnum" NOT NULL,
	custom_species character varying(255),
	age integer,
	description character varying(255),
	weight double precision,
	user_donator_id integer,
	user_adopter_id integer,
	institution_donator_id integer,
	institution_adopter_id integer,
	"imgUrls" text[],
	birthdate timestamp(3),
	gender public."Gender" NOT NULL,
	breed character varying(255),
	"healthCondition" character varying(255),
	CONSTRAINT "Animal_pkey" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public."Animal" OWNER TO postgres;
-- ddl-end --

-- object: public."Institution_id_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."Institution_id_seq" CASCADE;
CREATE SEQUENCE public."Institution_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public."Institution_id_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."Institution" | type: TABLE --
-- DROP TABLE IF EXISTS public."Institution" CASCADE;
CREATE TABLE public."Institution" (
	id integer NOT NULL DEFAULT nextval('public."Institution_id_seq"'::regclass),
	name character varying(255) NOT NULL,
	cnpj character varying(14) NOT NULL,
	phone character varying(255) NOT NULL,
	street character varying(255) NOT NULL,
	complement character varying(255),
	number integer NOT NULL,
	neighborhood character varying(255) NOT NULL,
	city character varying(255) NOT NULL,
	state public."BrazilianStates" NOT NULL,
	"postalCode" character varying(255) NOT NULL,
	"imgUrl" character varying(2083),
	CONSTRAINT "Institution_pkey" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public."Institution" OWNER TO postgres;
-- ddl-end --

-- object: public."UserInstitution_id_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."UserInstitution_id_seq" CASCADE;
CREATE SEQUENCE public."UserInstitution_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public."UserInstitution_id_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."UserInstitution" | type: TABLE --
-- DROP TABLE IF EXISTS public."UserInstitution" CASCADE;
CREATE TABLE public."UserInstitution" (
	id integer NOT NULL DEFAULT nextval('public."UserInstitution_id_seq"'::regclass),
	role public."InstitutionRoles" NOT NULL,
	institution_id integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "UserInstitution_pkey" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public."UserInstitution" OWNER TO postgres;
-- ddl-end --

-- object: public."AdoptionRequest_id_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."AdoptionRequest_id_seq" CASCADE;
CREATE SEQUENCE public."AdoptionRequest_id_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public."AdoptionRequest_id_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."AdoptionRequest" | type: TABLE --
-- DROP TABLE IF EXISTS public."AdoptionRequest" CASCADE;
CREATE TABLE public."AdoptionRequest" (
	id integer NOT NULL DEFAULT nextval('public."AdoptionRequest_id_seq"'::regclass),
	notes character varying(255) NOT NULL,
	animal_id integer NOT NULL,
	user_id integer,
	institution_id integer,
	CONSTRAINT "AdoptionRequest_pkey" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public."AdoptionRequest" OWNER TO postgres;
-- ddl-end --

-- object: "User_cpf_key" | type: INDEX --
-- DROP INDEX IF EXISTS public."User_cpf_key" CASCADE;
CREATE UNIQUE INDEX "User_cpf_key" ON public."User"
USING btree
(
	cpf
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: "SystemAdmin_cpf_key" | type: INDEX --
-- DROP INDEX IF EXISTS public."SystemAdmin_cpf_key" CASCADE;
CREATE UNIQUE INDEX "SystemAdmin_cpf_key" ON public."SystemAdmin"
USING btree
(
	cpf
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: "SystemAdmin_email_key" | type: INDEX --
-- DROP INDEX IF EXISTS public."SystemAdmin_email_key" CASCADE;
CREATE UNIQUE INDEX "SystemAdmin_email_key" ON public."SystemAdmin"
USING btree
(
	email
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: "User_email_key" | type: INDEX --
-- DROP INDEX IF EXISTS public."User_email_key" CASCADE;
CREATE UNIQUE INDEX "User_email_key" ON public."User"
USING btree
(
	email
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: "Animal_user_adopter_id_fkey" | type: CONSTRAINT --
-- ALTER TABLE public."Animal" DROP CONSTRAINT IF EXISTS "Animal_user_adopter_id_fkey" CASCADE;
ALTER TABLE public."Animal" ADD CONSTRAINT "Animal_user_adopter_id_fkey" FOREIGN KEY (user_adopter_id)
REFERENCES public."User" (id) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: "Animal_institution_adopter_id_fkey" | type: CONSTRAINT --
-- ALTER TABLE public."Animal" DROP CONSTRAINT IF EXISTS "Animal_institution_adopter_id_fkey" CASCADE;
ALTER TABLE public."Animal" ADD CONSTRAINT "Animal_institution_adopter_id_fkey" FOREIGN KEY (institution_adopter_id)
REFERENCES public."Institution" (id) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: "Animal_user_donator_id_fkey" | type: CONSTRAINT --
-- ALTER TABLE public."Animal" DROP CONSTRAINT IF EXISTS "Animal_user_donator_id_fkey" CASCADE;
ALTER TABLE public."Animal" ADD CONSTRAINT "Animal_user_donator_id_fkey" FOREIGN KEY (user_donator_id)
REFERENCES public."User" (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "Animal_institution_donator_id_fkey" | type: CONSTRAINT --
-- ALTER TABLE public."Animal" DROP CONSTRAINT IF EXISTS "Animal_institution_donator_id_fkey" CASCADE;
ALTER TABLE public."Animal" ADD CONSTRAINT "Animal_institution_donator_id_fkey" FOREIGN KEY (institution_donator_id)
REFERENCES public."Institution" (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "UserInstitution_institution_id_fkey" | type: CONSTRAINT --
-- ALTER TABLE public."UserInstitution" DROP CONSTRAINT IF EXISTS "UserInstitution_institution_id_fkey" CASCADE;
ALTER TABLE public."UserInstitution" ADD CONSTRAINT "UserInstitution_institution_id_fkey" FOREIGN KEY (institution_id)
REFERENCES public."Institution" (id) MATCH SIMPLE
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: "UserInstitution_userId_fkey" | type: CONSTRAINT --
-- ALTER TABLE public."UserInstitution" DROP CONSTRAINT IF EXISTS "UserInstitution_userId_fkey" CASCADE;
ALTER TABLE public."UserInstitution" ADD CONSTRAINT "UserInstitution_userId_fkey" FOREIGN KEY ("userId")
REFERENCES public."User" (id) MATCH SIMPLE
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: "AdoptionRequest_animal_id_fkey" | type: CONSTRAINT --
-- ALTER TABLE public."AdoptionRequest" DROP CONSTRAINT IF EXISTS "AdoptionRequest_animal_id_fkey" CASCADE;
ALTER TABLE public."AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_animal_id_fkey" FOREIGN KEY (animal_id)
REFERENCES public."Animal" (id) MATCH SIMPLE
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: "AdoptionRequest_user_id_fkey" | type: CONSTRAINT --
-- ALTER TABLE public."AdoptionRequest" DROP CONSTRAINT IF EXISTS "AdoptionRequest_user_id_fkey" CASCADE;
ALTER TABLE public."AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_user_id_fkey" FOREIGN KEY (user_id)
REFERENCES public."User" (id) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: "AdoptionRequest_institution_id_fkey" | type: CONSTRAINT --
-- ALTER TABLE public."AdoptionRequest" DROP CONSTRAINT IF EXISTS "AdoptionRequest_institution_id_fkey" CASCADE;
ALTER TABLE public."AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_institution_id_fkey" FOREIGN KEY (institution_id)
REFERENCES public."Institution" (id) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


