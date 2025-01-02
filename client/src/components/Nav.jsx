import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { UserContext } from "../UserContext";

export default function Nav() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
    });
  }

  const username = userInfo?.username;

  return (
    <nav>
      <ul>
        <li >
          <Link to="/">Mamos receptai</Link>
        </li>
        <ul>
          {username && (
            <>
              <span>Welcome, {username}</span>
              <li>
                <Link to="/add-recipe">Kurti recepta</Link>
              </li>
              <a onClick={logout}>Atsijungti</a>
            </>
          )}
          {!username && (
            <>
              <li>
                <Link to="/register">Registruoti</Link>
              </li>
              <li>
                <Link to="/login">Prisijungti</Link>
              </li>
            </>
          )}
        </ul>
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
