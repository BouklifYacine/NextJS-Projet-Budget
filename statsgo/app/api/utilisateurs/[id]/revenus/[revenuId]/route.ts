import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

interface Props {
  params: {
    id: string;
    revenuId: string;
  };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<Props['params']> }
) {
  // Attendre les paramètres
  const params = await context.params;
  const { id, revenuId } = params;

  try {
    const revenuIdNumber = Number(revenuId);
    if (isNaN(revenuIdNumber)) {
      return NextResponse.json(
        { error: "ID du revenu invalide" },
        { status: 400 }
      );
    }

    const revenu = await prisma.revenu.findUnique({
      where: { id: revenuIdNumber },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!revenu) {
      return NextResponse.json(
        { error: "Revenu non trouvé" },
        { status: 404 }
      );
    }

    if (revenu.userId !== id) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à accéder à ce revenu" },
        { status: 403 }
      );
    }

    return NextResponse.json(revenu, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération du revenu:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du revenu" },
      { status: 500 }
    );
  }
}