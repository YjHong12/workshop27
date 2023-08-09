import React, { useState } from "react";

export default function Authenticate({ token, setToken }) {
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [dataUser, setDataUser] = useState(null)

    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()
            console.log(result)
            setSuccessMessage(result.message)
            console.log(result.data)
            setDataUser(result.data.username)
            setToken(result.token)

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
        <h2>Authenticate</h2>
        { dataUser && <p><b>Welcome </b>{dataUser}!</p> }
        { successMessage && <p>{successMessage}</p> }
        { error && <p>{error}</p> }

        <button onClick={handleClick}>Authenticate Token</button>
        </>
    )
}