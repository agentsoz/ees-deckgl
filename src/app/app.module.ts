import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapBoxComponent } from './map-box/map-box.component';
import {MapService} from './map.service';
import { FileDropComponent } from './file-drop/file-drop.component'
//import { NgxFileDropModule } from 'ngx-file-drop';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    MapBoxComponent,
    FileDropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
