import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Splash.module.css'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState } from 'react'

const Home: NextPage = () => {

  const handleGetStarted = () =>{
    console.log("get started!");
  }

  return (
    <div>

        <div className="h-[10rem]">
          {/* padding div for space between top and main elements */}
        </div>
      

        <div className="text-center max-w-2xl mx-auto content-center">
          <h1 className="text-5xl font-bold sans ">
              Crypto Made <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-green-500">Easy</span>
          </h1>
          <h1 className={styles.description}>Send crypto to anyone, anywhere, anytime.</h1>
          <button onClick={()=>handleGetStarted()} className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded my-5">
                            Get Started
          </button>
        </div>

    </div>
 
  )
}

export default Home
