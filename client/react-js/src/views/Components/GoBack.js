import React from 'react';
import Button from '@material-ui/core/Button';


function GoBack() {
    function goBack() {
        window.history.back();
    }

    return (
        <div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={goBack}
            >
                Go Back
            </Button>
        </div>
    );
}


export default GoBack
