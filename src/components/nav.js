
import {Link} from "react-router-dom";

const Nav = () => {
    return(
        <div className={`list-group`}>
            <Link to="/" className="list-group-item">Home</Link>
            <Link to="/search" className="list-group-item">Steam Search</Link>
            <Link to="/details" className="list-group-item">Steam Details</Link>
            <br/>
        </div>
    );
};
export default Nav;