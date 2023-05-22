import { createReducer, on } from '@ngrx/store';
import { Course } from './course';
import { coursesFetchAPISucess } from './courses.action';

export const InitialState: ReadonlyArray<Course> = [];

export const CoursesReducer = createReducer(
  InitialState,
  on(coursesFetchAPISucess, (state, { allCourses }) => {
    return allCourses;
  })
);
