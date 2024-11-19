// /pages/appointments.js
import { useState } from 'react';
import { createAppointment } from '../services/api';

const Appointments = () => {
  const [specialty, setSpecialty] = useState('');
  const [comments, setComments] = useState('');
  const [date, setDate] = useState('');
  const [student, setStudent] = useState('');
  const [professional, setProfessional] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = { specialty, comments, date, student, professional };
    try {
      await createAppointment(appointmentData);
      alert('Agendamento criado com sucesso!');
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      etError('Erro ao carregar os usuários. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Agendamento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Especialidade</label>
          <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
        </div>
        <div>
          <label>Comentários</label>
          <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} required />
        </div>
        <div>
          <label>Data</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Aluno</label>
          <input type="text" value={student} onChange={(e) => setStudent(e.target.value)} required />
        </div>
        <div>
          <label>Profissional</label>
          <input type="text" value={professional} onChange={(e) => setProfessional(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Appointments;
