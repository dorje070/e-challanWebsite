import React, { useState } from 'react';
import Axios from 'axios';

export default function LoginScreen() {
  const [email, SetEmail] = useState('');
  const [password, Setpassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/signin', {
        email,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log(data);
      window.location.href = '/traffic';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      LoginScreen
      <form onSubmit={submitHandler}>
        <label>Email</label>
        <input
          type="text"
          required
          name="email"
          onChange={(e) => SetEmail(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          onChange={(e) => Setpassword(e.target.value)}
        ></input>
        <div>
          <button type="submit">sign in</button>
        </div>
      </form>
    </div>
  );
}
