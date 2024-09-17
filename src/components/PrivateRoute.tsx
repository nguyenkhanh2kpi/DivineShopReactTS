import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Login } from '../pages/Account/Login'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const PrivateRoute = () => {
  const account = useSelector((state: RootState) => state.account);
    return account.token ? <Navigate to="/home" /> : <Navigate to="login" />;
}








// export const PrivateRoute = ({
//   children,
//   ...rest
// }:RouteProps): JSX.Element => {
//   return <Route {...rest} render={()=> (true ? children : <Login/>)}></Route>;
// };

