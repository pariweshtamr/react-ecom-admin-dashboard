import {
  AccountBalanceOutlined,
  KeyboardArrowUp,
  MonetizationOnOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material"
import "./widget.scss"

const Widget = ({ type }) => {
  let data

  // temp
  const amount = 100
  const percent = 20

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutline
            className="icon"
            style={{ color: "crimson", background: "rgba(255,0,0,0.2" }}
          />
        ),
      }
      break
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all order",
        icon: (
          <ShoppingCartOutlined
            className="icon"
            style={{ color: "goldenrod", background: "rgba(218,165,32,0.2)" }}
          />
        ),
      }
      break
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlined
            className="icon"
            style={{ color: "green", background: "rgba(0,128,0,0.2)" }}
          />
        ),
      }
      break
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceOutlined
            className="icon"
            style={{ color: "purple", background: "rgba(128,0,128,0.2)" }}
          />
        ),
      }
      break
    default:
      break
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {data?.isMoney && "$"}
          {amount}
        </span>
        <span className="link">{data?.link}</span>
      </div>
      <div className="right">
        <span className="percent positive">
          <KeyboardArrowUp />
          {percent}%
        </span>
        {data?.icon}
      </div>
    </div>
  )
}

export default Widget
