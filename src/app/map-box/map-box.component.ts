import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { TripsLayer } from '@deck.gl/geo-layers';
import { MapboxLayer } from '@deck.gl/mapbox';
declare var deck: any;

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.sass']
})
export class MapBoxComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v10';
  

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

    const loopLength = (finish - start) + 200;
    const animationSpeed = 30;
    const timestamp = Date.now() / 1000;
    const loopTime = loopLength / animationSpeed;
    var currentTime;
    var before
    if (((timestamp % loopTime) / loopTime) * loopLength < (start - 200) || (start - 200)) {

      currentTime = ((timestamp % loopTime) / loopTime) * loopLength + (start - 200);
    }
    else {
      currentTime = ((timestamp % loopTime) / loopTime) * loopLength;
    }
    console.log("currentTime maldon" + currentTime)

    this.tripsLayer.setProps({ currentTime });
    this.animationFrame = requestAnimationFrame(this.animateMaldonTest.bind(this));

  }


}
