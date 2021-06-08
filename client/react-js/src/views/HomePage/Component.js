import React from 'react'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Grid from '@material-ui/core/Grid';

function Component() {
    return (
        <div>
            <Grid container justify="center">
                <Grid item>
                    <Link href="#" variant="body2">
                        Disable my account permanently
                    </Link>
                </Grid>
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Change Password
            </Button>
        </div>
    )
}

export default Component;