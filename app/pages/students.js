// /pages/students.js
import { useState } from 'react';
import { createStudent } from '../services/api';

const Students = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [parents, setParents] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = { name, age, parents, special_needs: specialNeeds, phone_number: phone, status: 'on' };
    try {
      await createStudent(studentData);
      alert('Aluno cadastrado com sucesso!');
    } catch (err) {
      console.error(err);
        setError('Erro ao carregar os usuários. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Aluno</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Idade</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label>Responsáveis</label>
          <input type="text" value={parents} onChange={(e) => setParents(e.target.value)} required />
        </div>
        <div>
          <label>Necessidades Especiais</label>
          <input type="text" value={specialNeeds} onChange={(e) => setSpecialNeeds(e.target.value)} required />
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

export default Students;
