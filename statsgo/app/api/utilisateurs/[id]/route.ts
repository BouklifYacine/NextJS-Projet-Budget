import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string };
}


export async function GET(request: NextRequest, { params }: Props) {
    try {
      const session = await auth();
  
      if (!session) {
        return NextResponse.json(
          { error: "Authentification requise" },
          { status: 401 }
        );
      }
  
      const user = await prisma.user.findUnique({
        where: { id: params.id },
        // faut rajouter includes pour ajouter les relations one to many
        include: {
          depenses: true,
          revenus: true, 
        },
      });
  
      if (!user) {
        return NextResponse.json(
          { error: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }
  
      if (session.user?.id !== user.id) {
        return NextResponse.json(
          { error: "Accès non autorisé" },
          { status: 403 }
        );
      }
  
   
      return NextResponse.json(user);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      return NextResponse.json(
        { error: "Erreur serveur" },
        { status: 500 }
      );
    }
  }

export async function POST(request : NextResponse , {params} : Props){
    const session = await auth()

    if(!session) return NextResponse.json("Vous devez etre connecté pour poster. ")

     const { id } = await params; 

    const user = await prisma.user.findUnique({
            where: { id: id } 
        });
    
     if (!user) {
            return NextResponse.json({ error: "Utilisateur non existant" }, { status: 404 });
        }
    
}

export async function DELETE(request : NextResponse , {params} : Props){

    const session = await auth()

    if(!session) return NextResponse.json("Vous devez etre connecté pour poster. ")

     const { id } = await params; 

    const user = await prisma.user.findUnique({
            where: { id: id } 
        });

    if (!user) {
            return NextResponse.json({ error: "Utilisateur non existant" }, { status: 404 });
        }

    const utilisateursupprimer = await prisma.user.delete({
        where : { id : id}
    })

    return NextResponse.json(utilisateursupprimer.name)
}