import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services';

const routes: Routes = [
  { path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'stories', loadChildren: () => import('./modules/stories/stories.module').then(m => m.StoriesModule) },
  { path: 'main', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: '404', loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule) },
  // The empty path matches everything that doesn't match an earlier path:
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', redirectTo: '/main/notes', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
