import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>Mamos receptai</li>
        <li><Link to="/">Home</Link> </li>
        <li><Link to="add-recipe">Kurti recepta</Link></li>
      </ul>
      {/* <p>Receptai</p> */}
      {/* <NavLink
        to={``}
      > */}
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="recipes">Receptai</Link> */}
        {/* <Link to="add-recipe">Kurti recepta</Link> */}
      {/* </NavLink> */}
    </nav>
  );
}
