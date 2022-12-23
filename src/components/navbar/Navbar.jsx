import {
  DarkModeOutlined,
  LanguageOutlined,
  LightModeOutlined,
  ListOutlined,
  SearchOutlined,
} from "@mui/icons-material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggle } from "../../redux/darkMode/DarkModeSlice"
import { fetchSingleUser } from "../../redux/user/UserAction"
import "./navbar.scss"

const Navbar = () => {
  const dispatch = useDispatch()
  const { darkMode } = useSelector((state) => state.darkMode)
  const { currentAuthUser } = useSelector((state) => state.auth)
  const { singleUser } = useSelector((state) => state.user)

  useEffect(() => {
    const getLoggedInUserInfo = () => {
      dispatch(fetchSingleUser(currentAuthUser.uid))
    }
    getLoggedInUserInfo()
  }, [currentAuthUser, dispatch])

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." aria-label="Search" />
          <SearchOutlined />
        </div>

        <div className="items">
          <div className="item">Welcome {singleUser.displayName}</div>
          <div className="item">
            <LanguageOutlined />
            English
          </div>
          <div className="item">
            {darkMode ? (
              <LightModeOutlined onClick={() => dispatch(toggle())} />
            ) : (
              <DarkModeOutlined onClick={() => dispatch(toggle())} />
            )}
          </div>
          <div className="item">
            <ListOutlined />
          </div>
          <div className="item">
            <img src={singleUser.img} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
