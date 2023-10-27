import React, { useContext } from 'react'
import Footer from '../../component/account/Footer'
import Header from '../../component/account/Header'
import { AuthContext } from '../../Context/Contextprovider'
export default function Home() {
  return (
    <div>
     <Header/>
      <Footer/>
     
    </div>
  )
}
