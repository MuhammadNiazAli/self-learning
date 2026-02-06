import React from 'react'
import HomeHero from './components/HomeHero'
import HomeAbout from './components/HomeAbout'
import HomeServices from './components/HomeServices'
import HomeCourses from './components/HomeCourses'
import HomeAuthor from './components/HomeAuthor'
import HomeCodeExecutor from './components/HomeCodeExecutor'
import HomeContactUs from './components/HomeContactUs'

const Homecover = () => {
  return (
    <div>
      <HomeHero/>
      <HomeAbout/>
      <HomeServices/>
      <HomeCourses/>
      <HomeAuthor/>
      <HomeCodeExecutor/>
      <HomeContactUs/>
    </div>
  )
}

export default Homecover
