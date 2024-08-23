/*
  Warnings:

  - The primary key for the `LeaveRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LeaveRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `categoryId` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaveRequest" DROP CONSTRAINT "LeaveRequest_pkey",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "LeaveCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LeaveCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnUser" (
    "categoryId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnUser_pkey" PRIMARY KEY ("userId","categoryId")
);

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LeaveCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnUser" ADD CONSTRAINT "CategoriesOnUser_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LeaveCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnUser" ADD CONSTRAINT "CategoriesOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
