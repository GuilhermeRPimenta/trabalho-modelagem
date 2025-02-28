/*
  Warnings:

  - A unique constraint covering the columns `[institution_id,userId]` on the table `UserInstitution` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserInstitution" ADD COLUMN     "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "UserInstitution_institution_id_userId_key" ON "UserInstitution"("institution_id", "userId");
