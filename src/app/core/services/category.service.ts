import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryItemNode} from '../models/category-item-node';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {CategoryHelper} from '../class/CategoryHelper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryStore = new Subject<CategoryItemNode>();

  constructor(
    private http: HttpClient,
    private categoryHelper: CategoryHelper
  ) {
  }

  all(): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(environment.baseUrl + '/category/all');
  }

  fallByType(type: string): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(`${environment.baseUrl}/category/allByType/${type}`).pipe(map(categories => {
      return this.categoryHelper.prepareOptionTree(categories);
    }));
  }

  nested(): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(environment.baseUrl + '/category/all').pipe(map((categories) => {
      return this.categoryHelper.prepareTree(categories, null);
    }));
  }

  store(category: CategoryItemNode): Observable<CategoryItemNode> {
    return this.http.post<CategoryItemNode>(`${environment.baseUrl}/category/store`, category).pipe(map((categoryItemNode) => {
      this.categoryStore.next(categoryItemNode);

      return categoryItemNode;
    }));
  }

  updateTree(categories: CategoryItemNode[]): Observable<CategoryItemNode[]> {
    this.categoryHelper.setTreeDepth(categories);

    return this.http.post<CategoryItemNode[]>(environment.baseUrl + '/category/updateTree', this.categoryHelper.resetTree(categories));
  }

  destroy(id: number): Observable<CategoryItemNode> {
    return this.http.get<CategoryItemNode>(environment.baseUrl + '/category/destroy/' + id);
  }
}
