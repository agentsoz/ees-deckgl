import { Component, OnInit } from '@angular/core';
//import * as fs from 'fs';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.sass']
})
export class FileDropComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  //public files: NgxFileDropEntry[] = [];

  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

}
