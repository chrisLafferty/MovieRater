import React, {useState, useEffect} from 'react';
import { API } from '../api-service'
import {useCookies} from 'react-cookie';

function MovieForm(props) {

    const [ year, setYear] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [token] = useCookies(['user-token']);

    useEffect( () => {
        setYear(props.movie.year);
        setTitle(props.movie.title);
        setDescription(props.movie.description);
    }, [props.movie])

    const updateClicked = () => {
        API.updateMovie(props.movie.id , {year, title, description}, token['user-token'])
        .then( resp => props.updatedMovie(resp))
        .catch( error => console.log(error))
    }
    const createClicked = () => {
        API.createMovie({year, title, description}, token['user-token'])
        .then( resp => props.movieCreated(resp))
        .catch( error => console.log(error))
    }
    


    return (
        <React.Fragment>
         { props.movie ?(
             <div>
                <label htmlFor="year">Year</label><br/>
                <input id="year" type="text" placeholder="year" value={year} onChange={ evt=> setYear(evt.target.value)}/><br/>
                <label htmlFor="title">Title</label><br/>
                <input id="title" type="text" placeholder="title" value={title} onChange={ evt=> setTitle(evt.target.value)}/><br/>
                <label>Description</label><br/>
                <textarea id="description" type="text" placeholder="description" value={description} onChange={evt => setDescription(evt.target.value)}></textarea><br/>
                { props.movie.id ?
                    <button onClick={updateClicked}>Update</button> :
                    <button onClick={createClicked}>Create</button>
                }
                
             </div>
            ) : null }
            </React.Fragment>
    )
}

export default MovieForm;