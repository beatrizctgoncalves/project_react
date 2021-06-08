import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';


function Copyright() {
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
            <div class="container">
                <Typography variant="body2" color="textSecondary" align="center">
                    <div class="mt-3">
                        <Link href="/terms" color="inherit">
                            Terms of Use
                        </Link>
                    </div>
                    <div class="mt-3">
                        <Link href="/privacy-policy" color="inherit">
                            Privacy policy
                        </Link>
                    </div>
                </Typography>
            </div>
        </div>
    );
}


export default Copyright
