import { auth } from '@/lib/better-auth/auth'
import Header from '@/components/Header';
import { headers } from 'next/headers';
import PositionCalculatorPage from './positioncalculator';

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers()});
   const user = {
        id:session?.user.id,
        name: session?.user.name,
        email: session?.user.email,
    }

  return (
    <div>
        <Header user={user}/>
        <main  >
        <PositionCalculatorPage/>
        </main>
       
    </div>
  )
}

export default page
