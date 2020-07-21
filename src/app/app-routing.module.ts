import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapBoxComponent } from './map-box/map-box.component'
import {FileDropComponent} from './file-drop/file-drop.component'

const routes: Routes = [
  {
    path: '',
    component: MapBoxComponent
},
{
  path: 'fileupload',
  component: FileDropComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
