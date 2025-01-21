import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
    depenseId: string;
  };
}

export async function GET(request: Request, { params }: Props) {
  const { id, depenseId } = params;

  const depenseIdNumber = parseInt(depenseId);
  
  // Vérifie si la conversion en string donne le même résultat
  if (depenseIdNumber.toString() !== depenseId) {
    return NextResponse.json(
      { error: "ID de dépense invalide - doit contenir uniquement des chiffres" },
      { status: 400 }
    );
  }

  try {
    const depense = await prisma.depenses.findFirst({
      where: {
        AND: [
          { id: depenseIdNumber },
          { userId: id }
        ]
      }
    });

    if (!depense) {
      return NextResponse.json(
        { error: "Dépense non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(depense);
  } catch (error) {
    console.error("Erreur lors de la récupération de la dépense:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}