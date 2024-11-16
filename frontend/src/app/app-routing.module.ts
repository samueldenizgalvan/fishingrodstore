import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'users-admin',
    loadChildren: () => import('./users-admin/users-admin.module').then( m => m.UsersAdminPageModule)
  },
  {
    path: 'products-admin',
    loadChildren: () => import('./products-admin/products-admin.module').then( m => m.ProductsAdminPageModule)
  },
  {
    path: 'add-photo',
    loadChildren: () => import('./add-photo/add-photo.module').then( m => m.AddPhotoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
