import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../app.layout.service';
import { SidebarModule } from 'primeng/sidebar';
import {AuthData} from '../../../../core/auth/models/auth-data';

@Component({
  selector: 'app-profilemenu',
  templateUrl: './app.profilesidebar.component.html',
  standalone: true,
  imports: [SidebarModule],
})
export class AppProfileSidebarComponent implements OnInit {
  authData: AuthData | null = null;

  constructor(public layoutService: LayoutService, private route: Router) {}

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }

  navigate(url: string) {
    this.route.navigate([url]);
    this.visible = false;
  }

  ngOnInit(): void {
    //this.authData = this.authService.getAuthData();
  }

  logout() {
    //this.authService.removeSession();
    //this.route.navigate(['/auth/login']);
  }
}
