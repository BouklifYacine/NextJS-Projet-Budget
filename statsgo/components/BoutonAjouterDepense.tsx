import { useRouter } from "next/navigation";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

interface Props {
    userId: string;
  }
  
  export default function AjouterDesDepenses({ userId }: Props) {
    const router = useRouter();
  
    const handleClick = () => {
      router.push(`/utilisateur/${userId}/depenses`);
    };
  
    return (
      <InteractiveHoverButton onClick={handleClick}>
        Ajouter des dépenses
      </InteractiveHoverButton>
    );
  }