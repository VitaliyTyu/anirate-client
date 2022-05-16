import React, { FC, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/context';
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface UserMenuProps {
    isAuth: boolean;
}

const UserMenu: FC = () => {
    const { isAuth, } = useTypedSelector(state => state.auth)

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1>{isAuth ? "YES" : "NO"}</h1>
        </div>
    );
};

export default UserMenu;