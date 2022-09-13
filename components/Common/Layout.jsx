import React from 'react'
import NavBar from '../Header/NavBar'
import Topbar from '../Header/TopBar'
import Footer from '../Footer/Footer'

const Layout = ({children}) => {
  return (
    <>
    <Topbar />
    <NavBar />
    {children}
    <Footer />
    </>
  )
}

export default Layout