import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from "../../assets/banner.PNG"

const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
        <h4 className="uppercase">UPP TILL 40% RABATT PÅ</h4>
<h1>Magiska Leksaker</h1>
<p>
  Upptäck en värld av lek och fantasi! Hos SkogsNallen hittar du ett 
  noggrant utvalt sortiment av mjukdjur, träleksaker och spel som 
  inspirerar till glädje och kreativitet för barn i alla åldrar.
</p>
<button className="btn">
  <Link to="/shop">UPPTÄCK NU</Link>
</button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt="banner image" />
        </div>
    </div>
  )
}

export default Banner