/*
  Warnings:

  - You are about to drop the column `healthConditition` on the `Animal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "healthConditition",
ADD COLUMN     "healthCondition" VARCHAR(255);
