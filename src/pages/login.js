import React, {useState} from 'react'
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash'
import {Helmet} from 'react-helmet';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();
var realm_user

let realmUser;


function LogIn(props){
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.toLowerCase() === 'ad@hunghau.vn' && pass === 'HH@@2016'){
            window.location.href = '/dashboard';
        }else{
            var trigger = document.getElementById('falseLoginToast');
            var toast = new bootstrap.Toast(trigger);
            toast.show();
            setUser("");
            setPass("");
        }
    }

    return(
        <div className="signin">
            <Helmet titleTemplate="%s | Quản lý Đội xe Hùng Hậu">
                <title>{props.title}</title>
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="t-center text-center bg-hunghau">
                <div className="form-signin">
                    <form onSubmit={handleSubmit}>
                        <img className="mb-3" src="./Logo-HungHau.png" alt="" width="150" />
                        <h1 className="mb-3"><b>Đăng nhập</b></h1>

                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="ftun" placeholder="Tài khoản" required value={user} onChange={(e) => setUser(e.target.value)} />
                            <label for="ftun" style={{"color": "black"}}>Tài khoản</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="flpw" placeholder="Mật khẩu" required value={pass} onChange={(e) => setPass(e.target.value)}/>
                            <label for="flpw" style={{"color": "black"}}>Mật khẩu</label>
                        </div>
                        <div className="checkbox mb-3">
                            <input type="checkbox" value="remember-me" /> Ghi nhớ đăng nhập
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" id="loginBtn" type="submit">Đăng nhập</button>
                        <p className="mt-5">Copyright 2021 &copy; <b>HungHau Holding</b></p>
                    </form>
                    <div className="toast-container position-fixed top-0 end-0 p-3" id="notifications" style={{"z-index": "11"}}>
                        <div id="falseLoginToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <img src="./favicon.ico" className="rounded me-2" alt="..." style={{"height":"25px"}} />
                                <strong className="me-auto">Lỗi đăng nhập</strong>
                                <small>Vài giây trước</small>
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div className="toast-body bg-primary">
                                Sai tài khoản hoặc mật khẩu, vui lòng kiểm tra lại!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;