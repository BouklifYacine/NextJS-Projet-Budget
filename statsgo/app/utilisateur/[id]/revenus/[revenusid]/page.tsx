import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RevenuPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  const { id } = await params;

  return (
    <div>
      <h1>Revenus de {session.user.name}</h1>
      <p>ID: {id}</p>
      <Link
        href={`/utilisateur/${session?.user?.id}/dashboard`}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Dashboard
      </Link>
    </div>
  );
}
