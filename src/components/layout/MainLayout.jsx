import Navbar from "../navbar/Navbar"
import Sidebar from "../sidebar/Sidebar"
import "./mainLayout.scss"

const MainLayout = ({ children }) => {
  return (
    <main>
      <Sidebar />
      <div className="container">
        <Navbar />
        {children}
      </div>
    </main>
  )
}

export default MainLayout
