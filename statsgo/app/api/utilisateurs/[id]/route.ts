import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
    const { id } = await params; 

    const user = await prisma.user.findUnique({
        where: { id: id } 
    });

    if (!user) {
        return NextResponse.json({ error: "Utilisateur non existant" }, { status: 404 });
    }

    return NextResponse.json(user);
}