import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { AuthRespository } from '../../../core/auth/auth.repository';
import { LayoutService } from '../../../layout/app.layout.service';
import { ValidateControlDirective } from '../../shared/directives/validate-control.directive';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  templateUrl: './forgotpassword.component.html',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, ValidateControlDirective],
})
export class ForgotPasswordComponent {

  readonly router = inject(Router);

  constructor(private layoutService: LayoutService, private authRepository: AuthRespository, private messageService: MessageService) { }
  recoverPasswordForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    documentNumber: new FormControl<string>('', [Validators.required])
  });

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
  recoverPassword(recoverPasswordForm: FormGroup<{
    email: FormControl<string | null>;
    documentNumber: FormControl<string | null>;
  }>
  ) {
    if (recoverPasswordForm.invalid) {
      return this.recoverPasswordForm.markAsDirty();
    }
    const email = recoverPasswordForm.controls.email.value ?? '';
    const documentNumber = recoverPasswordForm.controls.documentNumber.value ?? '';
  }

}
