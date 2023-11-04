import React from 'react';
import Header from './Header';
import Footer from './Footer';
import "./SCSS/Home.scss";
import HomeTop from './HomeTop';
import HomeFeatureConatiner from './HomeFeatureConatiner';

export default function Home() {
  return (
    <>
    <Header />
    <HomeTop />
    <HomeFeatureConatiner />
    <Footer />
    </>
  )
}
