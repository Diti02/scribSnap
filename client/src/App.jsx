import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'

const App = () => {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Home></Home>}></Route>
  <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
  <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
  <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
  <Route path="/projects" element={<Projects></Projects>}></Route>
</Routes>

    </BrowserRouter>
  )
}

export default App