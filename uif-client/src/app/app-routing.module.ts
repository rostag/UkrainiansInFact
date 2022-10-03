import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './modules/auth/services';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule), canActivate: [AuthGuard] },
  { path: 'stories', loadChildren: () => import('./modules/stories/stories.module').then(m => m.StoriesModule), canActivate: [AuthGuard] },
  { path: 'main', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: '404', loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule) },
  // Process routes from landing page
  { path: 'app.html', redirectTo: 'main/whats-next', pathMatch: 'full' },
  { path: 'app.html/whats-next', redirectTo: 'main/whats-next', pathMatch: 'full' },
  { path: 'app.html/stories', redirectTo: 'stories', pathMatch: 'full' },
  // The empty path matches everything that doesn't match an earlier path
  { path: '', redirectTo: 'main/whats-next', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
