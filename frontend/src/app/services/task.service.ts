import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Task } from '../models/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    
    private apiUrl = '/tasks';
    
    constructor(private http: HttpClient) {}
    
    getTasks(): Observable<Task[]> {
        
        return this.http.get<Task[]>(this.apiUrl);
        
    }

    getTask(taskId: number): Observable<Task> {
        
        return this.http.get<Task>(
            `${this.apiUrl}/${taskId}`
        );
        
    }
    
    createTask(task: Task): Observable<Task> {
        
        return this.http.post<Task>(
            this.apiUrl,
            task
        );
        
    }

    updateTask(task: Task): Observable<Task> {
        
        return this.http.put<Task>(
            `${this.apiUrl}/${task.id}`,
            task
        );
        
    }

    deleteTask(taskId: number): Observable<void> {
        
        return this.http.delete<void>(
            `${this.apiUrl}/${taskId}`
        );
        
    }
    
}
