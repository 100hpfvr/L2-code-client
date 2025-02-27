import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../layout/app.layout.service';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateControlDirective } from '../../shared/directives/validate-control.directive';
import { AccountService } from '../account.service';
import { MessageService } from 'primeng/api';
import { formControlValueMatchValidator } from '../../shared/validators/form-control-value-match.validator';

@Component({
  templateUrl: './newpassword.component.html',
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ValidateControlDirective,
    ReactiveFormsModule
  ],
})
export class NewPasswordComponent {

  rememberMe: boolean = false;
  messageService = inject(MessageService);
  router: Router = inject(Router);
  passwordForm = new FormGroup({
    currentPassword: new FormControl<string>('', { validators: [Validators.maxLength(20), Validators.required], nonNullable: true }),
    newPassword: new FormControl<string>('', { validators: [Validators.maxLength(20), Validators.required], nonNullable: true }),
    confirmPassword: new FormControl<string>('', { validators: [Validators.maxLength(20), Validators.required, formControlValueMatchValidator('newPassword')], nonNullable: true }),
  })

  accountService: AccountService = inject(AccountService);

  constructor(private layoutService: LayoutService) { }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  async changePassword(): Promise<void> {
    if (this.passwordForm.valid) {
      var result = await this.accountService.updatePassword(this.passwordForm.value.currentPassword!, this.passwordForm.value.newPassword!);
      if (result) {
        this.router.navigate(['/']);
      }
    } else {
      this.passwordForm.markAllAsTouched();
      this.passwordForm.patchValue(this.passwordForm.value);
      this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: 'Preencha todos os campos corretamente.' });
    }
  }

}
