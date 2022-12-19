import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { productColumns, userColumns } from "../../data/datatableSource"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers } from "../../redux/user/UserAction"
import { fetchAllProducts } from "../../redux/product/ProductAction"

const Datatable = ({ title, type }) => {
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
    setData(data.filter((item) => item.id !== id))
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {type === "users" ? (
              <Link to={`/users/${params.row.id}`}>
                <div className="viewButton">View</div>
              </Link>
            ) : (
              <Link to="/products/test">
                <div className="viewButton">View</div>
              </Link>
            )}

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
    <div className="datatable">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="datatableTitle">
            {type === "users" ? (
              <Link to="/users/new" className="link">
                {title}
              </Link>
            ) : (
              <Link to="/products/new" className="link">
                {title}
              </Link>
            )}
          </div>

          {type === "users" ? (
            <DataGrid
              className="dataGrid"
              rows={data}
              columns={userColumns.concat(actionColumn)}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          ) : (
            <DataGrid
              className="dataGrid"
              rows={data}
              columns={productColumns.concat(actionColumn)}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          )}
        </>
      )}
    </div>
  )
}

export default Datatable
