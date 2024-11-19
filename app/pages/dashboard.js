// /pages/dashboard.js

import Link from 'next/link';

const Dashboard = () => {
  return (
    <div>
      <h2>Painel de Administração</h2>
      <nav>
        <ul>
          <li><Link href="/users">Usuários</Link></li>
          <li><Link href="/teachers">Professores</Link></li>
          <li><Link href="/students">Alunos</Link></li>
          <li><Link href="/appointments">Agendamentos</Link></li>
          <li><Link href="/events">Eventos</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
