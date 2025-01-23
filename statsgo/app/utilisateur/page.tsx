import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const StatsGo = async () => {
  
  const session = await auth()
  const sessionname = session?.user?.name
  console.log(session)
 
 
    if(!session){
        redirect("/")
    }
    
  return (
    <div>Page utilisateur : {sessionname} </div>
  )
}

export default StatsGo