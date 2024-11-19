// /pages/events.js
import { useState } from 'react';
import { createEvent } from '../services/api';

const Events = () => {
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { description, comments, date };
    try {
      await createEvent(eventData);
      alert('Evento cadastrado com sucesso!');
    } catch (err) {
      console.error(err);
        setError('Erro ao carregar os usuários. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Comentários</label>
          <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} required />
        </div>
        <div>
          <label>Data</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Events;
