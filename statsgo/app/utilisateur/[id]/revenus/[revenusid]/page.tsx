import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FormulairePatchRevenu from "./FormulairePatchRevenu";

type SearchParams = {
  searchParams: {
    revenuid?: string;
  };
};

export default async function RevenuPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchParams["searchParams"];
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  const { id } = await params;
  const { revenuid } = await searchParams;

  if(!revenuid) return (
    <div>Pas de revenus dégage !</div>
  )

  return (
    <div>
     <FormulairePatchRevenu userId={id} revenuId={revenuid}></FormulairePatchRevenu>
    </div>
  );
}
