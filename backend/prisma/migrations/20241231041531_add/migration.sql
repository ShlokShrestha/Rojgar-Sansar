-- AlterTable
ALTER TABLE "user" ALTER COLUMN "resetPasswordExpire" DROP NOT NULL,
ALTER COLUMN "resetPasswordToken" DROP NOT NULL;
