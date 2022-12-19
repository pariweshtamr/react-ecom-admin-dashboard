import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import TableComponent from "../../components/table/Table"
import Widget from "../../components/widget/Widget"
import { useDispatch, useSelector } from "react-redux"

import "./home.scss"
import { fetchAllUsers } from "../../redux/user/UserAction"
import { fetchAllProducts } from "../../redux/product/ProductAction"

const Home = () => {
  const dispatch = useDispatch()
  const [shouldFetch, setShouldFetch] = useState(true)
  const { users } = useSelector((state) => state.user)
  const { products } = useSelector((state) => state.product)

  useEffect(() => {
    shouldFetch && dispatch(fetchAllUsers())
    setShouldFetch(false)
  }, [dispatch, users, shouldFetch])

  useEffect(() => {
    shouldFetch && dispatch(fetchAllProducts())
    setShouldFetch(false)
  }, [shouldFetch, dispatch, products])

  return (
    <MainLayout>
      <div className="widgets">
        <Widget type="user" totalUsers={users.length} />
        <Widget type="product" totalProducts={products.length} />
        <Widget type="order" />
        <Widget type="balance" />
      </div>
      <div className="charts"></div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <TableComponent />
      </div>
    </MainLayout>
  )
}

export default Home
