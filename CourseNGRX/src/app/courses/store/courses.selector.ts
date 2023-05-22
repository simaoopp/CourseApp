import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Course } from "./course";


export const selectCourse = createFeatureSelector<Course[]>('myCourse');

