import React from 'react'


function Home() {
    return (
        <>
            <header class="masthead">
                <div class="container h-100">
                    <div class="row h-100 align-items-center">
                        <div class="col-12 text-center">
                            <h1 id="title" class="font-weight-ligth">Pluggable Gamification Application</h1>
                            <p class="lead">Create an account and start transforming your projects in fun games with your colleagues.</p>
                        </div>
                    </div>
                </div>
            </header>

            <section class="py-5 section">
                <div class="section" id="rankings-box">
                    <div class="text-box" id="rankings-text">
                        <h2 class="font-weight-light" id="main-title">Are you a geek?</h2>
                        <h3>Looking for a place to transforme boring projects in fun games to play?</h3>
                        <p>Stop searching! We got your back.</p>
                        <br></br>
                        <input id="search-rankings-button" type="button" name="" value="SEARCH RANKINGS"
                            onclick="location.href = '#rankings'">
                        </input>
                        <img src="https://blog.jobylon.com/wp-content/uploads/2020/04/undraw_video_game_night_8h8m-1024x700.png" id="rankings-img"></img>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;