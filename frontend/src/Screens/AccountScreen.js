import React, { useState } from 'react';
import Axios from 'axios';

export default function AccountScreen() {
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, Setpassword] = useState('');
  const [cpassword, SetCpassword] = useState('');
  const [isAdmin, setisAdmin] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      console.log('password is incorrect');
      return;
    }
    try {
      const { data } = await Axios.post('/api/signup', {
        name,
        email,
        password,
        isAdmin,
      });

      localStorage.setItem('userProfile', JSON.stringify(data));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      AccountScreen{' '}
      <form onSubmit={submitHandler}>
        <label>Name</label>
        <input
          type="text"
          required
          name="name"
          onChange={(e) => SetName(e.target.value)}
        />
        <label>email</label>
        <input
          type="text"
          required
          name="email"
          onChange={(e) => SetEmail(e.target.value)}
        />
        <input
          type="checkbox"
          name="isAdmin"
          checked={isAdmin}
          onChange={(e) => setisAdmin(e.target.checked)}
        />
        <label>isAdmin</label>
        <label>password</label>
        <input
          type="password"
          required
          name="password"
          onChange={(e) => Setpassword(e.target.value)}
        />
        <label>cpassword</label>
        <input
          type="password"
          required
          name="cpassword"
          onChange={(e) => SetCpassword(e.target.value)}
        />
        <div>
          <button>Create Account</button>
        </div>
      </form>
    </div>
  );
}
