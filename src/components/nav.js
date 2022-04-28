
import {Link} from "react-router-dom";

const Nav = () => {
    return(
        <div className={`list-group`}>
            <Link to="/" className="list-group-item">
                <div className="d-lg-none"><i className="bi bi-house-fill text-nowrap"/></div>
                <div><span className={"d-none d-lg-block"}>Home</span></div>
            </Link>
            <Link to="/search" className="list-group-item">
                <div className="d-lg-none"><i className="bi bi-search text-nowrap"/></div>
                <div><span className={"d-none d-lg-block"}>Steam Search</span></div>
            </Link>
            <Link to={"/collections"} className={"list-group-item"}>
                <div className="d-lg-none"><i className="bi bi-book text-nowrap"/></div>
                <div><span className={"d-none d-lg-block"}>Browse Collections</span></div>
            </Link>
            <Link to="/curators" className="list-group-item">
                <div className="d-lg-none"><i className="bi bi-people-fill text-nowrap"/></div>
                <div><span className={"d-none d-lg-block"}>Browse Curators</span></div>
            </Link>
            <Link to="/profile" className="list-group-item">
                <div className="d-lg-none"><i className="bi bi-person-circle text-nowrap"/></div>
                <div><span className={"d-none d-lg-block"}>Profile</span></div>
            </Link>

            <br/>
        </div>
    );
};
export default Nav;