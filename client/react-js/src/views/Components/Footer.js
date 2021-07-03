import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Box } from '@material-ui/core';


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
            <Typography component="span" variant="body2" color="textSecondary" align="center">
                <Box mt={1}>
                    <Link href="/terms" color="inherit">
                        Terms of Use
                    </Link>
                </Box>
                <Box mt={1}>
                    <Link href="/privacy-policy" color="inherit">
                        Privacy policy
                    </Link>
                    <br /><br />
                </Box>
            </Typography>
        </div>
    );
}


export default Footer
