// app/api/text/reorder/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const { textOrders }: { textOrders: Array<{ id: string; ordre: number }> } =
      await request.json();

    // Validation basique des données
    if (!textOrders || !Array.isArray(textOrders)) {
      return Response.json(
        { error: "textOrders requis et doit être un tableau" },
        { status: 400 }
      );
    }

    // Mise à jour en batch avec transaction
    await prisma.$transaction(
      textOrders.map(({ id, ordre }) =>
        prisma.text.update({
          where: { id },
          data: { ordre },
        })
      )
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Erreur réorganisation:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
