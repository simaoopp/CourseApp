import { Component, OnInit } from '@angular/core';
import { invokeCoursesApi } from '../store/courses.action';
import { Store, select } from '@ngrx/store';
import { selectCourse } from '../store/courses.selector';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  createModal: any;
  editModal: any;
  deleteModal: any;
  constructor(private store: Store) {}

  Courses$ = this.store.pipe(select(selectCourse));

  ngOnInit(): void {
    this.createModal = new window.bootstrap.Modal(
      document.getElementById('createModal')
    );

    this.editModal = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.store.dispatch(invokeCoursesApi());
  }

  openCreateModal() {
    this.createModal.show();
  }

  openEditModal() {
    this.editModal.show();
  }

  openDeleteModal() {
    this.deleteModal.show();
  }
}
