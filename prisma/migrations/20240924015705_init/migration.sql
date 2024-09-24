-- CreateTable
CREATE TABLE "RoleAuthorityMenu" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoleAuthorityMenu_pkey" PRIMARY KEY ("id")
);
