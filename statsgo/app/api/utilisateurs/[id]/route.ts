import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {

    const session = await auth()

    if(!session) return NextResponse.json("Vous devez etre connecté pour accéder a vos données ")

    const { id } = await params; 

    const user = await prisma.user.findUnique({
        where: { id: id } 
    });

    if (!user) {
        return NextResponse.json({ error: "Utilisateur non existant" }, { status: 404 });
    }

    return NextResponse.json(user.name);
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