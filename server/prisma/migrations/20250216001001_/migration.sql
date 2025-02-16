-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_institution_donator_id_fkey";

-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_user_donator_id_fkey";

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_user_donator_id_fkey" FOREIGN KEY ("user_donator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_institution_donator_id_fkey" FOREIGN KEY ("institution_donator_id") REFERENCES "Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
