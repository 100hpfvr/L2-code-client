import { Component, ElementRef, OnInit, computed, inject, signal } from '@angular/core';
import { LayoutService } from '../app.layout.service';
import { Router, RouterLink } from '@angular/router';

import { AvatarPhotoPlaceholderComponent } from './avatar-photo-placeholder/avatar-photo-placeholder.component';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import {AuthStore} from "../../../core/auth/auth.store";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
    styleUrl: './app.sidebar.component.scss',
    imports: [RouterLink, AvatarPhotoPlaceholderComponent, MenuModule, ToastModule]
})

export class AppSidebarComponent implements OnInit {
  items = [
    {
      label: 'Alterar senha',
      icon: 'pi pi-lock',
      routerLink: '/auth/nova-senha',
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    }
  ];

  readonly authStore = inject(AuthStore);

  name = computed(() => 'teste');

  constructor(public layoutService: LayoutService, public el: ElementRef, public router: Router) {

  }
  ngOnInit(): void {

  }

  logout() {
    this.router.navigate(['/auth/login']);
  }
}
