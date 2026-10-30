-- Remove duplicate applications (same user applied to the same job more than once),
-- keeping the earliest one, so the unique index below can be created.
DELETE FROM "application" a
USING "application" b
WHERE a."jobId" = b."jobId"
  AND a."userId" = b."userId"
  AND (a."appliedAt", a."id") > (b."appliedAt", b."id");

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_userId_fkey";

-- DropForeignKey
ALTER TABLE "jobCategory" DROP CONSTRAINT "jobCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_userId_fkey";

-- CreateIndex
CREATE INDEX "user_resetPasswordToken_idx" ON "user"("resetPasswordToken");

-- CreateIndex
CREATE INDEX "company_userId_idx" ON "company"("userId");

-- CreateIndex
CREATE INDEX "job_userId_idx" ON "job"("userId");

-- CreateIndex
CREATE INDEX "job_companyId_idx" ON "job"("companyId");

-- CreateIndex
CREATE INDEX "job_jobCategoryId_idx" ON "job"("jobCategoryId");

-- CreateIndex
CREATE INDEX "job_createdAt_idx" ON "job"("createdAt");

-- CreateIndex
CREATE INDEX "jobCategory_userId_idx" ON "jobCategory"("userId");

-- CreateIndex
CREATE INDEX "application_userId_idx" ON "application"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "application_jobId_userId_key" ON "application"("jobId", "userId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobCategory" ADD CONSTRAINT "jobCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
