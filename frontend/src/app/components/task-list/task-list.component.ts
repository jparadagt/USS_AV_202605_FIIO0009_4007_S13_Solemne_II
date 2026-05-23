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
	
	constructor(private taskService: TaskService) {
		this.taskService.getTasks().subscribe((tasks) => {
			this.allTasks = tasks;
			this.tasks = [...this.allTasks];
		});
	}
	
	addTask(task: Task): void {
		
		this.taskService.createTask(task)
		.subscribe(createdTask => {
			
			this.allTasks.unshift(createdTask);
			this.tasks = [...this.allTasks];
			
		});
		
	}
	
	deleteTask(taskId: number): void {
		this.allTasks = this.allTasks.filter(
			task => task.id !== taskId
		);
		
		this.tasks = [...this.allTasks];	
	}
	
	toggleTaskStatus(taskId: number): void {
		this.allTasks = this.allTasks.map(task => {
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
		
		this.tasks = [...this.allTasks];	
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