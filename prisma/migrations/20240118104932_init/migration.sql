-- CreateTable
CREATE TABLE "Squarebox" (
    "id" SERIAL NOT NULL,
    "top" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "border" INTEGER NOT NULL,
    "bordercolor" TEXT NOT NULL,
    "backgroundcolor" TEXT NOT NULL,

    CONSTRAINT "Squarebox_pkey" PRIMARY KEY ("id")
);
