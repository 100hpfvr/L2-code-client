import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
// import { HelpDialogComponent } from '../../../modules/shared/help-dialog/help-dialog.component';
// import { HelpDialogContentComponent } from '../../../modules/shared/help-dialog-content/help-dialog-content.component';

interface Breadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './app.breadcrumb.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
})
export class AppBreadcrumbComponent {
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  public helpInfo: string = '';
  public public: string = '';
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: Breadcrumb[] = [];
        this.addBreadcrumb(root, [], breadcrumbs);

        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: Breadcrumb[]
  ) {
    const routeUrl = parentUrl.concat(route.url.map((url) => url.path));
    const breadcrumb = route.data['breadcrumb'];
    this.helpInfo = route.data['helpInfo'];
    const parentBreadcrumb =
      route.parent && route.parent.data
        ? route.parent.data['breadcrumb']
        : null;

    if (breadcrumb && breadcrumb !== parentBreadcrumb) {
      breadcrumbs.push({
        label: route.data['breadcrumb'],
        url: '/' + routeUrl.join('/'),
      });
    }

    if (route.firstChild) {
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }
}
