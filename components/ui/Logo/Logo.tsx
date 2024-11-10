'use client'
import React from 'react'
import { motion } from 'framer-motion'

function Logo({ size, color }: { size?: number, color?: string }) {
  return (
    <motion.h1
      className=" font-bold italic   font-serif tracking-tight"
      style={{
        fontSize: size ? `${size}rem` : '1.75rem',
        color: color ? color : 'text-[rgba(0,0,0,48%)]',
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: [0, -2] }}
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
  )
}

export default Logo