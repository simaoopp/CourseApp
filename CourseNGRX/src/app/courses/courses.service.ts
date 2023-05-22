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

  create(payload: Course) {
    return this.http.post<Course>('http://localhost:3000/courses', payload);
  }

  update(payload: Course) {
    return this.http.put<Course>(
      `http://localhost:3000/courses/${payload.id}`,
      payload
    );
  }

  delete(id:number){
    return this.http.delete(`http://localhost:3000/courses/${id}`)
  }
}
