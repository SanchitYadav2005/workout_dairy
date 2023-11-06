import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  function handleClick() {
    logout();
  }
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout diry</h1>
        </Link>
        {user && (
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
        )}
        {!user && (
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
