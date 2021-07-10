import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


function Footer() {

    return (
        <div>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    Pluggable Gamification
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <br /><br />
        </div>
    );
}


export default Footer
