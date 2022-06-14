import { useEffect, useState } from 'react';
import Card from '../../components/card';
import Feedback from '../../components/feedback';
import './style.scss';

export default function Home() {
  const [userNameValue, setUserNameValue] = useState('');
  const [users, setUsers] = useState([]);
  const [userAdm, setUserAdm] = useState({ name: '', avatar: '', id: '' });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/GuilhermeMota20');
      const data = await response.json();

      setUserAdm({
        id: data.id,
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fetchData();
  }, []);

  function handleAddUser() {
    if (userNameValue == '') return;

    const newUser = {
      name: userNameValue,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    // capiturando todos os dados cadastrados anteriormente e adicionando os novos ao mesmo array sem sobreescrever uns aos outros.
    setUsers(prevState => [...prevState, newUser]);
  }

  return (
    <div className="container">
      <header>
        <h1>{userAdm.id}</h1>
        <div>
          <strong>{userAdm.name}</strong>
          <img src={userAdm.avatar} alt="" />
        </div>
      </header>

      <input
        type="text"
        placeholder='Digite o nome...'
        onChange={e => setUserNameValue(e.target.value)}
      />
      <button type="button" onClick={handleAddUser}>
        Adicionar
      </button>

      {users.length > 0 ?
        users.map((user) => (
          <Card
            key={user.time}
            name={user.name}
            time={user.time}
          />
        )) : <Feedback message="Cadastre um usuário para ser exibido aqui." />
      }
    </div>
  )
}