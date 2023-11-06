import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import "./SCSS/Home.scss";
import HomeTop from '../Components/HomeTop';
import HomeFeatureConatiner from '../Components/HomeFeatureConatiner';
import HomeFounder from '../Components/HomeFounder';

export default function Home() {
  return (
    <>
    <Header />
    <HomeTop />
    <HomeFeatureConatiner />
    <HomeFounder />
    <Footer />
    </>
  )
}
