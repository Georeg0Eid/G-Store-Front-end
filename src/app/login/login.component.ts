import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthoService } from '../services/autho.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, ReactiveFormsModule, NgIf,RouterLink],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authoService: AuthoService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authoService.login(loginData).subscribe({
        next: (response) => {

          const decodedToken = this.authoService.decodeAccessToken();
          localStorage.setItem('authToken', decodedToken);
          const userType = decodedToken?.userType;

          if (userType === 'Admin') {
            this.router.navigate(['/dashboard']);
          } else if (userType === 'User') {
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'User type not recognized!';
          }
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Invalid email or password!';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly!';
    }
  }
}
