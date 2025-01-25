import { prisma } from "@/prisma";
import { SchemaDepenses } from "@/schema/SchemaDepense";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
    depenseId: string;
  };
}

export async function GET(request: Request, { params }: Props) {
  const { id, depenseId } = await params;

  const depenseIdNumber = parseInt(depenseId);

  // Vérifie si la conversion en string donne le même résultat
  if (depenseIdNumber.toString() !== depenseId) {
    return NextResponse.json(
      {
        error: "ID de dépense invalide - doit contenir uniquement des chiffres",
      },
      { status: 400 }
    );
  }

  try {
    const depense = await prisma.depenses.findFirst({
      where: {
        AND: [{ id: depenseIdNumber }, { userId: id }],
      },
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
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id, depenseId } = await params;

  const depenseIdNumber = parseInt(depenseId);

  // Vérifie si la conversion en string donne le même résultat
  if (depenseIdNumber.toString() !== depenseId) {
    return NextResponse.json(
      {
        error: "ID de dépense invalide - doit contenir uniquement des chiffres",
      },
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

  const depenseExistante = await prisma.depenses.findUnique({
    where: { id: depenseIdNumber },
  });

  if (!depenseExistante) {
    return NextResponse.json(" Cette dépense n'existe pas ");
  }

  const body = await request.json();
  const { prix, description } = body;

  const validation = SchemaDepenses.safeParse({ prix, description });

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors[0].message },
      { status: 400 }
    );
  }

  const depensesmisajour = await prisma.depenses.update({
    where: { id: depenseIdNumber },
    data: {
      prix,
      description,
      date: new Date()
    },
  });

  return NextResponse.json(depensesmisajour);
}

export async function DELETE(request : NextRequest, { params } : Props){

  const { id, depenseId } = await params;

  const depenseIdNumber = parseInt(depenseId);

  // Vérifie si la conversion en string donne le même résultat
  if (depenseIdNumber.toString() !== depenseId) {
    return NextResponse.json(
      {
        error: "ID de dépense invalide - doit contenir uniquement des chiffres",
      },
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

  const depenseExistante = await prisma.depenses.findUnique({
    where: { id: depenseIdNumber },
  });

  if (!depenseExistante) {
    return NextResponse.json(" Cette dépense n'existe pas ");
  }

  const depensesupprimer = await prisma.depenses.delete({
    where : { id : depenseIdNumber}
  })

  return NextResponse.json("La dépense a l'id : " + depensesupprimer.id + " a bien été supprimer")
}
