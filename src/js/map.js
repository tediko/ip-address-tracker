import * as leaflet from 'leaflet';

export default class Map {
    constructor() {
        this.setupEvents();
    }

    setupEvents() {
        /* this.displayMap() */
    }

    createMap() {
        this.map = leaflet.map('mapid', {
            center: [41.381747, 2.121447],
            zoom: 13
        });
    }

    createLayer() {
        leaflet.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(this.map); 
    }

    createIcon() {
        this.icon = leaflet.icon({
            iconUrl: 'img/i-location.svg',
            iconSize: [46, 56]
        });
    }

    createMarker() {
        this.marker = leaflet.marker([41.381747, 2.121447], {icon: this.icon})
        .addTo(this.map)
        .bindPopup('We are here!');
    }

    displayMap() {
        this.createMap();
        this.createLayer();
        this.createIcon();
        this.createMarker();
    }

    flyTo(mapX, mapY) {
        this.map.flyTo([mapX, mapY], 13);
        this.map.removeLayer(this.marker);

        this.newMarker = leaflet.marker([mapX, mapY], {icon: this.icon})
            .addTo(this.map)
            .bindPopup('We are here!');
    }
}