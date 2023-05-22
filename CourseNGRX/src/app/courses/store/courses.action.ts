import { createAction, props } from '@ngrx/store';
import { Course } from './course';

//get
export const invokeCoursesApi = createAction(
  '[Course API] invoke Course Fetch API'
);

export const coursesFetchAPISucess = createAction(
  '[Course API] invoke Course Fetch API Sucess',
  props<{ allCourses: Course[] }>()
);

//post
export const invokeSaveCourseApi = createAction(
  '[Course API] invoke Save Course API',
  props<{ payload: Course }>()
);

export const saveCourseAPISucess = createAction(
  '[Course API] Save Course API Sucess',
  props<{ response: Course }>()
);
