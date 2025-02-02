/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `SystemAdmin` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `SystemAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "birthDate",
ADD COLUMN     "birthdate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SystemAdmin" DROP COLUMN "birthDate",
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;
