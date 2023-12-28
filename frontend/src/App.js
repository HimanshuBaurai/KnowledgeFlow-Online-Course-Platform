import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../src/components/Home/Home.jsx'
import Header from './components/Layout/Header/Header.jsx';
import Courses from './components/Courses/Courses.jsx';
import Footer from './components/Layout/Footer/Footer.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import ForgetPassword from './components/Auth/ForgetPassword.jsx';
import ResetPassword from './components/Auth/ResetPassword.jsx';
import Contact from './components/Contact/Contact.jsx';
import Request from './components/Request/Request.jsx';
import About from './components/About/About.jsx';
import Subscribe from './components/Payments/Subscribe.jsx';
import NotFound from './components/Layout/NotFound/NotFound.jsx';
import PaymentSuccess from './components/Payments/PaymentSuccess.jsx';
import PaymentFail from './components/Payments/PaymentFail.jsx';
import CoursePage from './components/CoursePage/CoursePage.jsx';
import Profile from './components/Profile/Profile.jsx';
import ChangePassword from './components/Profile/ChangePassword.jsx';
import UpdateProfile from './components/Profile/UpdateProfile.jsx';
import DashBoard from './components/Admin/DashBoard/DashBoard.jsx';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses.jsx';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse.jsx';
import Users from './components/Admin/Users/Users.jsx';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from './redux/Actions/userAction.js';
import { ProtectedRoute } from 'protected-route-react'

function App() {
  // window.addEventListener('contextmenu', (e) => {
  //   e.preventDefault();
  // });//disables right click

  const { isAuthenticated, user, message, error } = useSelector(state => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }
    , [dispatch, message, error]);


  useEffect(() => {
    dispatch(loadUser());//dispatching loadUser action, which will check if user is logged in or not when we refresh the page
  }, [dispatch]);//we are passing dispatch as dependency because we are using it inside useEffect


  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path='/login' element={
          <ProtectedRoute
            isAuthenticated={!isAuthenticated} //not authenticated, then only login route is available
            redirect='/profile'//if authenticated, then redirect to profile page
          >
            <Login />
          </ProtectedRoute>
        } />
        <Route path='/register' element={
          <ProtectedRoute
            isAuthenticated={!isAuthenticated}
            redirect='/profile'
          >
            <Register />
          </ProtectedRoute>
        } />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/request' element={<Request />} />
        <Route path='/about' element={<About />} />
        <Route path='/subscribe' element={<Subscribe />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/paymentfail' element={<PaymentFail />} />
        <Route path='/profile' element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
          //by default isAuthenticated is false, therefore if it is false it redirects to login page(by default "/login" route, check its documentation)
          >
            <Profile />
          </ProtectedRoute>//this is a protected route, which means that only logged in users can access this route
        } />
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
        {/* admin routes  */}
        <Route path='/admin/dashboard' element={<DashBoard />} />
        <Route path='/admin/courses' element={<AdminCourses />} />
        <Route path='/admin/createcourse' element={<CreateCourse />} />
        <Route path='/admin/users' element={<Users />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
