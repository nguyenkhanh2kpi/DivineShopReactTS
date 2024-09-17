import React, {useEffect} from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../store/hook';
import {logout} from "../../store/account/action";

export const Logout= ()=> {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(dispatch(logout()))
        navigate("/home/Logout success");
    }, []);
  return (
    <div></div>
  )
}
