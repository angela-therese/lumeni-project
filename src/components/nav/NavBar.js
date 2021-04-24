import React, { Component, useContext, useEffect } from "react"
import { UserContext } from "../UsersProvider"
import { Nav } from "react-bootstrap"
import { Image, Button } from "react-bootstrap"
import Logo from './lumeni-2.png'
import { useHistory } from "react-router-dom"

import "./NavBar.css"

// import "bootstrap/dist/css/bootstrap.min.css"


export const NavBar = () => {

    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear();
        history.push(`/`)

    }

    return (
        <>


            <Nav defaultActiveKey="/home" className="flex-column nav-menu">
                <button className="btnLogout" onClick={handleLogout}>Logout</button>
                <Image src={Logo} fluid /><br></br>
                <div className="menu-item"><Nav.Link href="/">Home</Nav.Link></div>
                <div className="menu-item" ><Nav.Link eventKey="link-3" href="/parcels">Parcels</Nav.Link></div>
                <div className="menu-item"><Nav.Link eventKey="link-2" href="/facilities">Facilities</Nav.Link></div>
                <div className="menu-item"><Nav.Link eventKey="link-4" href="/returns">Returns</Nav.Link></div>
                <div className="menu-item"><Nav.Link eventKey="link-1" href="/reports">Reports</Nav.Link></div>
                {/* <Nav.Link eventKey="disabled" disabled>
                    Disabled
                 </Nav.Link> */}
            </Nav>

            {/* </section> */}

        </>

    )
}
