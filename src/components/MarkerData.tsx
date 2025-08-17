import { MarkerData } from "../types/markers.interface";
import { RegionInt } from "../types/region.interface";

export const initialRegion: RegionInt = {
    lat: 54.962905,
    lon: 73.359169,
    zoom: 1,
    azimuth: 0,
    tilt: 0
};

export const AllMarker: MarkerData[] = [
		{ id: 1, name: 'DFS Лермонтова', street: 'ул. Лермонтова, 20', is_open: 'пн - вс 10:00–21:00', image: 'https://dfs.market/upload/iblock/553/onk226abz3gcuteyivwfqlhbniua9613/lermo.jpg', phone_number: '+7 (950) 338-03-09', email: 'info@dfsgroup.info', lat: 54.981588, lon: 73.381615, icon: require('../../src/assets/dfs.png'), zoom: 17 },
		{ id: 2, name: 'DFS 70 лет октября', street: 'ул. 70 лет Октября', is_open: 'пн - вс 10:00–21:00', image: 'https://dfs.market/upload/iblock/e9b/ws5v51l7sijos5md9ot0qlmimhpocrww/омск_2.jpg', phone_number: '+7 (950) 338-03-09', email: 'info@dfsgroup.info', lat: 54.982156, lon: 73.321976, icon: require('../../src/assets/dfs.png'), zoom: 17},
		{ id: 3, name: 'DFS Терминал', street: 'просп. Мира, 9Б', is_open: 'пн - вс 10:00–21:00', image: 'https://dfs.market/upload/iblock/a58/3zcietrkoli8b9mewx7hhrgudce9t4lu/DSCF7285.jpg', phone_number: '+7 (950) 338-03-09', email: 'info@dfsgroup.info', lat: 55.024786, lon: 73.294784, icon: require('../../src/assets/dfs.png'), zoom: 17 },
]