import React from 'react';
import { motion } from 'framer-motion';

function LoadingScreen({ icon: Icon }) {


  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black">
      <motion.div
        className="flex items-center justify-center"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Icon size={128} weight="fill" color="white"/>
      </motion.div>
    </div>
  );
}

export default LoadingScreen;

