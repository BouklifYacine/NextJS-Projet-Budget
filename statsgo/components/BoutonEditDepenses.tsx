import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  id : string, 
  depenseid : number
}

const BoutonEditDepenses = ({id, depenseid} : Props) => {
  
  const router = useRouter()

  const Redirection = () => {
    router.push(`/utilisateur/${id}/revenus/${depenseid}`)
  }
  return <> <Pencil onClick={Redirection} className="text-gray-500" /></>;
};

export default BoutonEditDepenses;
