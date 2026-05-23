import { Task } from '../models/task';

export const TASKS_MOCK: Task[] = [
  {
    id: 1,
    title: 'Implement Angular frontend',
    description: 'Create task list UI',
    status: 'PENDING',
    priority: 'HIGH',
    createdAt: new Date(),
    dueDate: new Date('2026-06-01')
  },
  {
    id: 2,
    title: 'Configure Docker',
    description: 'Prepare frontend container',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    createdAt: new Date(),
    dueDate: new Date('2026-05-30')
  }
];