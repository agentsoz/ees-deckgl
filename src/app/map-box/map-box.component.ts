import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { TripsLayer } from '@deck.gl/geo-layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var deck: any;

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.sass']
})
export class MapBoxComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v10';

  public animationStart: any;
  public animationFinish: any;
  public animationStartTime = -1
  public isPlaying = false
  public simulationStatus: string = "Play"
  public currentTime : any
  public animationSpeed = 30
  public Speed :number = this.animationSpeed
  public stop = false

  private _jsonURL = './assets/trips.json';
  

  lat = -36.98126943803695;
  lng = 144.07470499995938;

  private tripsLayer: any

  private animationFrame: number;
  
  constructor(private mapService: MapService, private http: HttpClient) { }

  ngOnInit() {
 
    this.initializeMap()
    //
    this.map.on('load', (event) => {
      this.addLayer()
    })
  
  }
  private initializeMap(){

    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 9,
      center: [144.07470499995938,-36.98126943803695], 
    });

   

    
   
  }
  private async addLayer()
  {
    //replace this
    const trips = await this._jsonURL
    
    this.getJSON().subscribe(data => {
      console.log("length"+ data.length);

      this.animationStart = data[data.length-1].start
      this.animationFinish = data[data.length-1].finish


    console.log("start+finish" + this.animationStart + ":"+ this.animationFinish )
    
    this.tripsLayer = new MapboxLayer({
    id: 'trips',
    type: TripsLayer,
    data: trips,
    getPath: d => d.path,
    getTimestamps: d => d.timestamps,
    getColor: d => (d.colours),
    opacity: 0.3,
    widthMinPixels: 2,
    rounded: true,
    trailLength: 80,
    currentTime: 0
    });
    this.map.addLayer(this.tripsLayer);
   
     });
  
  }
  animateMaldonTest(): void {
    // Replace this
    if (this.animationStartTime == -1)//change this condition to true in first iteration
    {
      this.animationStartTime = Date.now()
    }
    const loopLength = this.animationFinish - this.animationStart
  
    const timestamp = ((Date.now() - this.animationStartTime) / 1000)
    const loopTime = loopLength / this.animationSpeed
    var currentTime;

    this.currentTime = ((timestamp % loopTime) / loopTime) * loopLength + this.animationStart;
    //console.log("currentTime maldon" + currentTime)

    currentTime = this.currentTime
    if(!this.stop){
    this.tripsLayer.setProps({ currentTime });
    this.animationFrame = requestAnimationFrame(this.animateMaldonTest.bind(this));
    }

  }
  stopAnimation(){

    var temp = this.currentTime
    var currentTime = temp

    this.tripsLayer.setProps({ currentTime });
    this.animationFrame = requestAnimationFrame(this.stopAnimation.bind(this));
  }

  async loadFile(){

    await this.map.removeLayer("trips")
    this.animationStartTime = -1
    
    await this.addLayer()
  
  }
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  playSimulation() {
  
    if (this.isPlaying) {

      this.isPlaying = false
      this.stop = true
      this.simulationStatus = "Play"
      this.stopAnimation()
      //console.log("here")

    }
    else {

      this.isPlaying = true
      this.stop = false
      this.simulationStatus = "Pause"
      this.animateMaldonTest()

    }
    // if(this.currentJob.animateMaldonTest())
    

  }
  setAnimationSpeed(event) {

    this.animationSpeed = this.Speed
  }


}
