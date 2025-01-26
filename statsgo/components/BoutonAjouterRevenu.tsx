import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useRouter } from "next/navigation";

interface Props {
    userId : string
}
 
export default function AjouterDesRevenus({userId} : Props) {
    
    const router = useRouter()

    const handleClick = () => {
        router.push(`/utilisateur/${userId}/revenus`);
      };
  return <InteractiveHoverButton onClick={handleClick}>Ajouter des revenus</InteractiveHoverButton>;
}