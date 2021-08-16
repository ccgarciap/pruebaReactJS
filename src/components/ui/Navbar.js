import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const Navbar = () => {

    const history            = useHistory(); 

    const { user, dispatch } = useContext( AuthContext );

    // Handle logout app
    const handleLogout = () => {
        dispatch({
            type    : types.logout,
            payload : {
                ...user
            }
        });

        history.replace('/login'); 
    }

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="logo">
                <img src="/assets/images/logo.png" alt="Logo" />
            </div>
            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/repositories"
                    >
                       Repositories
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/profile"
                    >
                        Profile
                    </NavLink>
                </div>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 mr-sm-2">
                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info">
                        { user.name }
                    </span>
                    <button 
                        className="nav-item nav-link btn" 
                        onClick={ handleLogout }
                    >
                      Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}