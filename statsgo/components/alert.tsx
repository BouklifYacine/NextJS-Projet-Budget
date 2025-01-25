import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import BoutonSupprimer from "./BoutonSupprimer"

interface AlerteProps {
    texte: string;
    Supprimer: () => void;
  }

const Alerte = ({ texte , Supprimer }: AlerteProps) => {
  return (
    <>
   <AlertDialog>
  <AlertDialogTrigger><BoutonSupprimer></BoutonSupprimer></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Voulez vous vraiment supprimer votre {texte} ?  </AlertDialogTitle>
      <AlertDialogDescription>
       Cette action va supprimer votre élement de la base de donnée et ne sera plus récupérable. 
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="hover:bg-gray-300">Annuler</AlertDialogCancel>
      <AlertDialogAction onClick={Supprimer} className="bg-red-500 hover:bg-red-400">Supprimer</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </>
  )
}

export default Alerte