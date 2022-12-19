import "./singleProduct.scss"
import MainLayout from "../../components/layout/MainLayout"
import TableComponent from "../../components/table/Table"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleUser } from "../../redux/user/UserAction"
import { fetchSingleProduct } from "../../redux/product/ProductAction"

const SingleProduct = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState({})
  const [shouldFetch, setShouldFetch] = useState(true)
  const { selectedProduct } = useSelector((state) => state.product)

  useEffect(() => {
    shouldFetch && dispatch(fetchSingleProduct(productId))
    setShouldFetch(false)
    setProduct(selectedProduct)
  }, [dispatch, productId, selectedProduct, shouldFetch])

  return (
    <MainLayout>
      <div className="single">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={product.img} alt="User Profile" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{product.title}</h1>
                <div className="itemDetail">
                  <span className="itemKey">Category: </span>
                  <span className="itemValue">{product.category}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Description: </span>
                  <span className="itemValue">{product.description}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Price: </span>
                  <span className="itemValue">{product.price}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Stock: </span>
                  <span className="itemValue">{product.stock}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Status: </span>
                  <span className="itemValue">{product.status}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SingleProduct
