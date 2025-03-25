import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
import DealsSection from './DealsSection'
import PromoBanner from './PromoBanner'

const Home = () => {
  return (
    <>
    <Banner/>
    <HeroSection/>
    <Categories/>
   
    <TrendingProducts/>
   
    <PromoBanner/>
    </>
  )
}

export default Home