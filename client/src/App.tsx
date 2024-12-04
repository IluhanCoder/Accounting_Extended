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
import Menu from './menu';
import FormCloserProvider from './forms/form-closer-provider';
import formStore from './forms/form-store';
import PowerPage from './analytics/power-page';
import NewSoftwarePage from './software/new-software-page';
import SoftwarePage from './software/software-page';
registerLocale('ua', uk)

function App() {
  const verifyUser = async () => {
    await authService.checkAuth();
  }
  
  useEffect(() => {
    verifyUser();
  }, [])

  const {form} = formStore;

  return (
    <div className='h-full flex bg-blue-50'>
      <BrowserRouter>
        <FormCloserProvider>
        <ToastContainer/>
          <div className='flex w-full'>
            <Menu/>
            <div className='grow overflow-auto'>
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
                <Route path='/new-modification-request/:hardwareId' element={<AuthGates><ModificationRequestPage/></AuthGates>}/>
                <Route path='/new-service-request/:hardwareId' element={<AuthGates><ServiceRequestPage/></AuthGates>}/>
                <Route path='/new-hardware-request' element={<AuthGates><HardwareRequestPage/></AuthGates>}/>
                <Route path='/main-requests' element={<AuthGates roles={["main"]}><MainRequestsPage/></AuthGates>}/>
                <Route path='/submit-hardware-request/:hardwareRequestId' element={<AuthGates roles={["main"]}><SubmitHardwarePage/></AuthGates>}/>
                <Route path="/admin-requests" element={<AuthGates roles={["admin"]}><AdminRequestPage/></AuthGates>}/>
                <Route path='/sell' element={<AuthGates roles={["admin", "main"]}><SelledHardwarePage/></AuthGates>}/>
                <Route path='/power' element={<AuthGates><PowerPage/></AuthGates>}/>
                <Route path='/new-software' element={<AuthGates roles={["admin", "main"]}><NewSoftwarePage/></AuthGates>}/>
                <Route path='/software' element={<AuthGates roles={["admin", "main"]}><SoftwarePage/></AuthGates>}/>
              </Routes>
            </div>
          </div>
          {form && <div>{form}</div>}
          </FormCloserProvider>
        </BrowserRouter>
    </div>
  );
}

export default observer(App);
