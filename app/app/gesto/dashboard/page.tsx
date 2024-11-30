import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex-col pt-3">
            <h3 className="text-xl font-semibold text-gray-800">Usuarios</h3>
            <p className="text-gray-600 mt-2">Gerenciar Usuarios</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex-col pt-3">
            <h3 className="text-xl font-semibold text-gray-800">Alunos</h3>
            <p className="text-gray-600 mt-2">Gerenciar Alunos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex-col pt-3">
            <h3 className="text-xl font-semibold text-gray-800">Professores</h3>
            <p className="text-gray-600 mt-2">Gerenciar Professores</p>
          </CardContent>
        </Card>
    
        <Card>
          <CardContent className="flex-col pt-3">
            <h3 className="text-xl font-semibold text-gray-800">Eventos</h3>
            <p className="text-gray-600 mt-2">Gerenciar Eventos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex-col pt-3">
            <h3 className="text-xl font-semibold text-gray-800">Profissionais</h3>
            <p className="text-gray-600 mt-2">Gerenciar Profissionais</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex-col pt-3">
            <h3 className="text-xl font-semibold text-gray-800">Agendamentos</h3>
            <p className="text-gray-600 mt-2">Gerenciar Agendamentos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
