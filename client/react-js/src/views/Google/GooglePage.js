import React, { useEffect } from 'react';

export default function GooglePage(props) {
    const { username } = props.match.params

    useEffect(() => {
        window.sessionStorage.setItem('username', username);
        window.location.assign('/groups')
    })

    return (
        <></>
    );
}