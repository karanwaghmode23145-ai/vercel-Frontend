import React from 'react'
import {Helmet} from "react-helmet";
import Hero from '../components/Home/Hero/Hero';
import PopularProduct from '../components/Home/PopularProduct/PopularProduct';
import SaleProducts from '../components/Home/SaleProducts/SaleProducts';
import SpecialProducts from '../components/Home/SpecialProducts/SpecialProducts';
import AdBanner from '../components/Home/AdBanner/AdBanner';
import OurPolicy from '../components/Home/OurPolicy/OurPolicy';

const HomePage = () => {
  return (
    <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                 <title>E-com | Karan waghmode</title>
                 <meta name="description"  content="E-com is a ecommerce website built with React and Node.js"/>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <Hero />
            <PopularProduct />
            <SaleProducts />
            <SpecialProducts />
            <AdBanner />
            <OurPolicy />
          
        </div>
  )
}

export default HomePage