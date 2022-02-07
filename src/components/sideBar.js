import React, {useEffect} from 'react';
import * as bootstrap from 'bootstrap';
import { useHistory } from 'react-router-dom';

function SideBar(props){
    let history = useHistory();
    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });
    },[]);

    function slidebarClick(e){
        e.preventDefault();
        var slidebarTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        slidebarTriggerList.shift();
        // console.log(slidebarTriggerList);
        // console.log(e);
        // eslint-disable-next-line array-callback-return
        slidebarTriggerList.map(li => {
            li.className = li.className.replace('active','');
        });
        if(e.target.localName === 'a'){
            e.target.className += ' active';
            history.push(e.target.pathname);
        }else{
            e.target.parentElement.className += ' active';
            history.push(e.target.parentElement.pathname);
        }
    };

    return(
        <div className="sticky">
            <div className="d-flex flex-column flex-shrink-0 sidebar">
                <a href="/" className="d-block p-3 link-dark text-decoration-none text-center" onClick={(e) => {e.preventDefault(); history.push(e.target.pathname)}} title="HungHau Holdings" data-bs-toggle="tooltip" data-bs-placement="right">
                    <img alt='' src="./favicon.ico" width="40" onClick={(e) => {e.preventDefault(); history.push(e.target.parentElement.pathname)}}/>
                </a>
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                    <li className="nav-item">
                        <a href="/" className="nav-link py-3 border-bottom text-white active" onClick={slidebarClick} aria-current="page" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
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