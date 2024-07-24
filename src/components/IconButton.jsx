import React from "react"
import {motion} from 'framer-motion'
const IconButton = ({IconComponent, onClick}) => (
	 <motion.div
    className="bg-white rounded flex items-center justify-center cursor-pointer no-underline"
    whileHover={{ scale: 1.1, backgroundColor: '#e5e5e5' }}
    whileTap={{ scale: 0.9, backgroundColor: '#ccc' }}
    transition={{ type: 'spring', stiffness: 300 }}
    onClick={onClick}
  >
    <p className="text-black">
      <IconComponent size={64} weight="fill" />
    </p>
  </motion.div>
)

export default IconButton;
