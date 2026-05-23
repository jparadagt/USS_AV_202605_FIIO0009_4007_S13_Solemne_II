import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task';

@Component({
  selector: 'app-task-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-report.component.html',
  styleUrl: './task-report.component.scss'
})
export class TaskReportComponent {

  @Input()
  tasks: Task[] = [];

  get completedTasks(): number {

    return this.tasks.filter(
      task => task.status === 'COMPLETED'
    ).length;

  }

  get pendingTasks(): number {

    return this.tasks.filter(
      task => task.status === 'PENDING'
    ).length;

  }

  get completedPercentage(): number {

    if (this.tasks.length === 0) {
      return 0;
    }

    return Math.round(
      (this.completedTasks / this.tasks.length) * 100
    );

  }

  get pendingPercentage(): number {

    if (this.tasks.length === 0) {
      return 0;
    }

    return Math.round(
      (this.pendingTasks / this.tasks.length) * 100
    );

  }

}