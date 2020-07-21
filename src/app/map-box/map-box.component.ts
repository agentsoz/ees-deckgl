import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { TripsLayer } from '@deck.gl/geo-layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import tripsFile from '../../assets/trips4.json'

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

  lat = -36.98126943803695;
  lng = 144.07470499995938;

  private tripsLayer: any

  private animationFrame: number;
  
  constructor(private mapService: MapService) { }

  ngOnInit() {
 
    this.initializeMap()
    //
    this.map.on('load', (event) => {
      this.addLayer()
    })

    //console.log("trips"+ tripsFile)
  
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
    const trips = await './assets/trips4.json'


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
    currentTime: 47800
    });
    this.map.addLayer(this.tripsLayer);
    this.animateMaldonTest()
  }
  animateMaldonTest(): void {
    // Replace this
    let start = 47200
    let finish = 50400

    if (this.animationStartTime == -1)//change this condition to true in first iteration
    {
      this.animationStartTime = Date.now()
    }
    const loopLength = (finish - start) + 200;
  
    const animationSpeed = 30
 
    const timestamp = ((Date.now() - this.animationStartTime) / 1000)
    const loopTime = loopLength / animationSpeed
    var currentTime;

    currentTime = ((timestamp % loopTime) / loopTime) * loopLength + start;
    //console.log("currentTime maldon" + currentTime)

    this.tripsLayer.setProps({ currentTime });
    this.animationFrame = requestAnimationFrame(this.animateMaldonTest.bind(this));

  }

  async loadFile(){

    this.animationStartTime = -1
    this.map.removeLayer("trips")
    await this.addLayer()
    console.log("here")
  
  }


}
