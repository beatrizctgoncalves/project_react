import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';
import { getUserGroups } from '../../components/Services/BasicService.js';



function Group() {

    const [groups, setGroups] = useState({})

    useEffect(() => {
        const owner = window.sessionStorage.getItem("username")
        getUserGroups(owner).then(resp => {

        })
    }, [])

    return (
        <section class="page-section">
            <div class="container px-2 px-lg-5">
                <h2 class="text-center mt-0">Your Groups</h2>
                <hr class="divider" />
                <div class="row text-center">


                </div>
            </div>
            <Box mt={8}>
                <Footer />
            </Box>
        </section>
    )
}

export default Group;