import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../core/services/message.service';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  onsubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.authService.sendPasswordResetEmail(this.f.email.value).then(() => {
      this.router.navigate(['/auth/login'])
        .then(() => this.messageService.add('Ďalšie inštrukcie boli zaslané na Váš email'));
    }).catch((error) => this.messageService.add(error.message));
  }
}
