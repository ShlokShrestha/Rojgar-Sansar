/*
  Warnings:

  - Added the required column `resetPasswordExpire` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetPasswordToken` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "resetPasswordExpire" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "resetPasswordToken" TEXT NOT NULL;
