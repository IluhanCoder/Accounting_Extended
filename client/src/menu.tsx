import userStore from "./user/user-store";
import { Link, useLocation } from "react-router-dom";
import { ImSearch, ImUsers, ImNewTab, ImOffice, ImPlus, ImDisplay, ImHammer, ImRocket, ImCart, ImDownload, ImFileText2, ImStatsBars } from "react-icons/im";
import authService from "./auth/auth-service";
import { IoMdGitPullRequest } from "react-icons/io";
import { FaComputer } from "react-icons/fa6";
import { observer } from "mobx-react";
import { MdChecklist, MdDownload, MdElectricalServices, MdGraphicEq, MdGroup, MdOutlineSearch, MdOutlineSell } from "react-icons/md";

const Menu = () => {
    const userIsMain: boolean = userStore.isMain();
    const userIsAdmin: boolean = userStore.isAdmin();
    const userIsJustUser: boolean = userStore.isJustUser();

    return <div className='bg-blue-500 text-white py-6 px-6 flex flex-col justify-between text-nowrap'>
            <div className='flex flex-col gap-5'>
            {userIsMain && <>
                <div>
                    <Link to="/search" className='flex gap-2'>
                        <MdOutlineSearch className='mt-1'/>
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
                        <MdGroup className='mt-1'/>
                        <div>новий відділ</div>
                    </Link>
                </div>
                <div className='flex gap-2'>
                    <Link to="/new-hardware" className='flex gap-2'>
                        <ImPlus className='mt-1'/>
                        <div>нове обладнання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/retired" className='flex gap-2'>
                        <MdChecklist className='mt-1'/>
                        <div>рекомендації</div>
                    </Link>
                </div>
                <div>
                    <Link to="/software" className='flex gap-2'>
                        <MdDownload className='mt-1'/>
                        <div>програмне забезпечення</div>
                    </Link>
                </div>
                <div>
                    <Link to="/sell" className='flex gap-2'>
                        <MdOutlineSell className='mt-1'/>
                        <div>продане обладнання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/power" className='flex gap-2'>
                        <MdElectricalServices className='mt-1'/>
                        <div>споживання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/statistics" className='flex gap-2'>
                        <MdGraphicEq className='mt-1'/>
                        <div>статистика</div>
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
                    <Link to="/new-hardware-request" className='flex gap-2'>
                        <ImCart className='mt-1'/>
                        <div>запит на обладнання</div>
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
                        <IoMdGitPullRequest className="mt-1" />
                        <div>запити до вас</div>
                    </Link>
                </div>
                <div>
                    <Link to="/sell" className='flex gap-2'>
                        <MdOutlineSell className='mt-1'/>
                        <div>продане обладнання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/new-departament" className='flex gap-2'>
                        <MdGroup className='mt-1'/>
                        <div>новий відділ</div>
                    </Link>
                </div>
                <div>
                    <Link to="/software" className='flex gap-2'>
                        <MdDownload className='mt-1'/>
                        <div>програмне забезпечення</div>
                    </Link>
                </div>
                <div>
                    <Link to="/power" className='flex gap-2'>
                        <MdElectricalServices className='mt-1'/>
                        <div>споживання</div>
                    </Link>
                </div>
                <div>
                    <Link to="/statistics" className='flex gap-2'>
                        <MdGraphicEq className='mt-1'/>
                        <div>статистика</div>
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