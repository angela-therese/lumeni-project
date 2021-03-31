import React from "react";


export const SearchBar = ({handleChange, placeholder}) => {

  

    return (
        <input type="search" className="search" placeholder={placeholder} onChange={handleChange} />
    )
}

