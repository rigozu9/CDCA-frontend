import Notification from './Notification'

const LoginForm = ({ handleLogin, username, password, handleUsername, handlePassword, message, type }) => {
  return (
    <>
      <Notification message={message} type={type}/>
      <form onSubmit={handleLogin}>
        <div>
          username {}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
          password {}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm