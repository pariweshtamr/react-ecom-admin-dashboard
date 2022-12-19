import { useState } from "react"
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import "./login.scss"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../../redux/auth/AuthSlice"
import { fetchSingleUser } from "../../redux/user/UserAction"

const Login = () => {
  const [err, setErr] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        //Signed in
        const user = userCredentials.user
        user && dispatch(loginSuccess(user))
        navigate("/")
      })
      .catch((err) => {
        setErr(true)
      })
  }
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter a Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {err && <span>Wrong email or password!</span>}
      </form>
    </div>
  )
}

export default Login
