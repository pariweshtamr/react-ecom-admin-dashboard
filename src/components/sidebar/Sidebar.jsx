import "./sidebar.scss"
import {
  AccountCircle,
  CreditCard,
  Dashboard,
  ExitToApp,
  InsertChart,
  Person,
  Settings,
  Store,
} from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { dark, light } from "../../redux/darkMode/DarkModeSlice"
import { logoutSuccess } from "../../redux/auth/AuthSlice"
const Sidebar = () => {
  const dispatch = useDispatch()

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">
          <span className="logo">Admin Panel</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/">
            <li>
              <Dashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users">
            <li>
              <Person className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products">
            <li>
              <Store className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/orders">
            <li>
              <CreditCard className="icon" />
              <span>Orders</span>
            </li>
          </Link>

          <p className="title">USEFUL LINKS</p>
          <li>
            <InsertChart className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <Settings className="icon" />
            <span>Settings</span>
          </li>

          <p className="title">USER</p>
          <li>
            <AccountCircle className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={() => dispatch(logoutSuccess())}>
            <ExitToApp className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch(light())}></div>
        <div className="colorOption" onClick={() => dispatch(dark())}></div>
      </div>
    </div>
  )
}

export default Sidebar
