import React from 'react'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';


function Home() {
    return (
        <div class="homeItems">
            <div class="box-home m-3">
                <div class="row">
                    <div class="col-md-8">
                        <div class="intro">
                            <br></br>                                
                            <br></br>
                            <br></br>
                            <h1>Pluggable Gamification</h1>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p>Never get bored of your work!
                                <br></br>
                                <br></br>
                                <br></br>
                                Start creating groups of projects with your colleagues.
                                <br></br>
                                <br></br>
                                <br></br>
                                Transforme your work in a fun game to play!
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <em>Made in ISEL</em>
                            </p>
                        </div>
                    </div>
                    <div class="col-10 col-sm-4 offset-0">
                        <img class="align-items-center device" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Video-Game-Controller-Icon.svg/1024px-Video-Game-Controller-Icon.svg.png" width="300"/>
                        <div class="d-none d-md-block"></div>
                    </div>
                </div>
            </div>
            <div class="box-home features m-3">
                <div class="row">
                    <div class="col mb-5">
                        <br></br>
                        <h1 class="text-center">Features</h1>
                        <h6 class="text-center">Take a peek at all that COVIDA has to offer</h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="card card-home">
                            <i class="icon-home"><SportsEsportsIcon style={{ width: 70, height: 'auto' }}/></i>
                            <h3 class="name">GitLab And Jira</h3>
                            <h5 class="description">You can add your own projects to be gamify.</h5>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card card-home">
                            <i class="icon-home"><LocalAtmIcon style={{ width: 70, height: 'auto' }}/></i>
                            <h3 class="name">Always Free</h3>
                            <h5 class="description">Pluggable Gamification is completely free.</h5>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card card-home">
                            <i class="icon-home"><PersonIcon style={{ width: 70, height: 'auto' }}/></i>
                            <h3 class="name">Customizable </h3>
                            <h5 class="description">Create groups with your projects.</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;