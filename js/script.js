class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            display: '',
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            },
            results: []
        }
        this.print = this.print.bind(this);
        this.format = this.format.bind(this);
        this.start = this.start.bind(this);
        this.step = this.step.bind(this);
        this.calculate = this.calculate.bind(this);
        this.stop = this.stop.bind(this);
        this.resetWatch = this.resetWatch.bind(this);
        this.result = this.result.bind(this);
        this.clear = this.clear.bind(this);
    }
    print() {
        this.setState({
            display: this.format()
        });
    }   
    format() {
        let minutes = this.state.times.minutes;
        let seconds = this.state.times.seconds;
        let milliseconds = this.state.times.milliseconds;
        return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(milliseconds))}`;
    }
    start() {
        const running = this.state.running;
        if (!running) {
            this.setState ({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10)
        }
    }
    step() {
        const running = this.state.running;
        if (!running) return;
        this.calculate();
        this.print();
    }
    calculate() {
        let milliseconds = this.state.times.milliseconds;
        let seconds = this.state.times.seconds;
        let minutes = this.state.times.minutes;

        milliseconds += 1;
        if (milliseconds >= 100) {
            seconds += 1;
            milliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState({
            times: {
                minutes: minutes,
                seconds: seconds,
                milliseconds: milliseconds
            }
        })
    }
    stop() {
        this.setState({
            running: false
        });      
        clearInterval(this.watch);
    }
    resetWatch() {
        this.setState({
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }     
        });
    }
   result() {
       let data = this.state.results;
       let dataEl = this.format(this.state.times);
        this.setState({
            results: [...data, dataEl]
        });
    }
    clear() {
        this.setState({
            results: []
        })
    }
    render() {
        const result = this.state.results.map((result, i) => <li key={i}>{result}</li>);
        return (
            <div className="container">
                <nav className="controls">
                    <a href="#" className="button" onClick={this.start}>Start</a>
                    <a href="#" className="button" onClick={this.stop}>Pause</a>
                    <a href="#" className="button" onClick={this.resetWatch}>Stop</a>
                </nav>
                <div className="stopwatch">{this.format()}</div>
                <a href="#" className="button" id="result" onClick={this.result}>Result</a>
                <a href="#" className="button" id="clearList" onClick={this.clear}>Clear</a>
                <ul className="results">{result}</ul>
            </div>
        )
    }
}
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById('app'));