import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage() {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    useDispatch(loginUser(body));
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', height: '100vh'}}>
      <form style={ {display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler}/>
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
