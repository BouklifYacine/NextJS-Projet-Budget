import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { SchemaRevenus } from "@/schema/SchemaRevenus";
import { auth } from "@/auth";
interface Props {
  params: {
    id: string;
    revenuId: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    // const session = await auth();
    // const sessionId = session?.user?.id;
    
    // if (!session) {
    //   return NextResponse.json(
    //     { error: "Authentification requise" },
    //     { status: 401 }
    //   );
    // }

    const { id, revenuId } = await params;

    const revenuIdNumber = parseInt(revenuId);

    if (isNaN(revenuIdNumber)) {
      return NextResponse.json(
        { error: " L'id doit etre un nombre " },
        { status: 400 }
      );
    }

    // if (sessionId !== id) {
    //   return NextResponse.json(
    //     { error: "Vous n'êtes pas autorisé à modifier ces données" },
    //     { status: 403 }
    //   );
    // }

    if (revenuId !== revenuIdNumber.toString()) {
      return NextResponse.json(
        {
          error:
            "Ce revenu ne correspond pas veuillez écrire juste des nombres ",
        },
        { status: 400 }
      );
    }

    const revenu = await prisma.revenu.findUnique({
      where: { id: revenuIdNumber, userId: id }, 
    });

    if (!revenu) {
      return NextResponse.json({ error: "Revenu non trouvé" }, { status: 404 });
    }

 // A supprimer quand on fera le front
    // if (revenu.userId !== id) {
    //   return NextResponse.json(
    //     { error: "Accès non autorisé" },
    //     { status: 403 }
    //   );
    // }

    const test = revenu.userId

    console.log(id)
    console.log(test)

    // if (revenu.userId !== sessionId) {
    //   return NextResponse.json(
    //     { error: "Accès non autorisé" },
    //     { status: 403 }
    //   );
    // }

    return NextResponse.json(revenu);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    // const session = await auth();
    // const sessionId = session?.user?.id;
    
    // if (!session) {
    //   return NextResponse.json(
    //     { error: "Authentification requise" },
    //     { status: 401 }
    //   );
    // }

    const { id, revenuId } = await params;
    const revenuIdNumber = parseInt(revenuId);

    if (isNaN(revenuIdNumber)) {
      return NextResponse.json(
        { error: "L'ID doit être un nombre" },
        { status: 400 }
      );
    }

    if (revenuId !== revenuIdNumber.toString()) {
      return NextResponse.json(
        { error: "L'ID doit contenir uniquement des chiffres" },
        { status: 400 }
      );
    }

    // if (sessionId !== id) {
    //   return NextResponse.json(
    //     { error: "Vous n'êtes pas autorisé à modifier ces données" },
    //     { status: 403 }
    //   );
    // }

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const revenuexistant = await prisma.revenu.findUnique({
      where: { id: revenuIdNumber },
    });

    if (!revenuexistant) {
      return NextResponse.json({ error: "Revenu non trouvé" }, { status: 404 });
    }

    // if (revenuexistant.userId !== sessionId) {
    //   return NextResponse.json(
    //     { error: "Accès non autorisé" },
    //     { status: 403 }
    //   );
    // }

    // A supprimer quand on fera le front
    if (revenuexistant.userId !== user.id) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { prix, description, date } = body;

    const validation = SchemaRevenus.safeParse({ prix, description, date });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const revenumisajour = await prisma.revenu.update({
      where: { id: revenuIdNumber },
      data: {
        prix,
        description,
        date: date ? new Date(date) : undefined,
      },
    });

    return NextResponse.json(revenumisajour);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du revenu:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du revenu" },
      { status: 500 }
    );
  }
}

export async function DELETE(request : NextRequest, { params } : Props){
  // const session = await auth();
  //   const sessionId = session?.user?.id;
    
  //   if (!session) {
  //     return NextResponse.json(
  //       { error: "Authentification requise" },
  //       { status: 401 }
  //     );
  //   }

    const { id, revenuId } = await params;
    const revenuIdNumber = parseInt(revenuId);

    if (isNaN(revenuIdNumber)) {
      return NextResponse.json(
        { error: "L'ID doit être un nombre" },
        { status: 400 }
      );
    }

    // if (sessionId !== id) {
    //   return NextResponse.json(
    //     { error: "Vous n'êtes pas autorisé à modifier ces données" },
    //     { status: 403 }
    //   );
    // }

    if (revenuId !== revenuIdNumber.toString()) {
      return NextResponse.json(
        { error: "L'ID doit contenir uniquement des chiffres" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const revenuexistant = await prisma.revenu.findUnique({
      where: { id: revenuIdNumber },
    });

    if (!revenuexistant) {
      return NextResponse.json({ error: "Revenu non trouvé" }, { status: 404 });
    }

    // if (revenuexistant.userId !== sessionId) {
    //   return NextResponse.json(
    //     { error: "Accès non autorisé" },
    //     { status: 403 }
    //   );
    // }

    // A supprimer quand on fera le front
    if (revenuexistant.userId !== user.id) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const revenusupprimer = await prisma.revenu.delete({
      where : {id : revenuIdNumber}
    })

    return NextResponse.json(revenusupprimer)

}


