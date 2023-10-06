import { useState } from 'react'

const SignUp = ({ handleSignup }) => {
    const [newName, setNewName] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const addUser = (event) => {
        event.preventDefault()

        handleSignup({
            username: newUsername,
            name: newName,
            password: newPassword
        })

        setNewUsername('')
        setNewName('')
        setNewPassword('')
    }

    return (
        <form onSubmit={addUser}>
            <h1 className='orange-primary is-size-3'>Signup</h1>

            <div>
                Username
                <input
                    className="input"
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
            </div>
            <div>
                Name
                <input
                    className="input"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
            </div>
            <div>
                Password
                <input
                    className="input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <button className='button has-background-orangeA has-text-white-ter' type="submit">Signup</button>
        </form>
    )
}

export default SignUp