"use server"

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

interface Props {
  iduser: string;
}

const StatsGo = async ({ iduser }: Props) => {
  const session = await auth();
  const sessionname = session?.user?.name;
  console.log(session);

  const user = await prisma.user.findUnique({
    where: { id: iduser ?? ""  },
  });

  console.log(user?.id)

  if (!session) {
    redirect("/");
  }

  return <div>Page utilisateur : {sessionname} </div>;
};

export default StatsGo;
