import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {CompanyService} from "../services/company.service";
import {Company} from "../models/company";
import {Injectable} from "@angular/core";
import {UserService} from '../services/user.service';

@Injectable()
export class CompanyResolver implements Resolve<Observable<any>> {
  constructor(
    private userService: UserService,
    private companyService: CompanyService) {}

  resolve(): Observable<Company> {
    return this.companyService.defaultCompany();
  }
}
