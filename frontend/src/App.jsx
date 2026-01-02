import React, { useEffect } from 'react'
import {Router, Navigate, Route, Routes, useNavigate} from "react-router-dom"
import Studentdetails from './Pages/Student/StudentDetail.jsx'
import CreateStudent from './Pages/Author/Home/CreateStd.jsx'
import EditStudent from './Pages/Author/Home/EditStudent.jsx'
import ViewStudent from './Pages/Author/Home/ViewStd.jsx'
import Home from './Pages/Author/Home/Home.jsx'
import  { Toaster } from 'react-hot-toast';
import Signup from './Pages/Signup/signup.jsx'
import Login from './Pages/Login/login.jsx'
import { useQuery } from '@tanstack/react-query'
import { baseUrl } from './content.jsx/sens.jsx'
import Loading from './Utils/Loading.jsx'
import LoadingSpinner from './Utils/Loading.jsx'
import ProfilePage from './Pages/Author/Home/ProfilePage.jsx'
import EditUser from './Pages/Author/Home/EditUser.jsx'


// import Land from './Land'
const App = () => {


    const {data:user,isLoading}=useQuery({
      queryKey:["user"],
      queryFn:async()=>{
        try
        {
          const res = await fetch(`${baseUrl}/api/auther/getMe`,{
            method:"GET",
            credentials:"include",
            headers:{
              "content-type":"application-json",
            }
          })

          const data = await res.json();

          if(data.error){
          return null      
        }

          if(!res.ok){
            throw new Error(data.error || "Something Went Wrong");
          }

          return data
        }
        catch(error)
        {
          throw error.message
        }
      },
      retry:false
    });

  if(isLoading){
    return(
      <div>
        <Loading  size='lg'/>
      </div>
    )
  }

  return (
    <div>
        <Routes>
          <Route path='/' element={user ? <Home /> :<Navigate to="/login" replace/>}/>
           <Route path='/signup' element={!user ?<Signup /> :<Navigate to="/login" replace/>}/>
           <Route path='/login' element={!user ? <Login /> :<Navigate to="/" replace/> } /> 
           <Route path='/profile/:User' element={user ? <ProfilePage /> : <Navigate to="/" replace/> } />
           <Route path='/stdEdit/:StudentName' element={user ? <EditStudent /> : <Navigate to="/" replace/> } />
          <Route path='/student' element={user ? <Studentdetails /> : <Navigate to="/login" replace/> } />
          <Route path='/create' element={user ? <CreateStudent /> : <Navigate to="/login" replace/>} />
          <Route path='/userEdit/:User' element={user ? <EditUser />: <Navigate to="/login" replace/>}/>
          <Route path='/view/:id' element={user ? <ViewStudent /> : <Navigate to="/login" replace/>}/>
          <Route path='/delete/:id' element={user ? <Studentdetails /> :<Navigate to="/login" replace/>}/>
      </Routes>

         <Toaster />

    </div>

  )
}

export default App