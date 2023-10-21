import React from 'react';
import {Outlet} from "react-router-dom";

function NavBar() {
    return (
        <>
            <div>NavBar</div>
            <Outlet/>
        </>
    );
}

export default NavBar;