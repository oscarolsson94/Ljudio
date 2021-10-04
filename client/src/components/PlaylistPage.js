import React from 'react'
import { useParams } from 'react-router'

function PlaylistPage() {

    const { title } = useParams();

    return (
        <div>
            <p>{title}</p>
            
        </div>
    )
}

export default PlaylistPage
