import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Course } from "./course";


export const selectCourse = createFeatureSelector<Course[]>('myCourse');

export const selectCourseById = (courseId: number) => {
    return createSelector(selectCourse, (Course: Course[]) => {
      var courseById = Course.filter((_) => _.id == courseId);
      if (courseById.length == 0) {
        return null;
      }
      return courseById[0];
    });
  };
  