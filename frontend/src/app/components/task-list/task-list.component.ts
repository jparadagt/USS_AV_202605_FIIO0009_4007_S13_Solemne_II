import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TASKS_MOCK } from '../../mock/tasks.mock';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
	selector: 'app-task-list',
	standalone: true,
	imports: [CommonModule, TaskItemComponent, TaskFormComponent],
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
	tasks: Task[] = TASKS_MOCK;
	
	addTask(task: Task): void {
		this.tasks.unshift(task);
	}
}