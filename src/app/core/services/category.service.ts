import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryItemNode} from '../models/category-item-node';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryStore = new Subject<CategoryItemNode>();

  constructor(private http: HttpClient) {
  }

  all(): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(environment.baseUrl + '/category/all');
  }

  nested(): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(environment.baseUrl + '/category/nested');
  }

  store(category: CategoryItemNode): Observable<CategoryItemNode> {
    return this.http.post<CategoryItemNode>(`${environment.baseUrl}/category/store`, category).pipe(map((categoryItemNode) => {
      this.categoryStore.next(categoryItemNode);

      return categoryItemNode;
    }));
  }

  updateTree(categories: CategoryItemNode[]): Observable<CategoryItemNode[]> {
    return this.http.post<CategoryItemNode[]>(environment.baseUrl + '/category/updateTree', categories);
  }

  destroy(id: number): Observable<CategoryItemNode> {
    return this.http.get<CategoryItemNode>(environment.baseUrl + '/category/destroy/' + id);
  }
}
