/*
  Warnings:

  - You are about to drop the column `numreviews` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "numreviews",
ADD COLUMN     "numReviews" INTEGER NOT NULL DEFAULT 0;
