// /services/api.js
import axios from 'axios';


const API_URL = 'http://localhost:5000';  // Altere para o endereço correto da sua API

const api = axios.create({
  baseURL: API_URL,
});

export const createUser = (userData) => api.post('/users', userData);
export const createTeacher = (teacherData) => api.post('/teachers', teacherData);
export const createStudent = (studentData) => api.post('/students', studentData);
export const createEvent = (eventData) => api.post('/events', eventData);
export const createAppointment = (appointmentData) => api.post('/appointments', appointmentData);

export const getUsers = () => api.get('/users');
export const getTeachers = () => api.get('/teachers');
export const getStudents = () => api.get('/students');
export const getAppointments = () => api.get('/appointments');
// Adicione mais funções conforme necessário para outras rotas
