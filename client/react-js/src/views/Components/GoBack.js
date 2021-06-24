import React from 'react';


function GoBack() {
    function goBack() {
        window.history.back();
    }

    return (
        <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-8 text-center">
                <button className="btn btn-goback btn-xl" type="button" onClick={goBack}>
                    Go Back
                </button>
            </div>
        </div>
    );
}


export default GoBack
