import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import FormulairePatchDepense from "./FormulairePatchDepense";

type SearchParams = {
  searchParams: {
    iddepense?: string;
  };
};

export default async function DepensePage({
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

  const { id } = params;
  const { iddepense } = searchParams;

  if (!iddepense) {
    redirect(`/utilisateur/${id}/dashboard`);
  }

  return (
    <div>
    <FormulairePatchDepense userId={id} depenseId={iddepense}></FormulairePatchDepense>
    </div>
  );
}