"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            display: '',
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            },
            results: []
        };
        _this.print = _this.print.bind(_this);
        _this.format = _this.format.bind(_this);
        _this.start = _this.start.bind(_this);
        _this.step = _this.step.bind(_this);
        _this.calculate = _this.calculate.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.resetWatch = _this.resetWatch.bind(_this);
        _this.result = _this.result.bind(_this);
        _this.clear = _this.clear.bind(_this);
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "print",
        value: function print() {
            this.setState({
                display: this.format()
            });
        }
    }, {
        key: "format",
        value: function format() {
            var minutes = this.state.times.minutes;
            var seconds = this.state.times.seconds;
            var milliseconds = this.state.times.milliseconds;
            return pad0(minutes) + ":" + pad0(seconds) + ":" + pad0(Math.floor(milliseconds));
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            var running = this.state.running;
            if (!running) {
                this.setState({
                    running: true
                });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: "step",
        value: function step() {
            var running = this.state.running;
            if (!running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: "calculate",
        value: function calculate() {
            var milliseconds = this.state.times.milliseconds;
            var seconds = this.state.times.seconds;
            var minutes = this.state.times.minutes;

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
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
    }, {
        key: "resetWatch",
        value: function resetWatch() {
            this.setState({
                running: false,
                times: {
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0
                }
            });
        }
    }, {
        key: "result",
        value: function result() {
            var data = this.state.results;
            var dataEl = this.format(this.state.times);
            this.setState({
                results: [].concat(_toConsumableArray(data), [dataEl])
            });
        }
    }, {
        key: "clear",
        value: function clear() {
            this.setState({
                results: []
            });
        }
    }, {
        key: "render",
        value: function render() {
            var result = this.state.results.map(function (result, i) {
                return React.createElement(
                    "li",
                    { key: i },
                    result
                );
            });
            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "nav",
                    { className: "controls" },
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: this.start },
                        "Start"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: this.stop },
                        "Pause"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: this.resetWatch },
                        "Stop"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "stopwatch" },
                    this.format()
                ),
                React.createElement(
                    "a",
                    { href: "#", className: "button", id: "result", onClick: this.result },
                    "Result"
                ),
                React.createElement(
                    "a",
                    { href: "#", className: "button", id: "clearList", onClick: this.clear },
                    "Clear"
                ),
                React.createElement(
                    "ul",
                    { className: "results" },
                    result
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
