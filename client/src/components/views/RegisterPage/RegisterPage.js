import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onEmailHandler= event => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler= event => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler= event => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler= event => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler= event => {
    event.preventDefault();
    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
    let body = {
      email : Email,
      name : Name,
      password : Password,

    }
    // loginUser 라는 액션을 실행시킴
    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success) {
        // root 경로로 이동
        navigate('/')
      } else {
        alert('회원가입에 실패하였습니다.')
      }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display:'flex', flexDirection : 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <br />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <br />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />

        <button type="submit">
            회원 가입
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
