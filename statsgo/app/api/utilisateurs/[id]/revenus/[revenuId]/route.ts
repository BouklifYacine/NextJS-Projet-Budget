import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { SchemaRevenus } from "@/schema/SchemaRevenus";
interface Props {
  params: {
    id: string;
    revenuId: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id, revenuId } = await params;

    const revenuIdNumber = parseInt(revenuId);

    if (isNaN(revenuIdNumber)) {
      return NextResponse.json(
        { error: " L'id doit etre un nombre " },
        { status: 400 }
      );
    }

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

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id, revenuId } = await params;

  const revenuIdNumber = parseInt(revenuId);

  if (isNaN(revenuIdNumber)) {
    return NextResponse.json(
      { error: " L'id doit etre un nombre " },
      { status: 400 }
    );
  }

  if (revenuId !== revenuIdNumber.toString()) {
    return NextResponse.json(
      {
        error: "Ce revenu ne correspond pas veuillez écrire juste des nombres ",
      },
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
    return NextResponse.json({ error: "Revenu non trouvé" }, { status: 404 });
  }

  if (revenu.userId !== id) {
    return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { id: revenuId, prix, description, date } = body;

    const validation = SchemaRevenus.safeParse({ prix, description, date });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const revenu = await prisma.revenu.findUnique({
      where: { id: revenuId },
    });

    if (!revenu) {
      return NextResponse.json({ error: "Revenu non trouvé" }, { status: 404 });
    }

    if (revenu.userId !== user.id) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à modifier ce revenu" },
        { status: 403 }
      );
    }

    const revenumisajour = await prisma.revenu.update({
      where: { id: revenuId },
      data: {
        prix,
        description,
        date: date ? new Date(date) : undefined,
      },
    });

    return NextResponse.json(revenumisajour, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du revenu:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du revenu" },
      { status: 500 }
    );
  }
}
