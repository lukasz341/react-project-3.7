class Stopwatch extends React.Component {
    constructor(props) {
		super(props);
		this.watch = null;	
    	this.state = {
  			running: false,
  			times: {
    			minutes: 0,
				seconds: 0,
    			miliseconds: 0
			}
		};			
    }

    reset() {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	format(times) {
		function pad0(value) {
			let result = value.toString();
			if (result.length < 2) {
				result = '0' + result;
			}
			return result;
		}
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
	
	start() {
    	if (!this.state.running) {
        	this.setState({
				running: true
			});
        	this.watch = setInterval(() => this.step(), 10);
    	}
	}
	
	step() {
    	if (!this.state.running) return;
    	this.calculate();
	}
	
	calculate() {
		this.setState(prevState => {
			prevState.times.miliseconds += 1;

			if (prevState.times.miliseconds >= 100) {
				prevState.times.seconds += 1;
				prevState.times.miliseconds = 0;
			}	

			if (prevState.times.seconds >= 60) {
				prevState.times.minutes += 1;
				prevState.times.seconds = 0;
			}

			return prevState;
		});
	}
	
	stop() {
    	this.setState({
			running: false
		});

    	clearInterval(this.watch);
	}
	
	render() {	
        const styles = {
            margin: '0 auto',
            textAlign: 'center',           
        };
		
		return (
        	<div style={styles}>
                <h1>Stoper</h1>   
				<p>{ this.format(this.state.times) }</p>
                <a onClick={this.start.bind(this)}>Start</a>
                <a onClick={this.stop.bind(this)}>Stop</a>
				<a onClick={this.reset.bind(this)}>Reset</a>            
          </div>
        );
	}
}

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById('stopwatch'));