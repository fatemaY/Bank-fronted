import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    if (username === 'admin' && password === 'admin123') {
        navigate("/accounts");
        console.log("admin")
      } else {
        // Handle incorrect credentials (e.g., show an error message)
        console.log('Incorrect username or password');
      }
  };
    // function classes(){
    //     const bg = props.bgcolor ? 'bg-' + props.bgcolor : ' ';
    //     const txt = props.txtcolor ? 'text-' + props.txtcolor: ' text-white';
    //     return 'card mb-3 ' + bg + txt;
    // }

  return (
    <div className="card">
    <h1 className="card-header">{props.header}</h1>
    <div className="card-body">
       {props.title && (<h3 className="card-title">{props.title}</h3>)}
       {props.text && (<p className="card-text">{props.text}</p>)}
       {props.body}
       {props.status && (<div id="createStatus">{props.status}</div>)}
       <div className='signin'>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button className='sign-in-button' onClick={handleSignIn}>Sign In</button>
    </div>

    </div>
    </div>
  )
}

export default Card




