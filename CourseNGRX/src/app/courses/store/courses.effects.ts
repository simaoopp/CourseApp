import { CoursesService } from './../courses.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import {
  coursesFetchAPISucess,
  invokeCoursesApi,
  invokeSaveCourseApi,
  invokeUpdateCourseApi,
  saveCourseAPISucess,
  updateCourseAPISucess,
} from './courses.action';
import { selectCourse } from './courses.selector';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private CoursesService: CoursesService,
    private appState: Store<Appstate>,
    private store: Store
  ) {}

  loadAllCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeCoursesApi),
      withLatestFrom(this.store.pipe(select(selectCourse))),
      switchMap(([, CourseFromStore]) => {
        if (CourseFromStore.length > 0) {
          return EMPTY;
        }
        return this.CoursesService.get().pipe(
          map((data) => coursesFetchAPISucess({ allCourses: data }))
        );
      })
    )
  );

  saveNewCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveCourseApi),
      switchMap((action) => {
        this.appState.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.CoursesService.create(action.payload).pipe(
          map((data) => {
            this.appState.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveCourseAPISucess({ response: data });
          })
        );
      })
    )
  );

  updateCourse$ = createEffect(() =>
  this.actions$.pipe(
    ofType(invokeUpdateCourseApi),
    switchMap((action) => {
      this.appState.dispatch(
        setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
      );
      return this.CoursesService.update(action.payload).pipe(
        map((data) => {
          this.appState.dispatch(
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            })
          );
          return updateCourseAPISucess({ response: data });
        })
      );
    })
  )
);
}
