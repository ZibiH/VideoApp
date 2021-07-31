import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'add-video', pathMatch: 'full' },
  {
    path: 'add-video',
    loadChildren: () =>
      import('@shared/shared.module').then((module) => module.SharedModule),
  },
  {
    path: 'playlist',
    loadChildren: () =>
      import('@video-playlist/playlist.module').then(
        (module) => module.PlaylistModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
