import React, {useState, createContext} from "react"
import { useHistory } from "react-router-dom"

export const GenreContext = createContext()

export const GenreProvider = (props) => {

    const [genres, setGenres] =useState([])
    // const history = useHistory()

    const getGenres = () => {
    return fetch("http://localhost:8088/genres")
    .then(res => res.json())
    .then(setGenres)
}

return (
    <GenreContext.Provider value={{
        genres, getGenres
    }}>
        {props.children}
    </GenreContext.Provider>
)

}