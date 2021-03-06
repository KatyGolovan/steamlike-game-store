import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interfaces';
import {AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  submitted = false


  constructor(
    public auth: AuthService,
    private router: Router,

  ) {
  }

  ngOnInit() {}


  // form: FormGroup
  // submitted = false
  // message: string

  // constructor(
  //   public auth: AuthService,
  //   private router: Router,
  //   private route: ActivatedRoute
  // ) {
  // }

  // ngOnInit() {
  //   this.route.queryParams.subscribe((params: Params) => {
  //     if (params['loginAgain']) {
  //       this.message = 'Please log in'
  //     } else if (params['authFailed']) {
  //       this.message = 'Please log in again'
  //     }
  //   })

  //   this.form = new FormGroup({
  //     email: new FormControl(null, [
  //       Validators.required,
  //       Validators.email
  //     ]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(6)
  //     ])
  //   })
  // }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/', 'games'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}

