import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";
import Header from "@/components/Header/Header";
import Tasks from "@/components/Tasks/Task";
import Logo from "@/components/ui/Logo/Logo";



export default async function Home() {
  const session = await auth()

  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col min-h-screen  
     md:max-w-[90%] mx-auto py-6 md:px-6 relative gap-10 px-6 
    ">

      <div className=' flex w-full h-full justify-between mt-4 '>
        <Logo color="rgb(185 28 28)" />
        <SignOut />
      </div>


      <div className="flex flex-col items-center justify-center w-full h-full gap-6  md:py-10">
        <Header session={session} />
        <Tasks session={session} />
      </div>
    </div>
  );
}
