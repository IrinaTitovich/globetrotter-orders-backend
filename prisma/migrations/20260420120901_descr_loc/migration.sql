/*
  Warnings:

  - Added the required column `city` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "lat" INTEGER NOT NULL,
ADD COLUMN     "lng" INTEGER NOT NULL;
