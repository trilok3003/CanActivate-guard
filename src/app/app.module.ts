import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterModule,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
class UserToken {}
class Permissions {
  canActivate(user: UserToken, id: string): boolean {
    return true;
  }
}
@Injectable()
class CanActivateTeam implements CanActivate {
  constructor(
    private permissions: Permissions,
    private currentUser: UserToken
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.permissions.canActivate(this.currentUser, route.params.id);
  }
}
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'app',
        component: AppComponent,
        canDeactivate: [CanActivateTeam],
      },
      {
        path: 'hello/:id',
        component: HelloComponent,
        canActivate: [CanActivateTeam],
      },
      { path: '', redirectTo: 'hello/2', pathMatch: 'full' },
    ]),
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [CanActivateTeam, UserToken, Permissions],
})
export class AppModule {}
