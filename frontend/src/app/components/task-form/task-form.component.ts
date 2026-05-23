import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Task } from '../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  @Output()
  taskCreated = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      priority: ['MEDIUM', Validators.required],
      dueDate: ['', Validators.required]
    });

  }

  submit(): void {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: 'PENDING',
      priority: this.taskForm.value.priority,
      createdAt: new Date(),
      dueDate: new Date(this.taskForm.value.dueDate)
    };

    this.taskCreated.emit(newTask);

    this.taskForm.reset({
      priority: 'MEDIUM'
    });

  }

}