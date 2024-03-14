  import { Link } from "react-router-dom";
  import { useLogout } from "../hooks/useLogout";

  function AppHeader(){
      const { logout } = useLogout();

      function handleLogout(){
        logout();
      }

      return (
        <nav class="main-header navbar navbar-expand navbar-white navbar-light" style={{backgroundColor: '#e37f2a'}}>
        {/* <!-- Left navbar links --> */}
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link" data-widget="pushmenu" to="#" role="button"><i class="fas fa-bars" style={{color: "black"}}></i></Link>
          </li>
        </ul>
    
        {/* <!-- Right navbar links --> */}
        <ul class="navbar-nav ml-auto">
          
          {/* <!-- Notifications Dropdown Menu -->   */}
          <li class="nav-item dropdown" style={{marginRight: "7px"}}>
              <button id="logout-button" class="btn btn-block btn-dark" onClick={handleLogout}>Sair</button>
          </li>

        </ul> 
      </nav>

      )
  }

  export default AppHeader;