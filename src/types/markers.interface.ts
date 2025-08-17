export interface MarkerData {
  id: number;
  name: string;
  street: string;
  is_open: string;
  image: string;
  phone_number: string,
  email: string,
  lat: number;
  lon: number;
  icon: any; 
  zoom: number;
  anchor?: { x: number; y: number };
}