export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface Bounds {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Geometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Viewport;
}

export interface GeocodeResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

export interface GeocodeResponse {
  results: GeocodeResult[];
  status: string;
}
