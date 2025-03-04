'use client'
import React, { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import Link from 'next/link'

function Navbar () {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showContactInfo, setShowContactInfo] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowContactInfo(window.scrollY <= 100)
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          setActiveSection(section.getAttribute('id') || '')
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {showContactInfo && (
        <div className='fixed top-0 left-0 w-full bg-transparent text-black text-center py-2 z-50 shadow-lg'>
          <div className='container mx-auto flex gap-4 justify-between items-center text-xs sm:text-sm px-4'>
            <div className='flex space-x-4 items-center'>
              <div className='flex items-center gap-1'>
                <FaPhoneAlt className='text-lg' /> <span>+1 403 971 1823</span>
              </div>
              <div
                className='flex items-center gap-1 cursor-pointer'
                onClick={() =>
                  navigator.clipboard.writeText('medinaunitedm140@gmail.com')
                }
              >
                <FaEnvelope className='text-lg' />{' '}
                <span className='max-sm:hidden'>
                  medinaunitedm140@gmail.com
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <FaMapMarkerAlt className='text-lg' />{' '}
                <span>2008 36 St SE, Calgary AB</span>
              </div>
            </div>
            <div className='flex space-x-4 items-center'>
              <Link
                href='/login'
                className='hover:text-gray-500 text-xs sm:text-sm'
              >
                Login
              </Link>
              <Link
                href='/member_registration'
                className='hover:text-gray-500 text-xs sm:text-sm'
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
      <nav
        className={`fixed left-0 w-full z-50 transition-all h-20 flex items-center justify-center duration-300 ${
          isScrolled
            ? 'bg-white shadow-md top-0 text-black'
            : 'top-16 bg-transparent text-black'
        }`}
      >
        <div className='container mx-auto flex items-center justify-between px-4 py-3'>
          <div className='text-2xl font-bold text-sm max-sm:hidden'>
            AlHuda Islamic Center
          </div>
          <div className='sm:text-2xl font-bold text-sm sm:hidden'>AlHUDA</div>
          <div className='hidden md:flex space-x-6 text-xs sm:text-sm'>
            {[
              'home',
              'Calendar',
              'activities',
              'events',
              // 'programs',
              'about',
              'contact'
            ].map(section => (
              <a
                key={section}
                href={`#${section}`}
                className={`py-2 px-4 font-semibold rounded-md ${
                  activeSection === section
                    ? 'text-yellow-500'
                    : 'hover:text-yellow-500'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
          <div className='hidden md:flex space-x-4'>
            <a
              href='https://donorchoice.ca/embedded/mumfc'
              target='_blank'
              className='py-2 px-6 font-bold text-white bg-green-800 rounded-sm hover:bg-green-700 text-xs sm:text-sm'
            >
              Donate
            </a>
            <Link
              href='/iftar'
              className='py-2 px-6 font-bold text-black bg-gold rounded-sm hover:bg-yellow-400 text-xs sm:text-sm'
            >
              Niyah For Iftar
            </Link>
          </div>
          <div className='md:hidden'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='text-black'
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className='md:hidden absolute top-full left-0 w-full bg-white'>
            <div className='flex flex-col space-y-3 py-4 px-6'>
              {[
                'home',
                'Calendar',
                'activities',
                'events',
                // 'programs',
                'about',
                'contact'
              ].map(section => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`py-2 px-4 rounded-md font-bold ${
                    activeSection === section
                      ? 'text-yellow-500'
                      : 'hover:text-yellow-500'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <a
                href='https://donorchoice.ca/embedded/mumfc'
                target='_blank'
                className='py-2 px-4 font-bold text-center text-white bg-green-800 rounded-md hover:bg-yellow-400'
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate
              </a>
              <Link
                href='/iftar'
                className='py-2 px-4 font-bold text-center text-white bg-gold rounded-md hover:bg-yellow-400'
                onClick={() => setMobileMenuOpen(false)}
              >
                Niya For Iftar
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
export default Navbar
