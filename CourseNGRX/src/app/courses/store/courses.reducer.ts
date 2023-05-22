import { createReducer, on } from '@ngrx/store';
import { Course } from './course';
import { coursesFetchAPISucess, saveCourseAPISucess } from './courses.action';

export const InitialState: ReadonlyArray<Course> = [];

export const CoursesReducer = createReducer(
  InitialState,
  on(coursesFetchAPISucess, (state, { allCourses }) => {
    return allCourses;
  }),
  on(saveCourseAPISucess, (state, { response }) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
);
