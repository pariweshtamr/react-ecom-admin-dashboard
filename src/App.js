import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { productInputs, userInputs } from "./data/formSource"
import Home from "./pages/home/Home"
import List from "./pages/userList/UserList"
import Login from "./pages/login/Login"
import SingleUser from "./pages/singleUser/SingleUser"
import "./App.scss"
import "./style/dark.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductList from "./pages/productsList/ProductList"
import SingleProduct from "./pages/singleProduct/SingleProduct"
import NewUser from "./pages/newUser/NewUser"
import NewProduct from "./pages/newProduct/NewProduct"

function App() {
  const { darkMode } = useSelector((state) => state.darkMode)
  const [darkModeState, setDarkModeState] = useState(false)
  const { currentUser } = useSelector((state) => state.auth)
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />
  }

  useEffect(() => {
    setDarkModeState(
      sessionStorage.getItem("darkMode")
        ? JSON.parse(sessionStorage.getItem("darkMode"))
        : darkMode
    )
  }, [darkMode])

  return (
    <div className={darkModeState ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <SingleUser />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewUser inputs={userInputs} />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <ProductList />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <SingleProduct />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewProduct inputs={productInputs} />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
