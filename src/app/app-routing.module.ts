import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapBoxComponent } from './map-box/map-box.component'

const routes: Routes = [
  {
    path: '',
    component: MapBoxComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
