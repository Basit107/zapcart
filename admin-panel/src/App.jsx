import { useState } from 'react'
import Navbar from './Components/navbar/Navbar'
import Admin from './Pages/admin/Admin'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'

function App() {

  return (
      // <BrowserRouter>
      //   <div className="min-h-screen bg-gray-900 text-black relative overflow-hidden" style={{ minHeight: '100vh' }}>
      //     <div className="relative z-50 pt-20">
      //       <Navbar />
      //       <Admin />
      //     </div>
      //   </div>
      // </BrowserRouter>
      <>
      <LoginPage/>
      </>
  )
}

export default App
