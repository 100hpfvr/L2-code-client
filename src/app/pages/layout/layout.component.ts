import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppTopbarComponent} from './topbar/app.topbar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, AppTopbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {


}
