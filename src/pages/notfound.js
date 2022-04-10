import React from 'react';

function NotFound(){
    return(
        <>
            <div className="vh-100 d-flex align-items-center justify-content-center" style={{backgroundColor: "#f8f9fc"}}>
                <div className="container p-3 shadow rounded">
                    <div className="d-flex justify-content-center align-items-center" style={{height: "680px", width: "100%"}}>
                        <div className="row">
                            <div className="col-md-6">
                                <img className="pe-5" src="./Logo-HungHau.png" alt="" width="400" />
                            </div>
                            <div className="col-md-6">
                                <div className="text-center">
                                    <h1 style={{fontSize: "170px", color: "#0d6efd"}}>404</h1>
                                    <h1 style={{fontSize: "40px", color: "#72B740"}}>Page Not Found</h1>
                                    <a href="/" className="fs-4" style={{color: "#F29135"}}>Back to Login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;