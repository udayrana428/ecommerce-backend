import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname)
  }, [location]);
  const logout=()=>{
    localStorage.removeItem("authtoken")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location === "/" ? "active" : ""}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            <div className="d-grid gap-2 d-md-block">
              {localStorage.getItem('authtoken')?<Link to="/login"><button className="btn btn-primary mx-2" onClick={logout} type="button">Logout</button></Link>:<Link to="/login"><button className="btn btn-primary mx-2" type="button">Login</button></Link>}
              {localStorage.getItem('authtoken')?"":<Link to="/signup"><button className="btn btn-primary mx-2" type="button">SignUp</button></Link>}
              {/* <Link to="/login"><button className="btn btn-primary mx-2" type="button">Login</button></Link>
              <Link to="/signup"><button className="btn btn-primary mx-2" type="button">SignUp</button></Link> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
