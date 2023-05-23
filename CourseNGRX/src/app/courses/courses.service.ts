import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Course } from './store/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  create(payload: Course) {
    return this.http.post<Course>(`${this.apiUrl}/courses`, payload);
  }

  update(payload: Course) {
    return this.http.put<Course>(
      `${this.apiUrl}/courses/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/courses/${id}`);
  }
}
