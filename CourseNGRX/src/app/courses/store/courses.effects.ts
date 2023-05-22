import { CoursesService } from './../courses.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { coursesFetchAPISucess, invokeCoursesApi } from './courses.action';
import { selectCourse } from './courses.selector';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private CoursesService: CoursesService,
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
      return this.CoursesService
        .get()
        .pipe(map((data) => coursesFetchAPISucess({ allCourses: data })));
    })
  )
);
  
}
