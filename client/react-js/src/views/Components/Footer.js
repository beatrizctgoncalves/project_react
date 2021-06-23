import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


function Footer() {


    
    return (
        <div>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="http://localhost:8888/">
                    Pluggable Gamification
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <div className="container">
                <Typography component="span" variant="body2" color="textSecondary" align="center">
                    <div className="mt-3">
                        <Link href="/terms" color="inherit">
                            Terms of Use
                        </Link>
                    </div>
                    <div className="mt-3">
                        <Link href="/privacy-policy" color="inherit">
                            Privacy policy
                        </Link>
                        <br/><br/>
                    </div>
                </Typography>
            </div>
        </div>
    );
}


export default Footer
