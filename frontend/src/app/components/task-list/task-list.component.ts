import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task';
import { TASKS_MOCK } from '../../mock/tasks.mock';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  tasks: Task[] = TASKS_MOCK;

}