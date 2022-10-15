import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './modules/auth/components/user/user.component';
import { AuthGuard } from './modules/auth/services';

const routes: Routes = [
  { path: 'whats-next', redirectTo: 'main/whats-next' },
  { path: 'stories', loadChildren: () => import('./modules/stories/stories.module').then(m => m.StoriesModule) },
  { path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule), canActivate: [AuthGuard] },
  { path: 'main', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
  { path: 'about', component: AboutComponent },
  { path: 'user/:uid', component: UserComponent },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: '404', loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule) },
  // The empty path matches everything that doesn't match an earlier path
  { path: '', redirectTo: 'main/home', pathMatch: 'full' },
  { path: 'renaissance', loadChildren: () => import('./modules/renaissance/renaissance.module').then(m => m.RenaissanceModule) },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
