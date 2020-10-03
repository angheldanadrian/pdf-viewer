import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService as AuthGuard} from './auth-guard.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PdfViewComponent} from './pdf-view/pdf-view.component';

const routes: Routes = [
  {path: 'pdf-view', component: PdfViewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  // {path: '', redirectTo: 'pdf-view', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
