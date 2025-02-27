import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { Message } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { CreateSessionResults } from '../../../core/auth/models/creation-session-results';
import { ButtonModule } from 'primeng/button';
import { LoginFormComponent } from './login-form/login-form.component';
import { environment } from '../../../../environments/environment';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AuthStore } from '../../../core/auth/auth.store';

@Component({
  selector: 'login-container',
  standalone: true,
  imports: [ButtonModule, RouterLink, LoginFormComponent, MessagesModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected canContinue: boolean = false;
  protected loginTitle: string = environment.loginTitle;
  protected msgs = signal<Message[]>([]);

  private authStore = inject(AuthStore);

  constructor(router: Router) {
    // lembrar que effect é sempre executado quando o componente é carregado.
    effect(
      () => {
        if (this.authStore.isAuthenticated()) {
          router.navigate(['/']);
        } else if (this.authStore.createSessionResult() != null) {
          let result = this.authStore.createSessionResult();
          if (result != null) {
            this.showMessage(result);
          }
        }
      },
      { allowSignalWrites: true }
    );
  }
  private showMessage(result: CreateSessionResults | null) {
    if (result) {
      this.msgs.set([
        {
          severity: 'error',
          detail: this.getMessage(result as CreateSessionResults),
        },
      ]);
    } else {
      this.msgs.set([]);
    }
  }

  protected onSubmit(values: { identifier: string; password: string }) {
    this.authStore.createSession({
      identifier: values.identifier,
      password: values.password,
    });
  }

  private getMessage(result: CreateSessionResults): string {
    switch (result) {
      case CreateSessionResults.InvalidCredentials:
        return 'Dados de autenticação inválidos!';
      case CreateSessionResults.IdentifierNotFound:
        return 'Entidade inexistente!';
      case CreateSessionResults.AccessForbidden:
        return 'Entidade sem acesso!';
      case CreateSessionResults.ProviderBloqued:
        return 'Entidade bloqueada!';
      case CreateSessionResults.ProviderInactive:
        return 'Entidade Inativa!';
      case CreateSessionResults.ApplicationNotSupported:
        return 'Aplicação não suportada';
      case CreateSessionResults.ProviderWithPasswordChangePending:
        return 'Entidade pendente de troca de senha';
      default:
        return 'Erro desconhecido';
    }
  }
}
