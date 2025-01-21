import { prisma } from "@/prisma";

import { NextResponse } from "next/server";

interface Props {
  params: {
    userId: string;
    depenseId: string;
  };
}

export async function GET(request: Request, { params }: Props) {
    
  const { userId, depenseId } = params;

  const DepenseIdNombre = parseInt(depenseId);
  console.log(DepenseIdNombre)

  if (isNaN(DepenseIdNombre)) {
    return NextResponse.json(
      { message: "ID de dépense invalide" },
      { status: 400 }
    );
  }

  if (depenseId !== DepenseIdNombre.toString()) {
    return NextResponse.json(
      {
        error: "Ce revenu ne correspond pas veuillez écrire juste des nombres ",
      },
      { status: 400 }
    );
  }

  try {
    const depense = await prisma.depenses.findUnique({
      where: {
        id: parseInt(depenseId),
        userId: userId,
      },
    });

    if (!depense) {
      return NextResponse.json(
        { message: "Dépense non trouvée" },
        { status: 404 }
      );
    }

    const depenseuserid = depense.userId
    console.log(depenseuserid)
    console.log(" Voici le userid :  " + userId)

    if(depense.userId !== userId){
        return NextResponse.json(
          { error: "Accès non autorisé" },
          { status: 403 }
        );
      }

    return NextResponse.json(depense);
  } catch (error) {
    console.error("Erreur lors de la récupération de la dépense:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
