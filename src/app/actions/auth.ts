"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

const ORG_ID = "org_33wce8GoXTQgBn9rK4jMqua2aaY";

export async function checkIsAdmin(userId: string | null): Promise<boolean> {
  try {
    if (!userId) {
      return false;
    }

    const clerk = await clerkClient();

    const members = await clerk.organizations.getOrganizationMembershipList({
      organizationId: ORG_ID,
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
