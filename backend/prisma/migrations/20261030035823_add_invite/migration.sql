-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "casitaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite_code_key" ON "Invite"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_casitaId_key" ON "Invite"("casitaId");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_casitaId_fkey" FOREIGN KEY ("casitaId") REFERENCES "Casita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
