import React, { useState } from 'react';

export default function AccountScreen() {
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, Setpassword] = useState('');
  const [cpassword, SetCpassword] = useState('');
  const [checked, setChecked] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(checked);
    console.log(password);
    console.log(cpassword);
    console.log(email);
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
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
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
