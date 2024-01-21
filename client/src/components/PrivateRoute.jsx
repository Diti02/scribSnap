import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
    const {currentUser} = useSelector((state)=>state.user)
    //if current user exists then direct it to the private route created(dashboard) else when user is not present , user is not logged in navigate to sign-in page
  return currentUser ? <Outlet/> : <Navigate to ='/sign-in'/>

}

export default PrivateRoute