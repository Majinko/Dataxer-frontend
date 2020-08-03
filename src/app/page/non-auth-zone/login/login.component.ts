import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../core/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    @Inject(MessageService) private readonly messageService: MessageService,
    @Inject(AuthService) private readonly authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/auth/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['marek.hlavco@gmail.com', Validators.required],
      password: ['123456', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/pages/time';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onsubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.logInWithEmail(this.f.email.value, this.f.password.value)
      .then((user) => this.router.navigate([this.returnUrl]))
      .catch((error) => this.messageService.add(error));
  }
}
