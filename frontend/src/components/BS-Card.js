import React from 'react';
import $ from "jquery";
import { Detail } from '../constant';
import { useHistory } from 'react-router-dom';

function BSCard(props) {
    const history = useHistory();
    const handleClick = (e) => {
        e.preventDefault(); 
        history.push(e.target.pathname);
        $('.sb-li .sb-a').removeClass("active");
        $("a[href='"+e.target.pathname+"']").addClass("active");
    }
    return (
    <div className="col-xl-3">
        <div className="container p-3 shadow">
            <div className="card border-top-0 border-bottom-0 border-end-0 border-4 py-2" style={{borderColor: props.color}}>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col me-2">
                            <div className="fw-bold text-uppercase mb-1" style={{color: props.color}}>{props.title}</div>
                            <div className="fs-6 mb-0 text-black-50">{props.statusText}</div>
                            <a href={props.href} onClick={handleClick}><Detail/></a>
                        </div>
                        <div className="col-auto">
                            {props.icon}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default BSCard;