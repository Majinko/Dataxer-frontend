import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryItemNode} from '../models/category-item-node';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  all(): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(environment.baseUrl + '/category/all');
  }

  nested(): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(environment.baseUrl + '/category/nested');
  }

  store(category: CategoryItemNode): Observable<CategoryItemNode> {
    return this.http.post<CategoryItemNode>(environment.baseUrl + '/category/store', category);
  }

  updateTree(categories: CategoryItemNode[]): Observable<CategoryItemNode[]> {
    return this.http.post<CategoryItemNode[]>(environment.baseUrl + '/category/updateTree', categories);
  }

  destroy(id: number): Observable<CategoryItemNode> {
    return this.http.get<CategoryItemNode>(environment.baseUrl + '/category/destroy/' + id);
  }
}
