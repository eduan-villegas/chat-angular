import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm!: FormGroup;
  hasError: boolean = false;
  hasErrorText: any = '';
  hasSuccess: boolean = false;
  hasSuccessText: any = '';
  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    if (this.authServices.isLoggin()) {
      this.route.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(250)
        ])
      ],
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
        ])
      ],
      surname: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
        ])
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
        ])
      ],
      password_confirmation: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
        ])
      ]
    })
  }

  verifyPassword(password: string, password_confirmation: string) {
    return password !== password_confirmation;
  }

  submit() {
    this.hasError = false;
    this.hasErrorText = '';
    if (this.verifyPassword(this.loginForm.value.password, this.loginForm.value.password_confirmation)) {
      this.hasError = true;
      this.hasSuccessText = 'LAS CONTRASEÑAS NO COINCIDEN';
    }
    this.authServices.register(this.loginForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.route.navigate(["auth/login"]);
      this.hasSuccess = true;
      this.hasSuccessText = 'USUARIO CREADO CON EXITO'
    }, error => {
      this.hasError = true;
      this.hasErrorText = 'PROBLEMAS AL CREAR EL USUARIO';
      console.log(error);
    })

  }
}
