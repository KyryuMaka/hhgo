import React from 'react';
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
                <div className="dropdown">
                    <a href=" " className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none text-white" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="48" height="48" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
                        <li><a className="dropdown-item" href=" ">Tài khoản</a></li>
                        <li><a className="dropdown-item" href=" ">Cài đặt</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href=" ">Đăng xuất</a></li>
                    </ul>
                </div>
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
                    <a href=" " className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none text-white" id="dropdownSetting" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-gear" />
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownSetting">
                        <li><a className="dropdown-item" href=" ">Tài khoản</a></li>
                        <li><a className="dropdown-item" href=" ">Cài đặt</a></li>
                        <li><a className="dropdown-item" href=" ">Giới thiệu</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href=" ">Đăng xuất</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBar;