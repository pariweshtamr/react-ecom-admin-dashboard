import "./singleUser.scss"
import MainLayout from "../../components/layout/MainLayout"
import TableComponent from "../../components/table/Table"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleUser } from "../../redux/user/UserAction"

const SingleUser = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const [shouldFetch, setShouldFetch] = useState(true)
  const { singleUser } = useSelector((state) => state.user)

  useEffect(() => {
    shouldFetch && dispatch(fetchSingleUser(userId))
    setShouldFetch(false)
    setUser(singleUser)
  }, [dispatch, userId, singleUser, shouldFetch])

  return (
    <MainLayout>
      <div className="single">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user.img} alt="User Profile" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{user.displayName}</h1>
                <div className="itemDetail">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Address: </span>
                  <span className="itemValue">{user.address}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Country: </span>
                  <span className="itemValue">{user.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>

        {user.role === user && (
          <>
            <div className="bottom">
              <h1 className="title">Last transactions</h1>
              <TableComponent />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default SingleUser
