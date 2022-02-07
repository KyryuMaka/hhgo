import React, {useState} from 'react'
import * as bootstrap from 'bootstrap';
import _ from 'lodash'
import {Helmet} from 'react-helmet';

import { loginUser } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

function LogIn(props){
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const dispatch = useDispatch();
    const {users} = useSelector((state) => state.auth)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const u = {
            user: user,
            pass: pass
        }
        dispatch(loginUser(u,()=>{
            if(!_.isEmpty(users)){
                console.log("Đăng nhập thành công");
                window.location.href = '/';
            }else{
                var trigger = document.getElementById('falseLoginToast');
                var toast = new bootstrap.Toast(trigger);
                setUser("");
                setPass("");
                if(toast._element.className.search('fade') === -1){
                    toast._element.className += ' fade';
                }
                if(toast._element.className.search('hide') === -1 && toast._element.className.search('show') === -1){
                    toast._element.className += ' show';
                }else{
                    if(toast._element.className.search('hide') !== -1) toast._element.className = toast._element.className.replace('hide','show');
                }
                setTimeout(() => {
                    toast._element.className = toast._element.className.replace('show','hide');
                },1000);
            };
        }));
    }

    return(
        <>
            <Helmet titleTemplate="%s | HHGo">
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
                            <label htmlFor="ftun" style={{"color": "black"}}>Tài khoản</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="flpw" placeholder="Mật khẩu" required value={pass} onChange={(e) => setPass(e.target.value)}/>
                            <label htmlFor="flpw" style={{"color": "black"}}>Mật khẩu</label>
                        </div>
                        <div className="checkbox mb-3">
                            <input type="checkbox" value="remember-me" /> Ghi nhớ đăng nhập
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" id="loginBtn" type="submit">Đăng nhập</button>
                        <p className="mt-5">Copyright 2022 &copy; <b>HungHau Holding</b></p>
                    </form>
                    <div className="toast-container position-fixed top-0 end-0 p-3" id="notifications" style={{"zIndex": "11"}}>
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
        </>
    );
}

export default LogIn;