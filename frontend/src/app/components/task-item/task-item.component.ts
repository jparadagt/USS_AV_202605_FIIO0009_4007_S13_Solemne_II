import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';

type EditableTask = Omit<Task, 'dueDate'> & {
  dueDate: string;
};

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  
  @Input() task!: Task;
  
  @Output()
  delete = new EventEmitter<number>();
  
  @Output()
  toggleStatus = new EventEmitter<number>();

  @Output()
  update = new EventEmitter<Task>();

  isEditing = false;
  editableTask!: EditableTask;
  
  onDelete(): void {
    this.delete.emit(this.task.id);
  }
  
  onToggleStatus(): void {
    this.toggleStatus.emit(this.task.id);
  }

  startEdit(): void {
    this.editableTask = {
      ...this.task,
      dueDate: this.toDateInputValue(this.task.dueDate)
    };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveEdit(): void {
    this.update.emit({
      ...this.editableTask,
      dueDate: new Date(this.editableTask.dueDate)
    });
    this.isEditing = false;
  }
  
  getRemainingDays(): number { 
    const today = new Date();
    const dueDate = new Date(this.task.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    
    return Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );
  }
  
  isExpired(): boolean {
    return this.getRemainingDays() < 0;
  }
  
  isDueSoon(): boolean {
    const days = this.getRemainingDays();
    return days >= 0 && days <= 3;
  }

  private toDateInputValue(date: Date): string {
    return new Date(date).toISOString().slice(0, 10);
  }
}
