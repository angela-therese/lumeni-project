import React, {useState, createContext} from "react"
import { useHistory } from "react-router-dom"

export const UserContext = createContext()

export const UserProvider = (props) => {

    const [users, setUsers] =useState([])

    // const history = useHistory()

    const getUsers = () => {
    return fetch("https://lumeni-api.herokuapp.com/users")
    .then(res => res.json())
    .then(setUsers)
}

return (
    <UserContext.Provider value={{
        users, getUsers
    }}>
        {props.children}
    </UserContext.Provider>
)

}