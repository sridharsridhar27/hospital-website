-- CreateEnum
CREATE TYPE "AppointmentSpeciality" AS ENUM ('ORTHOPAEDICS', 'OBSTETRICS_GYNAECOLOGY', 'OPHTHALMOLOGY');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "description" TEXT,
ADD COLUMN     "speciality" "AppointmentSpeciality",
ADD COLUMN     "timing" TEXT;
