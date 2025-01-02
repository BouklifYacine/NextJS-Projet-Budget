import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const StatsGo = async () => {
 const session = await auth()
 if(!session) {
   redirect('/')
 }
 return (
   <div>StatsGo</div>
 )
}

export default StatsGo