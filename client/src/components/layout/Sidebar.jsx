import { Link } from "react-router-dom"

function Sidebar(){
    return(
        <dir className="sidebar">
            <h2 className="logo">Учёт картриджей</h2>

            <nav>
                <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>Дашборд</Link>
                <Link to="/cartridges" className={location.pathname === "/cartridges" ? "nav-link active" : "nav-link"}>Картриджи</Link>
                <Link to="/printers" className={ location.pathname === "/printers" ? "nav-link active" : "nav-link"} >Принтеры</Link>
                <Link to="/movement" className={ location.pathname === "/movement" ? "nav-link active" : "nav-link"} >Движение</Link>
            </nav>
        </dir>
    )
}

export default Sidebar