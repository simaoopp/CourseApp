import { createAction, props } from "@ngrx/store";
import { Course } from "./course";


export const invokeCoursesApi = createAction(
    '[Course API] invoke Course Fetch API'
  );
  
  export const coursesFetchAPISucess = createAction(
    '[Course API] invoke Course Fetch API Sucess',
    props<{ allCourses: Course[] }>()
  );