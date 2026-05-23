import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss'
})
export class TaskFilterComponent {

  status: string = 'ALL';
  priority: string = 'ALL';
  keyword: string = '';

  @Output()
  filtersChanged = new EventEmitter<any>();

  applyFilters(): void {

    this.filtersChanged.emit({
      status: this.status,
      priority: this.priority,
      keyword: this.keyword
    });

  }

}