import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TASKS_MOCK } from '../../mock/tasks.mock';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';

@Component({
	selector: 'app-task-list',
	standalone: true,
	imports: [
		CommonModule,
		TaskItemComponent,
		TaskFormComponent,
		TaskFilterComponent
	],	
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
	tasks: Task[] = TASKS_MOCK;
	allTasks: Task[] = TASKS_MOCK;
	
	addTask(task: Task): void {
		this.allTasks.unshift(task);
		this.tasks = [...this.allTasks];	
	}
	
	deleteTask(taskId: number): void {
		this.allTasks = this.allTasks.filter(
			task => task.id !== taskId
		);
		
		this.tasks = [...this.allTasks];	
	}
	
	toggleTaskStatus(taskId: number): void {
		this.tasks = this.tasks.map(task => {
			if (task.id === taskId) {
				return {
					...task,
					status:
					task.status === 'PENDING'
					? 'COMPLETED'
					: 'PENDING'
				};
			}
			
			return task;
		});
	}
	
	applyFilters(filters: any): void {
		this.tasks = this.allTasks.filter(task => {
			
			const matchesStatus = filters.status === 'ALL' || task.status === filters.status;
			const matchesPriority = filters.priority === 'ALL' || task.priority === filters.priority;
			const keyword = filters.keyword.toLowerCase();
			const matchesKeyword = task.title.toLowerCase().includes(keyword) || task.description.toLowerCase().includes(keyword);
			
			return (
				matchesStatus && matchesPriority && matchesKeyword
			);
		});	
	}
}