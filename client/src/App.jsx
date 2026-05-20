import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/layout/Sidebar"

import Dashboard from "./pages/Dashboard"
import Cartridges from "./pages/Cartridges"
import Printers from "./pages/Printers"
import Movement from "./pages/Movement"

// import "./styles/global.css"
import "./style.css"

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />

        <div className="main">
          <div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cartridges" element={<Cartridges />} />
              <Route path="/printers" element={<Printers />} />
              <Route path="/movement" element={<Movement />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
