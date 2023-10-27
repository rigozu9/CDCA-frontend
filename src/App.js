import { useState, useEffect } from 'react'

import Clothing from './components/Clothing'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import ClothingForm from './components/ClothingForm'
import Togglable from './components/Togglable'

import loginService from './services/login'
import clothingService from './services/clothes'


const App = () => {
  const [clothes, setClothes] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState(true)

  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    clothingService
      .getAll()
        .then(clothes  => {
        setClothes(clothes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedCDCAUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      clothingService.setToken(user.token)
    }
  }, [])

  const showSuccessMsg = (successMsg) => {
    setMessage(successMsg)
    setMsgType(true)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const showErrorMsg = (errorMsg) => {
    setMessage(errorMsg)
    setMsgType(false)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      
      window.localStorage.setItem(
        'loggedCDCAUser', JSON.stringify(user)
      ) 
      
      clothingService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.clear()
  } 

  const handleUsername = ({ target }) => {
    console.log('username', target.value)
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    console.log('password', target.value)
    setPassword(target.value)
  }
  
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <h1>Log in to application</h1>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm 
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
            message={message}
            type={msgType}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
        <Footer />
      </div>
)}

  const deleteClothing = async id => {
    try {
      await clothingService.remove(id)
      setClothes(clothes.filter(clothing => clothing.id !== id))
      showSuccessMsg('Garment deleted succesfully!')
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    }
  }
  
  const clothingForm = () => (
    <div>
      <h1>CDCA clothes</h1>
      <Notification message={message} type={msgType}/>
      <p>
        {user.name} logged in {}
        <button onClick={handleLogOut}>logout</button>
      </p>
      <Togglable buttonLabel="add new piece">
        <ClothingForm 
          clothes={clothes}
          setClothes={setClothes}
          showSuccessMsg={showSuccessMsg}
          showErrorMsg={showErrorMsg}
        />
      </Togglable>
      <h2>BÄNGER CLOTHES</h2>
      {clothes.map(clothing => (
        <Clothing 
          key={clothing.id} 
          clothing={clothing} 
          deleteClothing={deleteClothing}
        />
      ))}
      <Footer />
    </div>
  )
  

  return (
    <div>
      {!user ? loginForm() : clothingForm()}
    </div>
  )
}

export default App