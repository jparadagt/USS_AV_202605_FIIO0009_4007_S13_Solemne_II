import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { TaskReportComponent } from '../task-report/task-report.component';
import { TaskService } from '../../services/task.service';

@Component({
	selector: 'app-task-list',
	standalone: true,
	imports: [
		CommonModule,
		TaskItemComponent,
		TaskFormComponent,
		TaskFilterComponent,
		TaskReportComponent
	],	
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
	tasks: Task[] = [];
	allTasks: Task[] = [];
	currentFilters = {
		status: 'ALL',
		priority: 'ALL',
		keyword: ''
	};
	
	constructor(private taskService: TaskService) {
		this.taskService.getTasks().subscribe((tasks) => {
			this.allTasks = tasks;
			this.refreshTasks();
		});
	}
	
	addTask(task: Task): void {
		
		this.taskService.createTask(task)
		.subscribe(createdTask => {
			
			this.allTasks.unshift(createdTask);
			this.refreshTasks();
			
		});
		
	}
	
	deleteTask(taskId: number): void {
		this.taskService.deleteTask(taskId)
		.subscribe(() => {
			this.allTasks = this.allTasks.filter(
				task => task.id !== taskId
			);

			this.refreshTasks();
		});
	}
	
	toggleTaskStatus(taskId: number): void {
		const task = this.allTasks.find(
			currentTask => currentTask.id === taskId
		);

		if (!task) {
			return;
		}

		const updatedTask: Task = {
			...task,
			status:
			task.status === 'PENDING'
			? 'COMPLETED'
			: 'PENDING'
		};

		this.updateTask(updatedTask);
	}

	updateTask(task: Task): void {
		this.taskService.updateTask(task)
		.subscribe(updatedTask => {
			this.allTasks = this.allTasks.map(currentTask => {
				if (currentTask.id === updatedTask.id) {
					return updatedTask;
				}

				return currentTask;
			});

			this.refreshTasks();
		});
	}
	
	applyFilters(filters: any): void {
		this.currentFilters = filters;
		this.refreshTasks();
	}

	private refreshTasks(): void {
		this.tasks = this.allTasks.filter(task => {
			
			const matchesStatus = this.currentFilters.status === 'ALL' || task.status === this.currentFilters.status;
			const matchesPriority = this.currentFilters.priority === 'ALL' || task.priority === this.currentFilters.priority;
			const keyword = this.currentFilters.keyword.toLowerCase();
			const matchesKeyword = task.title.toLowerCase().includes(keyword) || task.description.toLowerCase().includes(keyword);
			
			return (
				matchesStatus && matchesPriority && matchesKeyword
			);
		});	
	}
}
