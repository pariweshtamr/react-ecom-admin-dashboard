import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import MainLayout from "../../components/layout/MainLayout"
import { userColumns } from "../../data/datatableSource"
import { deleteAUser, fetchAllUsers } from "../../redux/user/UserAction"

import "./userList.scss"
const List = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [shouldFetch, setShouldFetch] = useState(true)
  const { isLoading, users } = useSelector((state) => state.user)

  useEffect(() => {
    shouldFetch && dispatch(fetchAllUsers())
    setShouldFetch(false)
    setData(users)
  }, [dispatch, users, shouldFetch])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteAUser(id)) &&
        setData(data.filter((item) => item.id !== id))
    }
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`}>
              <div className="viewButton">View</div>
            </Link>

            <div
              className="delButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        )
      },
    },
  ]

  return (
    <MainLayout>
      <div className="datatable">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="datatableTitle">
              <Link to="/users/new" className="link">
                Add new User
              </Link>
            </div>

            <DataGrid
              className="dataGrid"
              rows={data}
              columns={userColumns.concat(actionColumn)}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default List
