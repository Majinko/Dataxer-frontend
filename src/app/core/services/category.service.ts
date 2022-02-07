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
  categoryUpdateOrStore = new Subject<CategoryItemNode>();

  constructor(
    private http: HttpClient,
    private categoryHelper: CategoryHelper
  ) {
  }

  all(prepareOptionTree: boolean = false): Observable<CategoryItemNode[]> {
    if (!prepareOptionTree) {
      return this.http.get<CategoryItemNode[]>(environment.baseUrl + '/category/all');
    } else {
      return this.http.get<CategoryItemNode[]>(`${environment.baseUrl}/category/all`).pipe(map(categories => {
        return this.categoryHelper.prepareOptionTree(categories);
      }));
    }
  }

  allUserCategoryByTime(uid: string): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(environment.baseUrl + '/category/allUserCategoryByTime?uid=' + uid);
  }

  findById(id: number): Observable<CategoryItemNode> {
    return this.http.get<CategoryItemNode>(`${environment.baseUrl}/category/${id}`);
  }

  fallByType(type: string): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(`${environment.baseUrl}/category/allByType/${type}`).pipe(map(categories => {
      return this.categoryHelper.prepareOptionTree(categories);
    }));
  }

  fallByTypeIn(types: string[]): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(`${environment.baseUrl}/category/allByTypes?types=${types.join(',')}`).pipe(map(categories => {
      return this.categoryHelper.prepareOptionTree(categories);
    }));
  }

  nested(): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(environment.baseUrl + '/category/all').pipe(map((categories) => {
      return this.categoryHelper.prepareTree(categories, null);
    }));
  }

  storeOrUpdate(category: CategoryItemNode): Observable<CategoryItemNode> {
    return this.http.post<CategoryItemNode>(`${environment.baseUrl}/category/storeOrUpdate`, category).pipe(map((categoryItemNode) => {
      this.categoryUpdateOrStore.next(categoryItemNode);

      return categoryItemNode;
    }));
  }

  updateTree(categories: CategoryItemNode[]): Observable<CategoryItemNode[]> {
    this.categoryHelper.setTreeDepth(categories);

    return this.http.post<CategoryItemNode[]>(environment.baseUrl + '/category/updateTree', categories);
  }

  destroy(id: number): Observable<CategoryItemNode> {
    return this.http.get<CategoryItemNode>(environment.baseUrl + '/category/destroy/' + id);
  }

  allByGroupFromParent(group: string, tree: boolean = true): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(`${environment.baseUrl}/category/allByGroupFromParent/${group}`)
      .pipe(map((categories) => {
        return tree ? this.categoryHelper.prepareTree(categories, null) : categories;
      }));
  }

  fallByGroupIn(groups: string[], prepareTree = true): Observable<CategoryItemNode[]> {
    return this.http.get<CategoryItemNode[]>(`${environment.baseUrl}/category/allByGroups?groups=${groups.join(',')}`)
      .pipe(map(categories => {
        if (!prepareTree) {
          return this.categoryHelper.prepareOptionTree(categories);
        } else {
          return categories;
          // return this.categoryHelper.prepareTree(categories, null);
        }
      }));
  }
}
