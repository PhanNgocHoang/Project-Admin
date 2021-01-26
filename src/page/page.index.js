import React from 'react';
import { NavComponent } from '../components/nav'
import { HeaderComponent } from '../components/header'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Alert from "react-s-alert";
export const PageIndex = () => {
    const user = useSelector((state) => { return state.login.data })
    if (!user.token) {
        return <Redirect to="/login" />
    }
    return <div>
        <Alert stack={{ limit: 3 }} />
        <NavComponent />
        <HeaderComponent>
        </HeaderComponent>
    </div>
}