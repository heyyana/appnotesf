import React, { useState } from 'react';
import Login from './components/Login/login'

 

export default function App() {
  const [user, setUser] = useState(null);

 

  //verifica se existe um usuário logado, se não houver chama a
  //tela de login
  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }
}