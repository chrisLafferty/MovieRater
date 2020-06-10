import React, { useState, useEffect} from 'react';
import {API} from '../api-service';
import {useCookies} from 'react-cookie';



function Auth(){

   const [username,setusername] = useState(''); 
   const [password,setpassword] = useState('');
   const [ isLoginView, setIsLoginView] = useState(true);

   const [token, setToken] = useCookies(['user-token']);

    useEffect(() => {
        console.log(token);
        if(token['user-token']) window.location.href = '/movies'
    }, [token])

   const loginClicked = () => {
        API.loginUser({username, password})
        .then( resp => setToken('user-token', resp.token))
        .catch( error => console.log(error))
   }

   const registerClicked = () => {
    API.registerUser({username, password})
    .then( () => loginClicked())
    .catch( error => console.log(error))
}

    return(
        <div className="App">

        <header className="App-header">
            {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
        </header>
        <div className= "login_wrap">
            <label htmlFor="username">Username</label><br/>
            <input id="username" type="text" placeholder="username" value={username} onChange={ evt=> setusername(evt.target.value)}/><br/>
            <label htmlFor="password">Password</label><br/>
            <input id="password" type="password" placeholder="password" value={password} onChange={ evt=> setpassword(evt.target.value)}/><br/>
            {isLoginView ? 
                <button onClick={loginClicked}>Login</button> : 
                <button  onClick={registerClicked}>Register</button>
            } 
            {isLoginView ? 
                <p onClick={()=> setIsLoginView(false)}>Register Account</p> : 
                <p onClick={()=> setIsLoginView(true)}>Back to Login</p>
            }
        </div>
     </div>
    )
}

export default Auth;