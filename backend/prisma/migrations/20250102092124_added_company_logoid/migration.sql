/*
  Warnings:

  - Added the required column `logoId` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "logoId" TEXT NOT NULL;
