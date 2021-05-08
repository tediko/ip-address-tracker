export default class CollapseMenu {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }
    
    vars() {
        this.selectors = {
            button: 'data-expand',
            results: 'data-results-container',
            openClass: 'open',
            closeClass: 'close'
        };

        this.button = document.querySelector(`[${this.selectors.button}]`);
        this.results = document.querySelector(`[${this.selectors.results}]`);
        
        if (!this.button || !this.results) return false;

        this.expanded = this.button.getAttribute('aria-expanded') === 'false' ? false : true;
        this.open = false;
        this.timer = false;
        this.duration = 500;
        return true;
    }

    // Hamburger event listener
    setupEvents() {
        this.button.addEventListener('click', () => this.toggle());
    }

    // Toggle hamburger menu
    toggle() {
        !this.open ? this.show() : this.hide();
    }

    // Animation while hamburger is open
    show() {
        this.button.style.pointerEvents = "none";

        this.results.classList.add('close');

        this.expanded = !this.expanded;
        this.button.setAttribute('aria-expanded', this.expanded);
        this.open = true;
        
        this.timer = window.setTimeout(() => {
            this.button.style.pointerEvents = "all";
            this.timer = false;
        }, this.duration);
    }

    // Animation while hamburger is closed
    hide() {
        this.button.style.pointerEvents = "none";

        this.results.classList.add('open');
        
        this.expanded = !this.expanded;
        this.button.setAttribute('aria-expanded', this.expanded);

        this.timer = window.setTimeout(() => {
            this.results.classList.remove('open');
            this.results.classList.remove('close');
            this.button.style.pointerEvents = "all";
            this.timer = false;
        }, this.duration);
        this.open = false;
    }

    disable() {
        this.results.classList.remove('open');
        this.results.classList.remove('close');
        this.button.style.pointerEvents = "all";
    }
}