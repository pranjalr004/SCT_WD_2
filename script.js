// script.js
class Stopwatch {
    constructor() {
        // DOM elements
        this.hoursDisplay = document.getElementById('hours');
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.millisecondsDisplay = document.getElementById('milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapList = document.getElementById('lapList');

        // Stopwatch state
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.interval = null;
        this.lapCount = 0;

        // Bind event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.lap());
    }

    start() {
        if (!this.interval) {
            this.interval = setInterval(() => this.updateTime(), 10);
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.lapBtn.disabled = false;
            document.querySelector('.stopwatch').classList.add('running');
        }
    }

    pause() {
        clearInterval(this.interval);
        this.interval = null;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        document.querySelector('.stopwatch').classList.remove('running');
    }

    reset() {
        this.pause();
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.lapCount = 0;
        this.updateDisplay();
        this.lapList.innerHTML = '';
        this.lapBtn.disabled = true;
    }

    lap() {
        this.lapCount++;
        const lapTime = this.formatTime();
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span>Lap ${this.lapCount}</span>
            <span>${lapTime}</span>
        `;
        this.lapList.insertBefore(lapItem, this.lapList.firstChild);
    }

    updateTime() {
        this.milliseconds += 10;
        if (this.milliseconds === 1000) {
            this.milliseconds = 0;
            this.seconds++;
            if (this.seconds === 60) {
                this.seconds = 0;
                this.minutes++;
                if (this.minutes === 60) {
                    this.minutes = 0;
                    this.hours++;
                }
            }
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.millisecondsDisplay.textContent = this.padNumber(Math.floor(this.milliseconds / 10));
        this.secondsDisplay.textContent = this.padNumber(this.seconds);
        this.minutesDisplay.textContent = this.padNumber(this.minutes);
        this.hoursDisplay.textContent = this.padNumber(this.hours);
    }

    formatTime() {
        return `${this.padNumber(this.hours)}:${this.padNumber(this.minutes)}:${this.padNumber(this.seconds)}.${this.padNumber(Math.floor(this.milliseconds / 10))}`;
    }

    padNumber(number) {
        return number.toString().padStart(2, '0');
    }
}

// Initialize the stopwatch
const stopwatch = new Stopwatch();