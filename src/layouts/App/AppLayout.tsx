import { Outlet } from "react-router"
import './AppLayout.css'

const AppLayout = () => {
  return (
    <div className="layout-app">
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default AppLayout