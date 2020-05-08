import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }


}