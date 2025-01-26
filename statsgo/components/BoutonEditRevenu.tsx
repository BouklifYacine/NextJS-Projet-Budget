import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  id : string, 
  revenuid : number
}

const BoutonEditRevenus = ({id, revenuid} : Props) => {
  
  const router = useRouter()

  const Redirection = () => {
    router.push(`/utilisateur/${id}/revenus/${revenuid}`)
  }
  return <> <Pencil onClick={Redirection} className="text-gray-500" /></>;
};

export default BoutonEditRevenus;
