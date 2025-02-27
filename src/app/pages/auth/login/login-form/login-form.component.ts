import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ValidateControlDirective } from '../../../shared/directives/validate-control.directive';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, ValidateControlDirective ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  @Output() submitForm = new EventEmitter<{
    identifier: string;
    password: string;
  }>();

  private formBuilder = inject(FormBuilder);
  protected loginForm = this.formBuilder.nonNullable.group({
    identifier: ['', [Validators.required, Validators.min(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitForm.emit({
        identifier: this.loginForm.controls.identifier.value,
        password: this.loginForm.controls.password.value,
      });
    }
  }
}
