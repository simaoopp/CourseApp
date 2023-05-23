import { Component, OnInit } from '@angular/core';
import {
  invokeCoursesApi,
  invokeDeleteCourseApi,
  invokeSaveCourseApi,
  invokeUpdateCourseApi,
} from '../store/courses.action';
import { Store, select } from '@ngrx/store';
import { selectCourse, selectCourseById } from '../store/courses.selector';
import { Course } from '../store/course';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { StoreDispatchService } from '../store-dispatch.service';

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
  idtoDelete: any;

  constructor(
    private store: Store,
    private appState: Store<Appstate>,
    private router: Router,
    private route: ActivatedRoute,
    private storeDispatch: StoreDispatchService
  ) {}

  NewCourseForm: Course = {
    id: 0,
    courseauthor: '',
    coursetitle: '',
    cost: 0,
    img: '',
    description: '',
  };


  EditCourseForm: Course = {
    id: 0,
    courseauthor: '',
    coursetitle: '',
    cost: 0,
    img: '',
    description: '',
  };

  save() {
    this.storeDispatch.saveNewCourse(this.NewCourseForm);
    this.createModal.hide();
    this.ClearNewCourseForm();
  }

  ClearNewCourseForm() {
    this.NewCourseForm = {
      id: 0,
      courseauthor: '',
      coursetitle: '',
      cost: 0,
      img: '',
      description: '',
    };
  }

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

    this.storeDispatch.showCourses();
  }

  openCreateModal() {
    this.createModal.show();
  }

  openEditModal(id: number) {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap(() => {
        return this.store.pipe(select(selectCourseById(id)));
      })
    );

    fetchFormData$.subscribe((data) => {
      if (data) {
        this.EditCourseForm = { ...data };
      } else {
        this.router.navigateByUrl('');
      }
    });

    this.editModal.show();
  }

  update() {
    this.storeDispatch.updateCourse(this.EditCourseForm);
    this.editModal.hide();
  }

  openDeleteModal(id: number) {
    this.idtoDelete = id;
    this.deleteModal.show();
  }
  confirmDelete() {
    this.storeDispatch.deleteCourse(this.idtoDelete);
    this.deleteModal.hide();
  }
}
