export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: Date;
  dueDate: Date;
}