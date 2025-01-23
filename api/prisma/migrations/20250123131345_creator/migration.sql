/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Club` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "creatorId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;
