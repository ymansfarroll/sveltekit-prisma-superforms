/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `categoryId` INTEGER NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `maximun` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_uuid_key` ON `Product`(`uuid`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
