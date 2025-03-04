'use client'
import { useState, useEffect } from 'react'
import ActivityPage from '@/components/HomePage/activity/activities'
import PrayerTimeCalendar from '@/components/HomePage/calander/PrayerTimeCalendar'
import DonationPage from '@/components/HomePage/donate/donate'
import EventPage from '@/components/HomePage/event/events'
import Footer from '@/components/HomePage/footer/footer'
// import MosqueGalleryPage from "@/components/HomePage/gallary/mosqueGallary";
import HeroSection from '@/components/HomePage/hero/HeroSection'
import Navbar from '@/components/HomePage/navbar/navbar'
// import ProgramsPage from '@/components/HomePage/programs/programs'
// import TeamsPage from "@/components/HomePage/teams/teams";
import AboutUs from '@/components/HomePage/about-us/AboutUs'

const useRotatingImages = (images: string[], interval: number) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const rotation = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, interval)

    return () => clearInterval(rotation)
  }, [images, interval])

  return currentImageIndex
}

const HomePage: React.FC = () => {
  const images = ['/img/hero1.jpg', '/img/hero5.jpg', '/img/hero3.jpg']
  const currentImageIndex = useRotatingImages(images, 6000)

  return (
    <div className='overflow-x-hidden'>
      <Navbar />

      {/* Hero Section */}
      <section
        id='home'
        className='relative min-h-[90vh] flex items-center px-4 text-black overflow-hidden'
      >
        {/* Animated Background Images */}
        <div className='absolute inset-0 w-full h-full'>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center`}
              style={{
                backgroundImage: `url(${image})`,
                opacity: index === currentImageIndex ? 1 : 0,
                transform:
                  index === currentImageIndex ? 'scale(1)' : 'scale(1.05)',
                transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
              }}
            />
          ))}
        </div>

        {/* Overlay for the Hero Section */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-30 z-20" /> */}
        <div className='relative z-30 mt-20 text-center mx-auto'>
          <HeroSection />
        </div>
      </section>

      {/* Individual Sections */}
      <section id='calender' className=' px-4 bg-white'>
        <PrayerTimeCalendar />
      </section>

      <section id='activities' className='py-12 px-4 bg-yellow-100'>
        <ActivityPage />
      </section>

      <section
        id='events'
        className='py-12 px-4 bg-[#1d8E5A] min-h-screen'
        // style={{
        //   background: "linear-gradient(to right, #ebf8ff, #edf2ff, #ebf8ff)",
        // }}
      >
        <EventPage />
      </section>

      {/* <section id='programs' className='py-12 px-4 bg-gray-300'>
        <ProgramsPage />
      </section> */}

      {/* Uncomment for Gallery */}
      {/* <section id="gallery" className="py-12 px-4 bg-yellow-100">
        <MosqueGalleryPage />
      </section> */}

      <section id='donate' className='px-4 bg-green-100'>
        <DonationPage />
      </section>

      <section id='about' className='py-12 px-4 bg-white'>
        <AboutUs />
      </section>

      {/* Footer */}
      <div
        id='contact'
        style={{ backgroundImage: "url('/img/footer-bg.jpg')" }}
        className=''
      >
        <Footer />
      </div>
    </div>
  )
}

export default HomePage
