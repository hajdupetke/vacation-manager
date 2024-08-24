/*
  Warnings:

  - You are about to drop the `CategoriesOnUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnUser" DROP CONSTRAINT "CategoriesOnUser_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnUser" DROP CONSTRAINT "CategoriesOnUser_userId_fkey";

-- DropTable
DROP TABLE "CategoriesOnUser";

-- CreateTable
CREATE TABLE "_LeaveCategoryToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LeaveCategoryToUser_AB_unique" ON "_LeaveCategoryToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LeaveCategoryToUser_B_index" ON "_LeaveCategoryToUser"("B");

-- AddForeignKey
ALTER TABLE "_LeaveCategoryToUser" ADD CONSTRAINT "_LeaveCategoryToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "LeaveCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeaveCategoryToUser" ADD CONSTRAINT "_LeaveCategoryToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
