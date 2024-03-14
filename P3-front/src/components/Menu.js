import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo';

function AppMenu() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* <!-- Brand Logo --> */}
      <Link to="/" className="brand-link center-element" style={{maxHeight: '57px'}}>
        <Logo/>   
        <span className="center-element brand-text font-weight-light" style={{marginLeft: '10px'}}> App</span>
      </Link>

      {/* <!-- Sidebar --> */}
      <div className="sidebar">

        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* <!-- Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library --> */}
            <li className="nav-item">
              <Link to='/' className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Início
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/notas" className="nav-link">
                <i className="fa fa-edit nav-icon text-white"></i>
                <p>Notas</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/financas" className="nav-link">
                <i className="fas fa-dollar-sign nav-icon text-white  "></i>
                <p>Finanças</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/timer" className="nav-link">
                <i className="fa fa-clock nav-icon text-white"></i>
                <p>Timer</p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
      </div>
      {/* <!-- /.sidebar --> */}
    </aside>
  );
}

export default AppMenu;
