import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationPage from './auth/registration-page';
import LoginPage from './auth/login-page';
import authService from './auth/auth-service';
import HardwareForm from './hardware/hardware-form';
import NewDepartamentPage from './departament/new-departament-page';
import AuthGates from './misc/auth-gates';
import NewHardwarePage from './hardware/new-hardware-page';
import EditHardwarePage from './hardware/edit-hardware-page';
import SearchPage from './hardware/search-page';
import RetiredPage from './hardware/retired-page';
import ModificationRequestPage from './request/modification-request-page';
import ServiceRequestPage from './request/service-request-page';
import HardwareRequestPage from './request/hardware-request-page';
import MainRequestsPage from './request/main-requests-page';
import SubmitHardwarePage from './request/submit-hardware-page';
import AdminRequestPage from './request/admin-requests-page';
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from  "react-datepicker";
import { uk } from 'date-fns/locale/uk';
import userStore from './user/user-store';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import SelledHardwarePage from './hardware/selled-hardware-page';
registerLocale('ua', uk)

function App() {
  const verifyUser = async () => {
    await authService.checkAuth();
  }
  
  useEffect(() => {
    verifyUser();
  }, [])

  const currentUser = userStore.user;

  return (
    <div className='h-full flex flex-col'>
      <BrowserRouter>
        <ToastContainer/>
        <div className='bg-blue-400 text-white py-2 px-6 flex justify-between'>
          <div className='flex gap-5'>
            {currentUser?.role === "main" && <div>
              <Link to="/search">пошук обладнання</Link>
            </div>}
            {currentUser?.role === "user" && <div>
              <Link to="/personal-hardware">персональне обладнання</Link>
            </div>}
            {currentUser?.role === "admin" && <div>
              <Link to="/personal-hardware">обладнання</Link>
            </div>}
            {currentUser?.role === "admin" && <div>
              <Link to="/new-hardware-request">запит на обладнання</Link>
            </div>}
            {currentUser?.role === "user" && <div>
              <Link to="/new-service-request">запит на обслуговування</Link>
            </div>}
            {currentUser?.role === "user" && <div>
              <Link to="/new-modification-request">запит на модифікацію</Link>
            </div>}
            {currentUser?.role === "admin" && <div>
              <Link to="/admin-requests">запити до вас</Link>
            </div>}
            {currentUser?.role === "admin" && <div>
              <Link to="/retired">рекомендації</Link>
            </div>}
            {currentUser?.role === "admin" && <div>
              <Link to="/sell">продане обладнання</Link>
            </div>}
            {currentUser?.role === "main" && <div>
              <Link to="/registration">користувачі</Link>
            </div>}
            {currentUser?.role === "main" && <div>
              <Link to="/main-requests">запити на обладнання</Link>
            </div>}
            {(currentUser?.role === "main" || currentUser?.role === "admin") && <div>
              <Link to="/new-departament">новий відділ</Link>
            </div>}
            {(currentUser?.role === "main") && <div>
              <Link to="/new-hardware">нове обладнання</Link>
            </div>}
          </div>
          <div>
            <button className='underline' type='button' onClick={async () => { await authService.logout(); window.open("/") }}>вийти</button>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/registration' element={<AuthGates roles={["admin", "main"]}><RegistrationPage/></AuthGates>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/new-hardware' element={<AuthGates roles={["admin", "main"]}><NewHardwarePage/></AuthGates>}/>
          <Route path='/edit-hardware/:id' element={<AuthGates><EditHardwarePage/></AuthGates>}/>
          <Route path='/new-departament' element={<AuthGates roles={["admin", "main"]}><NewDepartamentPage/></AuthGates>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path='/personal-hardware' element={<AuthGates><SearchPage isPersonal/></AuthGates>}/>
          <Route path='/retired' element={<AuthGates roles={["admin", "main"]}><RetiredPage/></AuthGates>}/>
          <Route path='/new-modification-request' element={<AuthGates><ModificationRequestPage/></AuthGates>}/>
          <Route path='/new-service-request' element={<AuthGates><ServiceRequestPage/></AuthGates>}/>
          <Route path='/new-hardware-request' element={<AuthGates><HardwareRequestPage/></AuthGates>}/>
          <Route path='/main-requests' element={<AuthGates roles={["main"]}><MainRequestsPage/></AuthGates>}/>
          <Route path='/submit-hardware-request/:hardwareRequestId' element={<AuthGates roles={["main"]}><SubmitHardwarePage/></AuthGates>}/>
          <Route path="/admin-requests" element={<AuthGates roles={["admin"]}><AdminRequestPage/></AuthGates>}/>
          <Route path='/sell' element={<AuthGates roles={["admin", "main"]}><SelledHardwarePage/></AuthGates>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
