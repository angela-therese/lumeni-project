import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Image } from "react-bootstrap"
import  Logo  from '../images/lumeni-no-bg.png'
import "./Login.css"


export const Login = props => {
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://lumeni-api.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("lumeni_user", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <>
         
        <div className="img-login">
            <Image className="img-login" src={Logo } fluid />
        </div>
        
        
       
        <div className="div-nav-comp">
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <div>Please register an account.</div>
                <button className="btn btn-primary button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h3 className="font-weight-normal"> Sign into Lumeni</h3>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="btn btn-primary btn-sign-in">
                            Sign in
                        </button>
                        <section className="link--register">
                             <Link to="/register">Need to register?</Link>
                         </section>
                    </fieldset>
                </form>
                
            </section>
            
        </main>
        </div>
        </>
    )
}