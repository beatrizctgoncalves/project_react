import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";


export default function GoBack() {
    let history = useHistory();
    return (
        <div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => history.goBack()}
            >
                Go Back
            </Button>
        </div>
    );
}
