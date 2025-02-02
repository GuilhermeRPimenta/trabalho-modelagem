-- CreateEnum
CREATE TYPE "BrazilianStates" AS ENUM ('AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO');

-- CreateEnum
CREATE TYPE "SpeciesEnum" AS ENUM ('CACHORRO', 'GATO', 'OUTRO');

-- CreateEnum
CREATE TYPE "InstitutionRoles" AS ENUM ('ADMIN', 'COLLABORATOR');

-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('USER', 'INSTITUTION');

-- CreateTable
CREATE TABLE "SystemAdmin" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "SystemAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "number" INTEGER NOT NULL,
    "neighborhood" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" "BrazilianStates" NOT NULL,
    "postalCode" VARCHAR(255) NOT NULL,
    "imgUrl" VARCHAR(2083),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "species" "SpeciesEnum" NOT NULL,
    "" VARCHAR(255),
    "birthDate" TIMESTAMP(3),
    "age" INTEGER,
    "description" VARCHAR(255),
    "healthConditition" VARCHAR(255),
    "weight" DOUBLE PRECISION,
    "user_donator_id" INTEGER NOT NULL,
    "user_adopter_id" INTEGER,
    "institution_donator_id" INTEGER NOT NULL,
    "institution_adopter_id" INTEGER,
    "imgUrls" TEXT[],

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "number" INTEGER NOT NULL,
    "neighborhood" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" "BrazilianStates" NOT NULL,
    "postalCode" VARCHAR(255) NOT NULL,
    "imgUrl" VARCHAR(2083),

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInstitution" (
    "id" SERIAL NOT NULL,
    "role" "InstitutionRoles" NOT NULL,
    "institution_id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserInstitution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionRequest" (
    "id" SERIAL NOT NULL,
    "notes" VARCHAR(255) NOT NULL,
    "animal_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "institution_id" INTEGER,

    CONSTRAINT "AdoptionRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_user_donator_id_fkey" FOREIGN KEY ("user_donator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_user_adopter_id_fkey" FOREIGN KEY ("user_adopter_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_institution_donator_id_fkey" FOREIGN KEY ("institution_donator_id") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_institution_adopter_id_fkey" FOREIGN KEY ("institution_adopter_id") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInstitution" ADD CONSTRAINT "UserInstitution_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInstitution" ADD CONSTRAINT "UserInstitution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
