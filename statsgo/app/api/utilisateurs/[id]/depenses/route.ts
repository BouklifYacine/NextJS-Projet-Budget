import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { SchemaRevenus } from "@/schema/SchemaRevenus";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: Props) {
  try {
    // const session = await auth();

    // if (!session) {
    //   return NextResponse.json(
    //     { error: "Vous devez être connecté pour accéder à vos données" },
    //     { status: 401 }
    //   );
    // }


    const { id } = await params

    console.log(id)

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // if (session?.user?.email !== user.email) {
    //   return NextResponse.json(
    //     { error: "Vous n'êtes pas autorisé à poster" },
    //     { status: 403 }
    //   );
    // }

    const body = await request.json();
    const { prix, description } = body;

    const validation = SchemaRevenus.safeParse({ prix, description});

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const revenu = await prisma.depenses.create({
      data: {
        prix,
        description,
        date: new Date(),
        userId: user.id,
      },
    });

    return NextResponse.json(revenu, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du revenu:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du revenu" },
      { status: 500 }
    );
  }
}
