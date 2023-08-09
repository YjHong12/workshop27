import React, { useState } from "react";

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()

        if (username.length === 0) {
            setToken("")
            setError("Username cannot be empty!")
            setUsername("")
            setPassword("")
            return
        }

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            console.log(result)
            setToken(result.token)

        } catch (error) {
            setError(error.message)
        }
    }
    
    return (
        <>
        <h2>Sign Up</h2>
        { error && <p>{error}</p> }
        <form onSubmit={handleSubmit}>
            <label><b>Username: </b>{""} 
            <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label><br />
            <label> <b>Password: </b>{""} 
            <input value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label><br />< br/>

            <button>Submit</button>
        </form>
        </>
    )
}