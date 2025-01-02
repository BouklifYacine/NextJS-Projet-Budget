import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import SchemaInscription from "@/schema/SchemaInscription";
import { prisma } from "@/prisma";

export async function POST(request: NextRequest) {
    
  const { email, password, name, age } = await request.json();
  const validation = SchemaInscription.safeParse({ email, password ,  name, age });
  if (!validation.success) {
    return NextResponse.json(
        { message: validation.error.errors[0].message }, 
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
      name, 
      age
    },
  });

  return NextResponse.json({
    name : nouvelutilisateur.name
  });
}
