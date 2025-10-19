"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

const ORG_ID = process.env.CLERK_ADMIN_ORG_ID;

if (!ORG_ID) {
  throw new Error('CLERK_ADMIN_ORG_ID no está configurada en las variables de entorno');
}

// Garantizar que ORG_ID es string para TypeScript
const ORGANIZATION_ID: string = ORG_ID;

export async function checkIsAdmin(userId: string | null): Promise<boolean> {
  try {
    if (!userId) {
      return false;
    }

    const clerk = await clerkClient();

    const members = await clerk.organizations.getOrganizationMembershipList({
      organizationId: ORGANIZATION_ID,
      limit: 1,
      userId: [userId],
    });

    if (members.data.length > 0) {
      const miembroActual = members.data[0];
      return miembroActual.role === "org:admin";
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function requireAdmin() {
  const { userId } = await auth();
  const isAdmin = await checkIsAdmin(userId);

  if (!isAdmin) {
    throw new Error("Acceso denegado. Se requiere rol de administrador.");
  }
}
