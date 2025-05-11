import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu,setShowMenu]=useState(false)
  const [token, setToken] = useState(true);
  return (
    <div className="w-[95%] mx-[2.5%] flex justify-between mt-3 mb-10 px-5 items-center bg-white border-b-5 border-x border-t border-transparent backdrop-blur-2xl shadow-2xl shadow-blue-100 rounded-b-md sticky top-0 z-50">
      <NavLink onClick={scrollTo(0,0)} to="/">
        <img className=" px-2 py-2 w-15" src={assets.logo} alt="" />
      </NavLink>
      <ul className="hidden md:flex items-start gap-10">
        <NavLink onClick={scrollTo(0,0)} to="/">
          <li className="">Home</li>
          <hr className="outline-none h-0.5 w-7/10 m-auto bg-blue-700 border-non hidden" />
        </NavLink>
        <NavLink onClick={scrollTo(0,0)} to="/doctors">
          <li>All Doctors</li>
          <hr className="outline-none h-0.5 w-7/10 m-auto bg-blue-700 border-none hidden" />
        </NavLink>
        <NavLink onClick={scrollTo(0,0)} to="/about">
          <li>About</li>
          <hr className="outline-none h-0.5 w-7/10 m-auto bg-blue-700 border-none hidden" />
        </NavLink>
        <NavLink onClick={scrollTo(0,0)} to="/contact">
          <li>Contact</li>
          <hr className="outline-none h-0.5 w-7/10 m-auto bg-blue-700 border-none hidden" />
        </NavLink>
      </ul>
      <div className="flex flex-row gap-3">
        {token == true ? (
          <div className="rounded-full cursor-pointer group  border-blue-500">
            <img className="w-8 rounded-full stroke-blue-500 stroke-3" src={assets.profile_pic} alt="" />
            <div className="absolute bg-transparent  text-white rounded top-0 right-0 hidden group-hover:block">
              <div className="mt-15 bg-blue-500 w-41 px-3 py-2 rounded">
              <p onClick={() =>{navigate("/my-profile");scrollTo(0,0)}} className="active:bg-white active:text-blue-600 inline px-3 py-0.5 rounded">My Profile</p><br />
              <p onClick={() =>{navigate("/my-appoinments");scrollTo(0,0)}} className="active:bg-white active:text-blue-600 inline px-3 py-0.5 rounded">My Appoinment</p><br />
              <p onClick={() => {setToken(false);navigate("/login");}}className="active:bg-white active:text-blue-600 inline px-3 py-0.5 rounded">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() =>{navigate("/login");scrollTo(0,0)}}
            className="bg-blue-500 px-4 py-1 rounded-xl text-white"
          >
            Create Account
          </button>
        )}
        <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
        {/*----  Mobile menu */}
        <div className={`${showMenu?'fixed w-full h-[50vh]':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5">
            <img className="w-15" src={assets.logo} alt="" />
            <img className="w-15" onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className="flex flex-col gap-2 mt-5 px-5 text-lg font-medium justify-start">
            <NavLink onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
