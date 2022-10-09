import React from "react";

export function Form({ userInput, onFormChange, onFormSubmit }) {
    const handleChange = (e) => {
        onFormChange(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onFormSubmit()
    }

    return (
            <form id="searchBar" onSubmit={handleSubmit}>
                <input type="text" spellCheck="false" required placeholder="Enter the Letterboxd ID's seperated by comma." value={userInput} onChange={handleChange}  />
                <button type="submit" value="Search"><img src={require("../Images/dice.png")} /></button>
            </form>
    )
}