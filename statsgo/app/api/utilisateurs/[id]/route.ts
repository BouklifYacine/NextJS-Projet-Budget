import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string };
}


export async function GET(request: NextRequest, { params }: Props) {
    try {
      // const session = await auth();
  
      // if (!session) {
      //   return NextResponse.json(
      //     { error: "Authentification requise" },
      //     { status: 401 }
      //   );
      // }

      const { id } = await params
  
      const user = await prisma.user.findUnique({
        where:  { id: id },
        // faut rajouter includes pour ajouter les relations one to many
        include: {
          depenses: true,
          revenus: true, 
        },
      });
      
      const revenus = user?.revenus
      const depenses = user?.depenses
  
      if (!user) {
        return NextResponse.json(
          { error: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }
  
      // if (session.user?.id !== user.id) {
      //   return NextResponse.json(
      //     { error: "Accès non autorisé" },
      //     { status: 403 }
      //   );
      // }
  
   
      return NextResponse.json({revenus,depenses});
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

    // const session = await auth()

    // if(!session) return NextResponse.json("Vous devez etre connecté pour poster. ")

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