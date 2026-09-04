-- CreateTable
CREATE TABLE "ConditionItem" (
    "id" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConditionItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConditionItem" ADD CONSTRAINT "ConditionItem_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
