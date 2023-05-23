import { Injectable } from '@angular/core';
import { invokeCoursesApi, invokeDeleteCourseApi, invokeSaveCourseApi, invokeUpdateCourseApi } from './store/courses.action';
import { setAPIStatus } from '../shared/store/app.action';
import { Store, select } from '@ngrx/store';
import { Appstate } from '../shared/store/appstate';
import { selectAppState } from '../shared/store/app.selector';
import { Form } from '@angular/forms';
import { Course } from './store/course';

@Injectable({
  providedIn: 'root'
})
export class StoreDispatchService {

  constructor(
     private store: Store,
    private appState: Store<Appstate>,) { }

    showCourses() {
      this.store.dispatch(invokeCoursesApi());
    }


  saveNewCourse(NewCourseForm: Course) {
    this.store.dispatch(
      invokeSaveCourseApi({ payload: { ...NewCourseForm } })
    );
    let appstate$ = this.appState.pipe(select(selectAppState));
    appstate$.subscribe((data) => {
      if (data.apiStatus === 'sucess') {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
      }
    });
  }

  updateCourse(EditCourseForm: Course) {
    this.store.dispatch(
      invokeUpdateCourseApi({ payload: { ...EditCourseForm } })
    );

    let appstate$ = this.appState.pipe(select(selectAppState));
    appstate$.subscribe((data) => {
      if (data.apiStatus === 'sucess') {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
      }
    });
  }

  deleteCourse(idCourse: number) {
    this.store.dispatch(invokeDeleteCourseApi({ id: idCourse }));

    let appstate$ = this.appState.pipe(select(selectAppState));
    appstate$.subscribe((data) => {
      if (data.apiStatus === 'sucess') {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
      }
    });
  }

}
