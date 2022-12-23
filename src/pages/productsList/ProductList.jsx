import { DataGrid } from "@mui/x-data-grid"
import { deleteDoc, doc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import MainLayout from "../../components/layout/MainLayout"
import { productColumns } from "../../data/datatableSource"
import { db } from "../../firebase"
import { fetchAllProducts } from "../../redux/product/ProductAction"

import "./productList.scss"

const ProductList = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const { isLoading, products } = useSelector((state) => state.product)

  useEffect(() => {
    !products.length && dispatch(fetchAllProducts())
    setData(products)
  }, [products, dispatch])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "users", id))
        setData(data.filter((item) => item.id !== id))
        toast.success("User deleted successfully")
      } catch (error) {
        console.log(error)
      }
    }
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/products/${params.row.id}`}>
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
              <Link to="/products/new" className="link">
                Add new Product
              </Link>
            </div>

            <DataGrid
              className="dataGrid"
              rows={data}
              columns={productColumns.concat(actionColumn)}
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

export default ProductList
