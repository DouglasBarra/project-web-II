// /pages/users.js
import { useState } from 'react';
import { createUser } from '../services/api';

const Users = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('user');
  const [status, setStatus] = useState('on');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, user: name.toLowerCase(), pwd: 'default', level, status };
    try {
      await createUser(userData);
      setMessage('Usuário cadastrado com sucesso!');
    } catch (err) {
      console.error(err);
        setError('Erro ao carregar os usuários. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Nível</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} required>
            <option value="admin">Admin</option>
            <option value="user">Usuário</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="on">Ativo</option>
            <option value="off">Inativo</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Users;
