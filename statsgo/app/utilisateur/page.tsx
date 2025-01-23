"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

interface Props {
  iduser: string;
}

const StatsGo = async ({ iduser }: Props) => {
  const session = await auth();

  const sessionname = session?.user?.name;
  const sessionId = session?.user?.id;
  console.log(session?.user?.id);

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  const utilisateurid = user?.id;
  const utilisateurEmail = user?.email
  console.log(utilisateurEmail)

  console.log(utilisateurid);

  if (!session ) {
    redirect("/");
  }

  return <div>Page utilisateur : {sessionname} + {utilisateurEmail} + {sessionId} </div>;
};

export default StatsGo;
