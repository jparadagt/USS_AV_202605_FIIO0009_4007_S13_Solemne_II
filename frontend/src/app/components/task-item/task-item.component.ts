import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  
  @Input() task!: Task;
  
  @Output()
  delete = new EventEmitter<number>();
  
  @Output()
  toggleStatus = new EventEmitter<number>();
  
  onDelete(): void {
    this.delete.emit(this.task.id);
  }
  
  onToggleStatus(): void {
    this.toggleStatus.emit(this.task.id);
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
}