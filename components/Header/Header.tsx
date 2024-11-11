'use client'
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import TaskDialog from '../Tasks/Dialog/TaskDialog';

function Header({ session }: { session: Session | null }) {

  const t = useTranslations('HomePage');


  return (
    <div className="flex w-full items-center ">
      <div className="flex flex-col gap-1.5 w-full h-full ">
        <h1 className="text-black font-medium text-2xl ">
          {t('Title', { name: session?.user?.name || '' })}

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
      <TaskDialog userId={session?.user?.id} />
    </div>

  )
}

export default Header