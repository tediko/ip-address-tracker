import Map from './map.js';
import CollapseMenu from './collapseMenu';

export default class Tracker {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
        this.init();
    }

    vars() {
        this.selectors = {
            form: 'data-form',
            input: 'data-input',
            button: 'data-btn',
            results: 'data-result',
            loader: 'data-loader'
        }

        this.form = document.querySelector(`[${this.selectors.form}]`);
        this.input = document.querySelector(`[${this.selectors.input}]`);
        this.button = document.querySelector(`[${this.selectors.button}]`);
        this.results = document.querySelectorAll(`[${this.selectors.results}]`);
        this.loader = document.querySelector(`[${this.selectors.loader}]`);
        this.map = new Map();
        this.collapse = new CollapseMenu();
        
        if (!this.form || !this.input || !this.button || !this.results || !this.loader || !this.map) return false;

        this.proxy = `https://cors.bridged.cc/`;
        this.apiLink = `https://geo.ipify.org/api/v1?apiKey=`;
        this.API_KEY = `at_R0HafQ3Z5HCsAKIzRon7oFEXnSwp1`;
        this.ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        this.domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
        this.ipAddress = ``;
        this.formEnabled = false;
        
        return true;
    }
    
    setupEvents() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!this.formEnabled) return false;
            this.formValidation();
        })
    }
    
    // Validate user input and pass userInput value to fetchData function.
    formValidation() {
        this.userInput = this.input.value;
        this.ipTestRegex = this.ipAddressRegex.test(this.userInput);
        this.domainTestRegex = this.domainRegex.test(this.userInput);
        
        // Checking input for ip address or domain
        if (this.ipTestRegex) {
            this.userInput = this.input.value;
        } else if (this.domainTestRegex) {
            this.userInput = `&domain=${this.userInput}`;
        } else {
            return false;
        }

        this.collapse.disable();
        this.loader.style.display = "flex"; // <--- ANIMATION
        this.formEnabled = false;
        this.fetchData(this.userInput);
        this.form.reset();
    }

    // Fetching data from geo API.
    fetchData(ipAddress) {
        fetch(`${this.proxy}${this.apiLink}${this.API_KEY}&ipAddress=${ipAddress || this.ipAddress}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.formEnabled = true;
                this.cordX = data.location.lat;
                this.cordY = data.location.lng;
                this.loader.style.display = "none"; // <--- ANIMATION
                this.moveMapTo(this.cordX, this.cordY);
                this.changeContent(data)
            })
    }

    // Getting a data info and displaying it to [data-result] elements.
    changeContent(data) {
        this.ip = data.ip;
        this.region = data.location.region;
        this.city = data.location.city;
        this.postalCode = data.location.postalCode;
        this.timezone = data.location.timezone;
        this.isp = data.isp;

        this.results.forEach(result => {
            this.dataset = result.dataset.result;
            this.resultType = {
                'ip': `${this.ip}`,
                'location': `${this.city}, ${this.region} ${this.postalCode}`,
                'timezone': `UTC ${this.timezone}`,
                'isp': `${this.isp}`
            }

            result.innerHTML = `${this.resultType[this.dataset] ?? "Not found"}`;
        })
    }

    // Get user IP Address
    getUserIp() {
        fetch('https://www.cloudflare.com/cdn-cgi/trace')
        .then(res => res.text())
        .then(data => {
            let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
            this.ipAddress = data.match(ipRegex)[0];
            this.fetchData();
        })
    }

    // Moving map to given point with animation -
    // with build flyTo function on Map class.
    moveMapTo(mapX, mapY) {
        this.map.flyTo(mapX, mapY);
    }

    // Function to run on initial page load.
    init() {
        this.map.displayMap();
        this.getUserIp();
    }
}