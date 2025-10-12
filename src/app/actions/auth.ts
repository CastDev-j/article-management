"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

const ORG_ID = "org_33wce8GoXTQgBn9rK4jMqua2aaY";

/**
 * Verifica si un usuario es administrador de la organización
 * @param userId - El ID del usuario a verificar
 * @returns Promise<boolean> - true si es admin, false si no lo es
 */
export async function checkIsAdmin(userId: string | null): Promise<boolean> {
  try {
    if (!userId) {
      return false;
    }

    const clerk = await clerkClient();

    // Obtener el miembro específico usando el parámetro userId
    const members = await clerk.organizations.getOrganizationMembershipList({
      organizationId: ORG_ID,
      limit: 1,
      userId: [userId],
    });

    // Si hay resultados, verificar el rol
    if (members.data.length > 0) {
      const miembroActual = members.data[0];
      return miembroActual.role === "org:admin";
    }

    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Protege una acción verificando que el usuario sea administrador
 * Lanza un error si el usuario no es admin
 */
export async function requireAdmin() {
  const { userId } = await auth();
  const isAdmin = await checkIsAdmin(userId);

  if (!isAdmin) {
    throw new Error("Acceso denegado. Se requiere rol de administrador.");
  }
}
