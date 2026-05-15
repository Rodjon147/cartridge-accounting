import { Link } from "react-router-dom"

function Sidebar(){
    return(
        <dir>
            <h2>Учёт картриджей</h2>

            <dir>
                <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>Дашборд</Link>
                <Link to="/cartridges" className={location.pathname === "/cartridges" ? "nav-link active" : "nav-link"}>Картриджи</Link>
                <Link to="/printers" className={ location.pathname === "/printers" ? "nav-link active" : "nav-link"} >Принтеры</Link>
                <Link to="/movement" className={ location.pathname === "/movement" ? "nav-link active" : "nav-link"} >Движение</Link>
            </dir>
        </dir>
    )
}

export default Sidebar