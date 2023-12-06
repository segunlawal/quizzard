/*
  Warnings:

  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ActivateToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivateToken" DROP CONSTRAINT "ActivateToken_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "active";

-- DropTable
DROP TABLE "ActivateToken";
