import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
interface Props {
  params: {
    id: string;
    revenuId: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id, revenuId } = await params;

 const revenuIdNumber = parseInt(revenuId)

 if(isNaN(revenuIdNumber) ){
return NextResponse.json({error : " L'id doit etre un nombre "} , {status : 400})
 }

 if( revenuId !== revenuIdNumber.toString()){
return NextResponse.json({error : "Ce revenu ne correspond pas veuillez écrire juste des nombres "} , {status : 400})
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
      return NextResponse.json({ error: "Revenu non trouvé" }, { status: 404 });
    }

    if (revenu.userId !== id) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    return NextResponse.json(revenu);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
