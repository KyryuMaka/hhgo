import React, { useState, useEffect } from 'react';
import * as Realm from "realm-web";
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import Avatar from '@mui/material/Avatar';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-dehpw"});
const credentials = Realm.Credentials.anonymous();

function SideBar(){
    let history = useHistory();
    const [users, setUser] = useState([]);
    const id = sessionStorage.getItem("id-user");
    const path = window.location.pathname;

    async function dataName(params){
        const realmUser = await realmapp.logIn(credentials);
        setUser(await realmUser.callFunction('getLoginUser', {_id: Realm.BSON.ObjectID(id)}));
    }

    useEffect(()=>{
        dataName();
    },[]);

    function slidebarClick(e){
        e.preventDefault();
        if(e.target.localName === 'a'){
            history.push(e.target.pathname);
        }else{
            history.push(e.target.parentElement.pathname);
        }
    };

    $(document).ready(function(){
        Object.values($("[sideActive=false]")).forEach(element => {
            if(element.pathname === path){
                $(element).addClass("active");
            }
        })
        $('.sb-ul .sb-li .sb-a').click(function(){
            $('.sb-li .sb-a').removeClass("active");
            $(this).addClass("active");
        });
    });

    // function stringToColor(string) {
    //     let hash = 0;
    //     let i;
    //     let color = '#';

    //     /* eslint-disable no-bitwise */
    //     for (i = 0; i < string.length; i += 1) {
    //         hash = string.charCodeAt(i) + ((hash << 5) - hash);
    //     }
    //     for (i = 0; i < 3; i += 1) {
    //         const value = (hash >> (i * 8)) & 0xff;
    //         color += `00${value.toString(16)}`.substr(-2);
    //     }
    //     /* eslint-enable no-bitwise */
    //     return color;
    // }
      
    function stringAvatar(name, height, width) {
        return {
            sx: {
                bgcolor: '#61CC0A',
                width: width, height: height
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    // function generateAvatar(text, foregroundColor, backgroundColor) {
    //     const canvas = document.createElement("canvas");
    //     const context = canvas.getContext("2d");
    
    //     canvas.width = 200;
    //     canvas.height = 200;
    
    //     // Draw background
    //     context.fillStyle = backgroundColor;
    //     context.fillRect(0, 0, canvas.width, canvas.height);
    
    //     // Draw text
    //     context.font = "bold 80px Assistant";
    //     context.fillStyle = foregroundColor;
    //     context.textAlign = "center";
    //     context.textBaseline = "middle";
    //     context.fillText(text.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase(), canvas.width / 2, canvas.height / 2);
    
    //     return canvas.toDataURL("image/png");
    // }

    // const avatarSrc = _.isEmpty(users[0].avatar)?generateAvatar(users[0].displayName, 'white', '#1cc88a'):users[0].avatar;

    return(
        (_.isEmpty(users))?<></>:<>
        <div className="sticky">
            <div className="d-flex flex-column flex-shrink-0 sidebar">
                <div className="dropdown">
                    <a href=" " className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none text-white" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                        {_.isEmpty(users[0].avatar)?
                        <Avatar {...stringAvatar(users[0].displayName, 48, 48)} />:
                        <img src={users[0].displayName} className="rounded-circle mt-1 mb-1" height="48px" width="48px" alt="mdo" />}
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
                        <li>
                            <a className="dropdown-item" href=" " data-bs-toggle="modal" data-bs-target="#userModal">
                                <i className="bi bi-person"></i> Tài khoản
                            </a>
                        </li>
                        <li><a className="dropdown-item" href=" "><i className="bi bi-gear"></i> Cài đặt</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item text-danger" href="/"><i className="bi bi-box-arrow-right"></i> Đăng xuất</a></li>
                    </ul>
                </div>
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center sb-ul">
                    <li className="nav-item sb-li">
                        <a href="/home" className="nav-link py-3 border-bottom text-white border-top sb-a" sideActive="false" onClick={slidebarClick} aria-current="page" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-speedometer2"></i>
                        </a>
                    </li>
                    <li className="nav-item sb-li">
                        <a href="/users" className="nav-link py-3 border-bottom text-white sb-a" sideActive="false" onClick={slidebarClick} title="Users" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-person-circle"></i>
                        </a>
                    </li>
                    <li className="nav-item sb-li">
                        <a href="/vehicles" className="nav-link py-3 border-bottom text-white sb-a" sideActive="false" onClick={slidebarClick} title="Vehicles" data-bs-toggle="tooltip" data-bs-placement="right">
                            <span className="fs-5">&#9951;</span>
                        </a>
                    </li>
                    <li className="nav-item sb-li">
                        <a href="/history" className="nav-link py-3 border-bottom text-white sb-a" sideActive="false" onClick={slidebarClick} title="History" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-clock-history"></i>
                        </a>
                    </li>
                    <li className="nav-item sb-li">
                        <a href="/" className="nav-link py-3 border-bottom text-white sb-a" sideActive="false" onClick={slidebarClick} title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-table"></i>
                        </a>
                    </li>
                    <li className="nav-item sb-li">
                        <a href="/" className="nav-link py-3 border-bottom text-white sb-a" sideActive="false" onClick={slidebarClick} title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-grid"></i>
                        </a>
                    </li>
                </ul>
                <div className="dropdown border-top">
                    <a href=" " className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none text-white" id="dropdownSetting" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-gear" />
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownSetting">
                        <li>
                            <a className="dropdown-item" href=" " data-bs-toggle="modal" data-bs-target="#userModal">
                                <i className="bi bi-person"></i> Tài khoản
                            </a>
                        </li>
                        <li><a className="dropdown-item" href=" "><i className="bi bi-gear"></i> Cài đặt</a></li>
                        <li><a className="dropdown-item" href=" "><i className="bi bi-info-circle"></i> Giới thiệu</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item text-danger" href="/"><i className="bi bi-box-arrow-right"></i> Đăng xuất</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="userModalLabel">Thông tin tài khoản</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4 d-flex align-items-center justify-content-center">
                                <div className="text-center">
                                    {_.isEmpty(users[0].avatar)?
                                    <Avatar {...stringAvatar(users[0].displayName, 120, 120)} />:
                                    <img src={users[0].displayName} className="rounded-circle mt-1 mb-1" height="120px" width="120px" alt="mdo" />}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h3 className="fw-bold">{users[0].displayName}</h3>
                                <p className="text-dark-50">{users[0].position}</p>
                                <table>
                                    <tr>
                                        <td><p className="fw-bold me-3">Địa chỉ email:</p></td>
                                        <td><p>{users[0].user}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="fw-bold me-3">Số điện thoại:</p></td>
                                        <td><p>{users[0].phone}</p></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default SideBar;