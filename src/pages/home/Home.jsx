import { useState } from "react"
import { useSelector } from "react-redux"
import MainLayout from "../../components/layout/MainLayout"
import TableComponent from "../../components/table/Table"
import Widget from "../../components/widget/Widget"
import "./home.scss"

const Home = () => {
  return (
    <MainLayout>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
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
