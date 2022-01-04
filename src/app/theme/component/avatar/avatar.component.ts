import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/user';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {CompanyService} from '../../../core/services/company.service';
import {Company} from '../../../core/models/company';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  user: User;
  companies: Company[] = [];

  constructor(
    @Inject(UserService) public readonly userService: UserService,
    @Inject(AuthService) private readonly authService: AuthService,
    public readonly companyService: CompanyService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getCompanies();

    this.companyService.companyStore.subscribe(c => {
      this.companies.push(c);
    });
  }

  logout() {
    this.authService.signOut().then(() => this.router.navigate(['/auth/login']));
  }

  getCompanies() {
    this.companyService.all().subscribe(companies => {
      this.companies = companies;
    });
  }

  switchCompany(company: Company) {
    this.userService.switchCompany(company.id).subscribe(() => {
      window.location.reload();
    });
  }
}
