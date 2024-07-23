import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Skull, Robot, HeartStraight } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

function BadBot() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        // Assuming a navigation will happen here, but this code will ensure the loading screen hides after the timeout.
      }, 10000); // Simulate a network request delay
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleClick = (path, IconComponent) => {
    setIcon(() => IconComponent);
    setLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 2000); // Simulate a network request delay
  };

  return (
    <>
      {loading ? (
        <LoadingScreen icon={icon} />
      ) : (
        <div className="flex items-center justify-center h-screen w-screen bg-black">
          <div className="w-64 h-64 grid grid-cols-2 gap-1 p-2">
            <motion.div
              className="bg-white rounded flex items-center justify-center cursor-pointer no-underline"
              whileHover={{ scale: 1.1, backgroundColor: '#e5e5e5' }}
              whileTap={{ scale: 0.9, backgroundColor: '#ccc' }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => handleClick('/smiley', X)}
            >
              <p className="text-black"><X size={64} weight="fill" /></p>
            </motion.div>
            <motion.div
              className="bg-white rounded flex items-center justify-center cursor-pointer no-underline"
              whileHover={{ scale: 1.1, backgroundColor: '#e5e5e5' }}
              whileTap={{ scale: 0.9, backgroundColor: '#ccc' }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => handleClick('/skull', Skull)}
            >
              <p className="text-black"><Skull size={64} /></p>
            </motion.div>
            <motion.div
              className="bg-white rounded flex items-center justify-center cursor-pointer no-underline"
              whileHover={{ scale: 1.1, backgroundColor: '#e5e5e5' }}
              whileTap={{ scale: 0.9, backgroundColor: '#ccc' }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => handleClick('/robot', Robot)}
            >
              <p className="text-black"><Robot size={64} /></p>
            </motion.div>
            <motion.div
              className="bg-white rounded flex items-center justify-center cursor-pointer no-underline"
              whileHover={{ scale: 1.1, backgroundColor: '#e5e5e5' }}
              whileTap={{ scale: 0.9, backgroundColor: '#ccc' }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => handleClick('/heart', HeartStraight)}
            >
              <p className="text-black"><HeartStraight size={64} weight="fill" /></p>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}

export default BadBot;

