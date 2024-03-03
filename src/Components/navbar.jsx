import React, { useLayoutEffect, useState } from "react";
import '../App.css'
import CarImg from '../assets/sedan.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
export default function Navbar(props){
    const [showNav, setShowNav] = useState(false)

    //console.log(window.innerWidth)
    useLayoutEffect(() => {
        window.innerWidth >=1024 ? setShowNav(true): ''
    },[])
    window.addEventListener('resize', function(){
        window.innerWidth >=1024 ? setShowNav(true): ''
    })

    return(
        <>
        <div className=" flex flex-row bg-slate-300 px-1 justify-between">
            <div className=" flex flex-row ">
                <span className="lg:text-4xl font-bold my-auto px-2 text-lg md:text-2xl">B-Intel</span>
                <img id="carImg" src={CarImg} className=" mx-2 animate-pulse  w-10 h-10" alt="" />
            </div>
            <div className=" gap-4 align-middle flex">
                <GiHamburgerMenu onClick={() => setShowNav((e) => !e)} className=" lg:hidden mr-2 my-auto text-xl hover:text-purple-800 " />
                <ul className={` md:text-base bg-slate-800 text-slate-100 px-2 py-3 gap-2 transition-all duration-500 ${showNav ? ' z-50 opacity-100 translate-y-0' : ' translate-y-5 z-0 opacity-0'} absolute lg:relative lg:flex-row lg:top-0 lg:bg-transparent lg:text-slate-900 lg:min-w-[300px] lg:justify-around  top-10 text-left font-semibold text-sm right-2  flex flex-col`}>
                    <Link to='/' className=" hover:text-amber-600 hover:font-semibold">Home</Link>
                    <Link className=" hover:text-amber-600 hover:font-semibold">Cars</Link>
                    <Link className=" hover:text-amber-600 hover:font-semibold">Undefined</Link>
                </ul>
            </div>
        </div>
        </>
    )
}