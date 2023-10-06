import PropTypes from 'prop-types'
import { useState } from 'react'
import SignUp from './SignUp'
import '../styles/Login.css'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin, handleSignup }) => {
  const [isSignupMode, setIsSignupMode] = useState(true)

  const toggleSignupMode = () => {
    setIsSignupMode(!isSignupMode)
  }

  return (
    <div id='center-container'>
      {isSignupMode ? (
        <div>
          <SignUp handleSignup={handleSignup} />
          <button className='button has-background-orangeA has-text-white-ter' onClick={toggleSignupMode}>
            {isSignupMode ? 'Already have an account? Login' : 'Don\'t have an account? Signup'}
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleLogin}>
            <h1 className='orange-primary is-size-3'>Login</h1>

            <div>
              Username
              <input
                className="input"
                type="text"
                value={username}
                name="Username"
                id='username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password
              <input
                className="input"
                type="password"
                value={password}
                name="Password"
                id='password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          <button className='button has-background-orangeA has-text-white-ter' id="login" type="submit">Login</button>
          </form>
          <button className='button has-background-orangeA has-text-white-ter' onClick={toggleSignupMode}>
            {isSignupMode ? 'Already have an account? Login' : 'Don\'t have an account? Signup'}
          </button>
        </div>
      )}
    </div>
  )
}

LoginForm.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  // handleUsernameChange: PropTypes.func.isRequired,
  // handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm