import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobilMenuOpen, setMobileMenuOpen] = useState(false)
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobilMenuOpen)
  }


  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container mx-auto flex justify-between items-center py-4 px-6 md:px-10"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-600"><Link to={'/'}>SIWES Connect</Link></h1>
          <nav className={` hidden md:flex items-center space-x-6`}>
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <Link to={'/login'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-teal-600 text-white font-medium rounded-md shadow-md hover:bg-teal-700 transition"
                >
                  Login
                </motion.button>
              </Link>
              <Link to={'/signup'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-teal-600 text-teal-600 font-medium rounded-md shadow-md hover:bg-teal-600 hover:text-white transition"
                >
                  Signup
                </motion.button>
              </Link>
              <Link to={'/company/login'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md shadow-md hover:bg-gray-200 transition"
                >
                  Company Login
                </motion.button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className={`md:hidden ${mobilMenuOpen ? 'block' : 'hidden'}`}>
            <nav className="flex flex-col items-center space-y-4">
              <Link to={'/login'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-teal-600 text-white font-medium rounded-md shadow-md hover:bg-teal-700 transition"
                >
                  Login
                </motion.button>
              </Link>
              <Link to={'/signup'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-teal-600 text-teal-600 font-medium rounded-md shadow-md hover:bg-teal-600 hover:text-white transition"
                >
                  Signup
                </motion.button>
              </Link>
              <Link to={'/company/login'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md shadow-md hover:bg-gray-200 transition"
                >
                  Company Login
                </motion.button>
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}
              className="text-gray-600 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </motion.div>
      </header>
    </>
  )
}

export default Header