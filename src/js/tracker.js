import Map from './map.js';

export default class Tracker {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
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
        
        if (!this.form || !this.input || !this.button || !this.results || !this.loader || !this.map) return false;

        this.proxy = `https://cors.bridged.cc/`;
        this.apiLink = `https://geo.ipify.org/api/v1?apiKey=`;
        this.API_KEY = `at_ONQTCJNH3JIump9YwqOKBseCMpBIH`;
        this.ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        this.ipAddress = ``;
        this.formEnabled = false;
        
        return true;
    }
    
    setupEvents() {
        this.init();
        this.form.addEventListener('submit', () => {
            if (!this.formEnabled) return false;
            this.formValidation();
        })
    }
    
    // Validate user input and pass userInput value to fetchData function.
    formValidation() {
        this.userInput = this.input.value;
        if (!this.ipAddressRegex.test(this.userInput)) return false;
        
        this.loader.style.display = "flex";
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
                this.loader.style.display = "none";
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