import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Course } from './store/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  
  get() {
    return this.http.get<Course[]>('http://localhost:3000/courses');
  }
}
