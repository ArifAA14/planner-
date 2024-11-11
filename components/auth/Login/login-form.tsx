'use client'
import { signinUser } from '@/app/actions/signin'
import { Loader } from '@/components/ui/Icons/Loader';
import { Input } from '@/components/ui/Inputs/Input'
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOptimistic, useState } from 'react';

interface StateMessage {
  message: string;
}

const message: StateMessage[] = [];

function LoginForm() {

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    StateMessage[],
    string
  >(message, (state, newMessage) => [...state, { message: newMessage }])


  const handleSubmit = async (formData: FormData) => {
    addOptimisticMessage('Signing in...');
    setError(null);
    const result = await signinUser(formData);
    if (result.success) {
      router.push("/");
    } else {
      console.log(result);
      // cut off message from 'Read more'
      const message = result.message?.split('Read more')[0];
      setError(message || 'An error occurred during sign in');
      addOptimisticMessage(message || 'An error occurred during sign in');
    }
  };

  return (
    <form action={handleSubmit} className=' w-full flex flex-col gap-5 h-full'>

      {optimisticMessages.map((m, i) => (
        <div key={i}>{m.message}</div>
      ))}

      <div className='flex flex-col gap-1 '>
        <label htmlFor='email' className='px-2 font-light text-gray-500 text-sm lowercase'>
          Email Address
        </label>
        <Input
          id='email'
          name='email'
          placeholder='Email'
          required
          type='email'
        />
      </div>

      <div className='flex flex-col gap-1 '>
        <label htmlFor='name' className='px-2 font-light text-gray-500 text-sm lowercase'>
          Password
        </label>
        <Input
          id='password'
          name='password'
          placeholder='Password'
          required
          type='password'
        />

      </div>






      <button type="submit" className='font-medium text-lg mt-4 px-6 py-2 w-full bg-red-700 
       text-white rounded-lg shadow-sm disabled:opacity-50 h-[50px] '
      >
        <AnimatePresence initial={false} mode='wait'>
          {optimisticMessages.length > 0 ? <motion.div
            key={'loading'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: -50 }}
            transition={{
              duration: 0.34,
              type: 'spring',
            }}
            className='flex items-center justify-center w-full gap-1'
          >
            <Loader width={16} height={16} />
          </motion.div> :
            <motion.div className=' w-full text-center'
              key={'add'}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: -50 }}
              transition={{
                duration: 0.24,
                type: 'spring',
              }}
            >

              <span className='text-sm text-center '>Login</span>
            </motion.div>
          }
        </AnimatePresence>

      </button>



      {/* Display error message */}
      <AnimatePresence mode='wait'>
        {error && <motion.p className="text-red-700 underline font-mono text-sm font-medium"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: -50 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            damping: 10,
            bounce: 0.6
          }}
        >{error}</motion.p>}
      </AnimatePresence>
    </form>
  )
}

export default LoginForm