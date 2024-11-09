import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";
import { SquarePenIcon } from "@/components/ui/Icons/Add";

export default async function Home() {
  const session = await auth();
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col min-h-screen  
     md:max-w-[90%] mx-auto py-6 md:px-6 relative gap-10 px-6
    ">

      <div className=' flex items-end w-full justify-end'>
        <SignOut />
      </div>


      <div className="flex flex-col items-center justify-center w-full h-full gap-10  md:py-10">

        <div className="flex w-full items-center ">
          <div className="flex flex-col gap-1.5 w-full h-full ">
            <h1 className="text-black font-medium text-2xl ">
              Good Evening, {session?.user?.name}
            </h1>
            <p className="text-gray-400 font-medium text-md">
              {`It's ${new Date().toLocaleDateString('en-GB', {
                weekday: 'long',
              })}, ${new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}`}
            </p>
          </div>
          <SquarePenIcon />
        </div>


        <div className="flex flex-col gap-4 w-full h-full">
          <h2 className="text-black font-medium text-xl">
            Today
          </h2>

          <div className="flex flex-col gap-2 w-full h-full">
            <div className="flex flex-col gap-1 w-full h-full">
              <h3 className="text-black font-medium text-lg">
                Task 1
              </h3>
              <p className="text-gray-400 font-medium text-md">
                This is a task description
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full h-full">
              <h3 className="text-black font-medium text-lg">
                Task 2
              </h3>
              <p className="text-gray-400 font-medium text-md">
                This is a task description
              </p>
            </div>
          </div>
        </div>

      </div>



    </div>
  );
}
