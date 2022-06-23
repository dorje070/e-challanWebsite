import React from 'react';

export default function ProfileScreen() {
  const { email, name } = JSON.parse(localStorage.getItem('userInfo'));
  console.log(email);
  console.log(name);
  return (
    <div>
      ProfileScreen
      <h2>{name}</h2>
      <h2>{email}</h2>
    </div>
  );
}
