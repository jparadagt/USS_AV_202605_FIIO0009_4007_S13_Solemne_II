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
  
}