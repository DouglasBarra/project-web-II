// /pages/teachers.js
import { useState } from 'react';
import { createTeacher } from '../services/api';

const Teachers = () => {
  const [name, setName] = useState('');
  const [disciplines, setDisciplines] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherData = { name, school_disciplines: disciplines, contact, phone_number: phone, status: 'on' };
    try {
      await createTeacher(teacherData);
      alert('Professor cadastrado com sucesso!');
    } catch (err) {
      console.error(err);
        setError('Erro ao carregar os usuários. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Professor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Disciplinas</label>
          <input type="text" value={disciplines} onChange={(e) => setDisciplines(e.target.value)} required />
        </div>
        <div>
          <label>Contato</label>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <div>
          <label>Telefone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Teachers;
