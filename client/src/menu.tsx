import userStore from "./user/user-store";
import { Link } from "react-router-dom";
import { ImSearch, ImUsers, ImNewTab, ImOffice, ImPlus, ImDisplay, ImHammer, ImRocket, ImCart, ImDownload, ImFileText2, ImStatsBars } from "react-icons/im";
import authService from "./auth/auth-service";
import { observer } from "mobx-react";

const Menu = () => {
    const userIsMain: boolean = userStore.isMain();
    const userIsAdmin: boolean = userStore.isAdmin();
    const userIsJustUser: boolean = userStore.isJustUser();

    return <div className='bg-blue-500 text-white py-6 px-6 flex flex-col justify-between text-nowrap'>
            <div className='flex flex-col gap-5'>
            {userIsMain && <>
                <div>
                    <Link to="/search" className='flex gap-2'>
                        <ImSearch className='mt-1'/>
                        <div>пошук обладнання</div>
                    </Link>
                </div> 
                <div>
                    <Link to="/registration" className='flex gap-2'>
                        <ImUsers className='mt-1'/>
                        <div>користувачі</div>
                    </Link>
                </div>
                <div>
                    <Link to="/main-requests" className='flex gap-2'>
                        <ImNewTab className='mt-1'/>
                        <div>запити на обладнання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/new-departament" className='flex gap-2'>
                        <ImOffice className='mt-1'/>
                        <div>новий відділ</div>
                    </Link>
                </div>
                <div className='flex gap-2'>
                    <Link to="/new-hardware" className='flex gap-2'>
                        <ImPlus className='mt-1'/>
                        <div>нове обладнання</div>
                    </Link>
                </div>
                </>
            }
            {userIsJustUser && <>
                <div>
                    <Link to="/personal-hardware" className='flex gap-2'>
                        <ImDisplay className='mt-1'/>
                        <div>персональне обладнання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/new-service-request" className='flex gap-2'>
                        <ImHammer className='mt-1'/>
                        <div>запит на обслуговування</div>
                    </Link>
                </div>
                <div>
                    <Link to="/new-modification-request" className='flex gap-2'>
                        <ImRocket className='mt-1'/>
                        <div>запит на модифікацію</div>
                    </Link>
                </div>
                </>
            }
            {userIsAdmin && <>
                <div>
                    <Link to="/personal-hardware" className='flex gap-2'>
                        <ImDisplay className='mt-1'/>
                        <div>обладнання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/new-hardware-request" className='flex gap-2'>
                        <ImCart className='mt-1'/>
                        <div>запит на обладнання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/admin-requests" className='flex gap-2'>
                        <ImDownload className='mt-1'/>
                        <div>запити до вас</div>
                    </Link>
                </div>
                <div>
                    <Link to="/retired" className='flex gap-2'>
                        <ImFileText2 className='mt-1'/>
                        <div>рекомендації</div>
                    </Link>
                </div>
                <div>
                    <Link to="/sell" className='flex gap-2'>
                        <ImStatsBars className='mt-1'/>
                        <div>продане обладнання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/new-departament" className='flex gap-2'>
                        <ImOffice className='mt-1'/>
                        <div>новий відділ</div>
                    </Link>
                </div>
                </>
            }  
    </div>
    <div>
        <button className='underline' type='button' onClick={async () => { await authService.logout(); window.open("/") }}>вийти</button>
    </div>
        </div>
}

export default observer(Menu);