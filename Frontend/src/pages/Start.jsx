import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Start(){

    const naviagte= useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token")){
            naviagte("/dashboard")
        }
        else{
            naviagte("/launch")
        }
    },[])
    return null;
}

export default Start;