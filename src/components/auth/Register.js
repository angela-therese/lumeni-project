import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import  Logo  from '../images/lumeni-no-bg.png'
import "./Login.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const organization = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://lumeni-api.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    //Creating "Return Home" button for registration page
    const handleReturnHome = () => {
        history.push(`/login`)
    }

    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("https://lumeni-api.herokuapp.com/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`,
                            organization: organization.current.value
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("lumeni_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
        
    }

    return (
        <>
       <div className="img-login">
            <Image className="img-login" src={Logo } fluid />
        </div>
       
        <main style={{ textAlign: "center" }} className="register-div">

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h3 className="h3 mb-3 font-weight-normal">Register for Lumeni</h3>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputOrg"> Organization name </label>
                    <input ref={organization} type="text" name="organization" className="form-control" placeholder="Organization name" required />
                </fieldset>
                <fieldset>
                    <button type="submit" className="btn btn-primary btn-sign-in"> Register </button>
                </fieldset>
                <fieldset>
                <Link to="/login">Return to Login</Link>
                </fieldset>
            </form>
        </main>
        </>
    )
}