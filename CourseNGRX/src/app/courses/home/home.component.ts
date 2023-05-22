import { Component, OnInit } from '@angular/core';
import { invokeCoursesApi, invokeSaveCourseApi } from '../store/courses.action';
import { Store, select } from '@ngrx/store';
import { selectCourse } from '../store/courses.selector';
import { Course } from '../store/course';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store,
    private appState: Store<Appstate>,
    private router: Router
  ) {}

  NewCourseForm: Course = {
    id: 0,
    courseauthor: '',
    coursetitle: '',
    cost: 0,
    img: '',
    description: '',
  };

  save() {
    this.store.dispatch(
      invokeSaveCourseApi({ payload: { ...this.NewCourseForm } })
    );
    let appstate$ = this.appState.pipe(select(selectAppState));
    appstate$.subscribe((data) => {
      if (data.apiStatus === 'sucess') {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
      }
    });
    location.reload();
  }

  createModal: any;
  editModal: any;
  deleteModal: any;

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
