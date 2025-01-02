import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import SchemaInscription from "@/schema/SchemaInscription";
import { prisma } from "@/prisma";

export async function POST(request: NextRequest) {
    
  const { email, password, pseudo, age } = await request.json();
  const validation = SchemaInscription.safeParse({ email, password ,  pseudo, age });
  if (!validation.success) {
    return NextResponse.json(
        { message: validation.error.errors[0].message }, // Renvoyer un objet JSON
        { status: 400 }
    );
}

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user)
    return NextResponse.json("Cet email est déja utilisé", { status: 400 });

  const motdepasse = await bcrypt.hash(password, 10);

  const nouvelutilisateur = await prisma.user.create({
    data: {
      email,
      password: motdepasse,
      pseudo, 
      age
    },
  });

  return NextResponse.json({
    pseudo : nouvelutilisateur.pseudo
  });
}
