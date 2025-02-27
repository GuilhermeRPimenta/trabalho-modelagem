/*
  Warnings:

  - A unique constraint covering the columns `[animal_id,user_id]` on the table `AdoptionRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[animal_id,institution_id]` on the table `AdoptionRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdoptionRequest_animal_id_user_id_key" ON "AdoptionRequest"("animal_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionRequest_animal_id_institution_id_key" ON "AdoptionRequest"("animal_id", "institution_id");
