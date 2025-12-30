import React from 'react'
import { auth } from '@/lib/better-auth/auth';
import {headers} from 'next/headers';
import Header from '@/components/Header';
import TradeIdeas from './tradeideas';

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers()});
   const user = {
        id:session?.user.id,
        name: session?.user.name,
        email: session?.user.email,
    }
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
        <Header user={user}/>
         <main className="flex-1 flex justify-center items-center overflow-hidden">
         <TradeIdeas/>
         </main>
           
         
      
    </div>
  )
}

export default page
