import React, {useState,useEffect} from 'react';
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash'
import {Helmet} from 'react-helmet';

import $ from "jquery";
import { loading } from '../constant';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();

// const getData = async (folder,name) =>{
//     return await fetch('data/'+folder+name+'.json')
//     .then(response => response.json())
//     .then(data => {return data});
// }

function User(props){
    const [data, setData] = useState([]);
    // const [driver, setDriver] = useState();
    // const [car, setCar] = useState();
    // const [carNumber, setCarNumber] = useState();
    // const [carry, setCarry] = useState();
    // const [from, setFrom] = useState();
    // const [to, setTo] = useState();
    // const [when, setWhen] = useState();
    // const [status, setStatus] = useState();

    useEffect(()=>{
        async function dataName(params){
            const realmUser = await realmapp.logIn(credentials);
            setData(await realmUser.callFunction('getUser', {}));
        }
        dataName();
    },[]);

    const columns = [
        {data:"fullName"},
        {data:"namSinh"},
        {data:"gender"},
        {data:"phone1"},
        {data:"phone2"},
        {data:"email"},
        {data:"donVi"},
        {data:"chuyenCho"},
        {data:"permission"},
    ];

    return(
        <>
            <Helmet titleTemplate="%s · HHGo">
                {(_.isEmpty(data))?<title>{loading}</title>:<title>{props.title}</title>}
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="main vh-100">
                {(_.isEmpty(data))?
                <div className="vh-100 d-flex justify-content-center">
                    <div className="align-self-center">
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>{loading}
                    </div>
                </div>:
                <div className="container p-3 shadow mt-5 rounded">
                    <h3 className="pt-2">Danh sách người dùng</h3>
                    <table className="table table-striped table-hover table-bordered align-middle" id="userTable">
                        <thead>
                            <tr>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Năm sinh</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Số điện thoại 1</th>
                                <th scope="col">Số điện thoại 2</th>
                                <th scope="col">Email</th>
                                <th scope="col">Đơn vị</th>
                                <th scope="col">Chuyên chở</th>
                                <th scope="col">Quyền</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                }
            </div>
        </>
    );    
}
export default User;