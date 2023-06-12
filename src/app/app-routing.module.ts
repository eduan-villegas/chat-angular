import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/_services/auth.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'chat',
    canActivate:[AuthGuard],
    loadChildren:()=>import('./modules/chat-panel/chat-panel.module').then(m=>m.ChatPanelModule)
  },
  {
    path:'',
    redirectTo:'/chat',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
