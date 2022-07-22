-- CreateTable
CREATE TABLE "PetAccounts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "sex" TEXT NOT NULL,

    CONSTRAINT "PetAccounts_pkey" PRIMARY KEY ("id")
);
