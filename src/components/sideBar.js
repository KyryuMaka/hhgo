import React, {useEffect} from 'react';
import * as bootstrap from 'bootstrap';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';

function SideBar(){
    let history = useHistory();

    function slidebarClick(e){
        e.preventDefault();
        if(e.target.localName === 'a'){
            history.push(e.target.pathname);
        }else{
            history.push(e.target.parentElement.pathname);
        }
    };

    $(document).ready(function(){
        $('ul li a').click(function(){
            $('li a').removeClass("active");
            $(this).addClass("active");
        });
    });

    return(
        <div className="sticky">
            <div className="d-flex flex-column flex-shrink-0 sidebar">
                <a href="/" className="d-block p-3 link-dark text-decoration-none text-center" onClick={slidebarClick} title="HungHau Holdings" data-bs-toggle="tooltip" data-bs-placement="right">
                    <img alt='' src="./favicon.ico" width="40" />
                </a>
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                    <li className="nav-item">
                        <a href="/" className="nav-link py-3 border-bottom text-white border-top active" onClick={slidebarClick} aria-current="page" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-speedometer2"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/history" className="nav-link py-3 border-bottom text-white" onClick={slidebarClick} title="History" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-clock-history"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="nav-link py-3 border-bottom text-white" onClick={slidebarClick} title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-table"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="nav-link py-3 border-bottom text-white" onClick={slidebarClick} title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-grid"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="nav-link py-3 border-bottom text-white" onClick={slidebarClick} title="Customers" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-person-circle"></i>
                        </a>
                    </li>
                </ul>
                <div className="dropdown border-top">
                    <a href=" " className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle text-white" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                        <li><a className="dropdown-item" href=" ">New project...</a></li>
                        <li><a className="dropdown-item" href=" ">Settings</a></li>
                        <li><a className="dropdown-item" href=" ">Profile</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href=" ">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBar;