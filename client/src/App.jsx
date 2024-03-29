import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { Header } from './components/Header'
import { FooterCom } from './components/FooterCom';
import PrivateRoute from './components/PrivateRoute';
import {OnlyAdminPrivateRoute} from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost.jsx'
import UpdatePost from './pages/UpdatePost.jsx'
import { PostPage } from './pages/PostPage.jsx'
import { Search } from './pages/Search.jsx'
import { About } from './pages/About.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop></ScrollToTop>
    <Header></Header>
    {/* <FooterCom></FooterCom> */}
<Routes>
  <Route path="/" element={<Home></Home>}></Route>
  <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
  <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
  <Route path='/search' element={<Search></Search>}></Route>
  <Route path='/about' element={<About></About>}></Route>
  <Route element={<PrivateRoute/>}>
  <Route path="/dashboard" element={<Dashboard></Dashboard>}>    
  </Route>
  </Route>

  <Route element={<OnlyAdminPrivateRoute/>}>
  <Route path="/create-post" element={<CreatePost></CreatePost>}>    
  </Route>
  </Route>

  <Route element={<OnlyAdminPrivateRoute/>}>
  <Route path="/update-post/:postId" element={<UpdatePost></UpdatePost>}>    
  </Route>
  </Route>
  
  <Route path="/projects" element={<Projects></Projects>}></Route>
  <Route path="/post/:postSlug" element={<PostPage></PostPage>}></Route>
  
</Routes>
    <FooterCom></FooterCom>
    </BrowserRouter>
  )
}

export default App