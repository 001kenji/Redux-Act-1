import React, { useEffect, useState } from "react";
import '../App.css'
import Navbar from "../Components/navbar";
import { useForm } from "react-hook-form";
import {  connect, useSelector } from "react-redux";
import { increment, decrement, pushSearch } from "../action/auth";
// for encryption
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

function Home({increment,decrement, pushSearch}){
  const key = 'eb476296686219bda011dd1d55dc44012e3025fb4e4ef97623ab8547fc14d376'
    //console.log(keyVal.words)
    


    const {register, watch, formState, handleSubmit, getValues}= useForm({
        defaultValues : {
            searchValue : '',
            encryptionText : ''
        },
        mode : 'all'
    })
    const [encryptContainer, setEncryptContainer] = useState({
        EncryptionText : '',
        unEncryptionText : ''
    })
    
    const {errors, isSubmitting, isValid, isDirty} = formState
    const database = useSelector((state) => state.auth)
    const searchHistry = useSelector((state) => state.auth.searchHistry)
    const [showSearch, SetShowSearch] = useState(true)
    const MapperSearch = searchHistry.map((details, i) =>{
        return (
             <span key={i} className=" p-1  w-full text-center mx-auto text-sm font-semibold font-mono">{details}</span>
        )
       
    })

    
    function Lock(event) {
            
            event.preventDefault
            const {value} = event.target
            
            const encryptionVal = value.toString()
            
            const encryptedText = CryptoJS.AES.encrypt(encryptionVal, key).toString();

            const  decreptedText  = CryptoJS.AES.decrypt(encryptedText, key);

            setEncryptContainer((e) => {
                return {
                    ...e,
                    EncryptionText : encryptedText,
                    unEncryptionText : decreptedText.toString(CryptoJS.enc.Utf8)
                }
            })
            //console.log(decreptedText.toString(CryptoJS.enc.Utf8))
            
        }

    const submitSearch = (props) => {
       // console.log(props)
        pushSearch(props.searchValue)
    }
  

    return(
        < >
        <div><Navbar/></div>
        <form onSubmit={handleSubmit(submitSearch)} noValidate  className=" transition-all duration-500 my-1 flex flex-row justify-around mx-2">
            <input {...register('searchValue',{
                required: 'Input Your Ambitions Search'
            })} className=" md:w-[70%] text-slate-900 hover:bg-slate-900 hover:text-slate-100 outline-purple-500 text-center text-ellipsis rounded-sm p-1 bg-slate-200 placeholder:text-center placeholder:text-slate-500 ml-3" placeholder="Search" type="text" />
            {errors.searchValue && <span role="alert" className=" absolute text-red-600 top-4 left-8 bg-slate-900 p-1 rounded-sm text-sm font-semibold ">{errors.searchValue?.message}</span>}
            <button  className=" transition-all duration-500 hover:bg-slate-900 hover:text-purple-500 bg-purple-500 font-semibold rounded-sm min-w-[60px] ">Push</button>
        </form>
        <p className=" md:text-3xl sm:text-base md:my-4 text-center mx-auto my-1 font-semibold animate-bounce">Welcome to React Redux</p>
        
        <div className=" flex flex-col gap-2">
            <div className="  flex mx-auto"><span className=" md:text-xl sm:text-base flex gap-4">Value:  {database.count} </span></div>
            <div className=" mx-auto flex transition-all duration-500 flex-row gap-10">
                <button onClick={() =>increment()} className=" md:text-base hover:border-sky-600 hover:border-[1px] transition-all duration-500 bg-sky-700 text-sm text-amber-500 hover:bg-transparent hover:text-slate-900 p-1 rounded-sm font-semibold">Increment</button>
                <button onClick={decrement} className=" md:text-base hover:border-sky-600 hover:border-[1px] transition-all duration-500 bg-sky-700 text-sm text-amber-500 hover:bg-transparent hover:text-slate-900 p-1 rounded-sm font-semibold">Decrement</button>
            </div>

            <div className="  max-w-[700px] md:mt-10  flex flex-col border-[1px] border-purple-500 mx-auto min-w-[200px] sm:px-6  rounded-sm py-3 shadow-md shadow-sky-600">
                <div className=" mx-auto flex flex-row justify-center gap-3">
                    <button className=" md:text-base p-1 font-semibold bg-sky-600 rounded-sm text-sm text-white hover:text-amber-500 transition-all duration-500" onClick={() => SetShowSearch(false)}>Hide</button>
                    <button className=" md:text-base p-1 font-semibold bg-sky-600 rounded-sm text-sm text-white hover:text-amber-500 transition-all duration-500" onClick={() => SetShowSearch(true)}>Show</button>
                </div>
                <div className={` mx-auto w-full text-center transition-[all, height, width] duration-700 px-2 ${showSearch ? ' z-50 h-fit w-fit opacity-100' : ' opacity-0 h-0 w-0 z-0'} flex flex-col justify-center gap-2 text-center my-4`}>
                    {MapperSearch}
                </div>
            </div>
            
        </div>
        
        <div className=" p-1 flex flex-col gap-4 w-[80%] rounded-sm mx-auto shadow-md shadow-sky-600 mt-4 text-center">
            <big className=" lg:text-4xl text-2xl font-semibold font-mono">Encrypt Some Text</big>
            <input onChange={Lock}
            placeholder="Input any Text"
            className=" placeholder:font-bold p-2 border-[1px] border-purple-700 w-[70%] mx-auto text-center"
            type="text" />
            

            <span className=" lg:text-2xl   text-base  px-2 flex flex-col gap-3 ">Encrypted From: <p className="  break-words mx-auto px-2 text-[11px] md:text-sm lg:text-base">{encryptContainer.EncryptionText}</p></span>
            <span className=" lg:text-2xl flex flex-col gap-3  ">UnEncrypted Form: <p className=" ">{encryptContainer.unEncryptionText}</p></span>
        </div>

        </>
    )
}
const mapStateToProps = (state) => (
    { count: state.count }
    )

export default connect(mapStateToProps, {increment, pushSearch, decrement})(Home)