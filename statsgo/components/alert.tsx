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
  }

const Alerte = ({ texte }: AlerteProps) => {
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
      <AlertDialogCancel>Annuler</AlertDialogCancel>
      <AlertDialogAction className="bg-red-500">Supprimer</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </>
  )
}

export default Alerte