import { DataGrid } from "@mui/x-data-grid"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import MainLayout from "../../components/layout/MainLayout"
import { productColumns } from "../../data/datatableSource"
import {
  deleteProduct,
  fetchAllProducts,
} from "../../redux/product/ProductAction"

import "./productList.scss"

const ProductList = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [shouldFetch, setShouldFetch] = useState(true)
  const { isLoading, products } = useSelector((state) => state.product)

  useEffect(() => {
    shouldFetch && dispatch(fetchAllProducts())
    setShouldFetch(false)
    setData(products)
  }, [shouldFetch, dispatch, products])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id)) &&
        setData(data.filter((item) => item.id !== id))
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
