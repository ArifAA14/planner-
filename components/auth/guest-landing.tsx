'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import LoginComponent from './Login/login-component'
import RegisterComponent from './Register/register-component'
import LocaleSwitcher from '../ui/Language/LocaleSwitcher'

function GuestLanding() {
  const [formSelected, setFormSelected] = useState('register');

  return (
    <div className='w-full h-full min-h-screen  grid md:grid-cols-2  overflow-hidden   '>

      <div className='w-full h-full bg-red-700 px-10 py-10 flex flex-col gap-4 items-center justify-center relative'>
        <div className='absolute left-4 top-6'>
          <LocaleSwitcher textColor='text-white' />
        </div>

        <motion.h1
          className="text-[rgba(0,0,0,48%)] font-bold italic md:text-7xl font-serif tracking-tight"
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: [0, -4] }}
          transition={{
            duration: 0.78,
            ease: "easeInOut",
            type: "tween",
            scale: { duration: 0.44, ease: "easeInOut" },
            rotate: { delay: 0.8, duration: 0.887, ease: "easeInOut" }
          }}
        >
          Planner*
        </motion.h1>

      </div>


      <div className='w-full h-full relative'>

      <AnimatePresence mode='wait'>

        {formSelected === 'register' ? <RegisterComponent setFormSelected={setFormSelected} /> : <LoginComponent setFormSelected={setFormSelected} />}

        </AnimatePresence>
      </div>

    </div>
  )
}

export default GuestLanding