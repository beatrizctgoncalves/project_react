import React from 'react'
import EditIcon from '@material-ui/icons/Edit';

function Group() {
    return (
        <div class="homeItems">
            <div class="box-home m-3">
                <div class="text-center">
                <h1>username's Groups</h1>
                    <div class="col-md-8">
                        <div class="intro">
                            <div class="card-columns card-groups m-3">
                                <div class="card text-center">
                                    <div class="card-header">
                                        <a href="/site/groups/{{id}}" class="text-dark">
                                            Name
                                        </a>
                                        <a href="/editGroup/{{id}}/{{name}}" class="float-left text-dark">
                                            <i class="far fa-edit"><EditIcon/></i>
                                        </a>
                                        <form class="float-right text-dark" action="/site/groups/{{id}}" method="POST">
                                            <input type="image" src="https://cdn0.iconfinder.com/data/icons/network-technology-2-3/48/72-512.png" alt="" width="20" height="20"/>
                                        </form>
                                    </div>
                                    <div class="card-body text-center">
                                        <p class="card-text"><em>desc</em></p>
                                    </div>
                                    <div class="card-footer text-muted">
                                        <div class="card-body text-center">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-home features m-3">
                <div class="row">
                    <div class="col mb-5">
                        <br></br>
                        <div class = "col text-center">
                            <br/><br/><a href="/account" class="btn btn-primary" type="button">Go Back</a><br/><br/>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Group;