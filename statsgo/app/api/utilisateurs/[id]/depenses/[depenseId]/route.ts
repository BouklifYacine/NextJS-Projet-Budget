import { prisma } from '@/prisma';

import { NextResponse } from 'next/server';


interface RouteParams {
  userId: string;
  depenseId: string;
}


export async function GET( request: Request, { params }: { params: RouteParams } 
) {
  const { userId, depenseId } = await params;

  const DepenseIdNombre = parseInt(depenseId)

  if (isNaN(DepenseIdNombre)) {
    return NextResponse.json(
      { message: 'ID de dépense invalide' },
      { status: 400 }
    );
  }

  if (depenseId !== DepenseIdNombre.toString()) {
    return NextResponse.json(
      {
        error:
          "Ce revenu ne correspond pas veuillez écrire juste des nombres ",
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
        { message: 'Dépense non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(depense);
  } catch (error) {
    console.error('Erreur lors de la récupération de la dépense:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}