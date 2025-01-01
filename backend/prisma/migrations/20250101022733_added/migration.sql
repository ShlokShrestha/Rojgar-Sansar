/*
  Warnings:

  - The values [USER,ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `profileUrl` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('user', 'reecruiter', 'admin');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "profileUrl" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'user';
