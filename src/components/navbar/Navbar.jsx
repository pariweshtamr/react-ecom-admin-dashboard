import {
  DarkModeOutlined,
  LanguageOutlined,
  LightModeOutlined,
  ListOutlined,
  SearchOutlined,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { toggle } from "../../redux/darkMode/DarkModeSlice"
import "./navbar.scss"

const Navbar = () => {
  const { darkMode } = useSelector((state) => state.darkMode)
  const { currentUser } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." aria-label="Search" />
          <SearchOutlined />
        </div>

        <div className="items">
          <div className="item">Welcome {currentUser.displayName}</div>
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
            <img src={currentUser.img} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
