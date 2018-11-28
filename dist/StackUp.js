"use strict";
exports.__esModule = true;
var StackUp = (function () {
    function StackUp(properties) {
        var _this = this;
        this.boundaryHeight = 0;
        this.boundaryWidth = 0;
        this.containerHeight = 0;
        this.containerWidth = 0;
        this.numberOfColumns = 0;
        this.layoutColumnPointer = 0;
        this.layout = {
            ordinal: {
                setup: function () {
                    var i = 0;
                    _this.layoutStack['ordinal'] = new Array;
                    while (i < _this.numberOfColumns) {
                        _this.layoutStack['ordinal'][i] = 0;
                    }
                },
                plot: function (itemIndex) {
                    _this.items[itemIndex][2] =
                        _this.config.gutter + (_this.config.columnWidth + _this.config.gutter) * _this.layoutColumnPointer;
                    _this.items[itemIndex][3] = _this.config.gutter + _this.layoutStack['ordinal'][_this.layoutColumnPointer];
                    _this.layoutStack['ordinal'][_this.layout.columnPointer] += _this.items[itemIndex][1] + _this.config.gutter;
                    if (_this.layoutStack['ordinal'][_this.layout.columnPointer] > _this.containerHeight) {
                        _this.containerHeight = _this.layoutStack['ordinal'][_this.layoutColumnPointer];
                    }
                    _this.layoutColumnPointer++;
                    if (_this.layoutColumnPointer >= _this.numberOfColumns) {
                        _this.layoutColumnPointer = 0;
                    }
                },
                loop: function () {
                    var i = 0;
                    while (i < _this.items.length) {
                        _this.layout['ordinal'].plot(i).bind(_this);
                        i++;
                    }
                }
            },
            optimized: {
                setup: function () {
                    var i = 0;
                    while (i < _this.numberOfColumns) {
                        _this.layoutStack['optimized'][i] = [i, 0];
                        i++;
                    }
                },
                plot: function (itemIndex) {
                    _this.items[itemIndex][2] =
                        _this.config.gutter + (_this.config.columnWidth + _this.config.gutter) * _this.layoutStack['optimized'][0][0];
                    _this.items[itemIndex][3] = _this.config.gutter + _this.layoutStack['optimized'][0][1];
                    _this.layoutStack['optimized'][0][1] += _this.items[itemIndex][1] + _this.config.gutter;
                    if (_this.layoutStack[0][1] > _this.containerHeight) {
                        _this.containerHeight = _this.layoutStack['optimized'][0][1];
                    }
                    _this.layoutStack['optimized'].sort(function (a, b) { return a[1] - b[1]; });
                    _this.layoutColumnPointer++;
                    if (_this.layoutColumnPointer >= _this.numberOfColumns) {
                        _this.layoutColumnPointer = 0;
                    }
                },
                loop: function () {
                    var i = 0;
                    while (i < _this.items.length) {
                        _this.layout['optimized'].plot(i).bind(_this);
                        i++;
                    }
                }
            }
        };
        this.setDefaultConfig();
        this.setConfig(properties);
    }
    StackUp.prototype.setDefaultConfig = function () {
        this.config = {
            boundaryElement: window,
            columnWidth: 320,
            containerSelector: undefined,
            gutter: 18,
            isFluid: false,
            itemsSelector: undefined,
            layout: 'ordinal',
            numberOfColumns: 3,
            resizeDebounceDelay: 350,
            moveItem: function (item, left, top, callback) {
                item.style.left = left + 'px';
                item.style.top = top + 'px';
                callback();
            },
            scaleContainer: function (container, width, height, callback) {
                container.style.height = height + 'px';
                container.style.width = width + 'px';
                callback();
            }
        };
        return this;
    };
    StackUp.prototype.setConfig = function (config) {
        for (var name_1 in config) {
            this.config[name_1] = config[name_1];
        }
        return this;
    };
    StackUp.prototype.initialize = function () {
        window.addEventListener('resize', this.resizeHandler.bind(this));
        this.boundaryUpdate();
        this.getElements()
            .populateItems();
        this.updateNumberOfColumns()
            .applyLayout()
            .draw();
        return this;
    };
    StackUp.prototype.boundaryUpdate = function () {
        if (this.config.boundaryElement !== window) {
            var style = window.getComputedStyle(this.config.boundaryElement);
            var horizontalPaddings = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            var verticalPaddings = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
            this.boundaryHeight = this.config.boundaryElement.offsetHeight - verticalPaddings;
            this.boundaryWidth = this.config.boundaryElement.offsetWidth - horizontalPaddings;
        }
        else {
            this.boundaryHeight = window.innerHeight;
            this.boundaryWidth = window.innerWidth;
        }
        return this;
    };
    StackUp.prototype.resizeDebounce = function (fn, delay) {
        clearTimeout(this.resizeDebounceTimeout);
        this.resizeDebounceTimeout = window.setTimeout(fn, delay);
    };
    StackUp.prototype.resizeComplete = function () {
        if (this.calculateNumberOfColumns() !== this.numberOfColumns &&
            this.config.isFluid === true) {
            this.restack();
        }
    };
    StackUp.prototype.resizeHandler = function () {
        this.boundaryUpdate();
        this.resizeDebounce(this.resizeComplete.bind(this), this.config.resizeDebounceDelay);
    };
    StackUp.prototype.getElements = function () {
        this.containerElement = document.querySelector(this.config.containerSelector);
        this.itemElements = document.querySelectorAll("#{this.config.containerSelector} > #{this.config.itemsSelector}");
        return this;
    };
    StackUp.prototype.appendItem = function (item) {
        item.style.width = "#{@config.columnWidth}px";
        this.items.push({
            element: item,
            height: item.offsetHeight,
            left: 0,
            top: 0
        });
        return this;
    };
    StackUp.prototype.populateItems = function () {
        this.items = new Array;
        var i = 0;
        while (i < this.itemElements.length) {
            this.appendItem(this.itemElements[i]);
            i++;
        }
        return this;
    };
    StackUp.prototype.calculateNumberOfColumns = function () {
        var numberOfColumns = 0;
        if (this.config.isFluid) {
            var numberOfColumns_1 = Math.floor((this.boundaryWidth - this.config.gutter) / (this.config.columnWidth + this.config.gutter));
        }
        else {
            numberOfColumns = this.config.numberOfColumns;
        }
        if (numberOfColumns > this.items.length) {
            numberOfColumns = this.items.length;
        }
        if (this.items.length && numberOfColumns <= 0) {
            numberOfColumns = 1;
        }
        return numberOfColumns;
    };
    StackUp.prototype.updateNumberOfColumns = function () {
        this.numberOfColumns = this.calculateNumberOfColumns();
        return this;
    };
    StackUp.prototype.draw = function () {
        var _this = this;
        this.containerWidth = (this.config.columnWidth + this.config.gutter) * this.numberOfColumns;
        var height = this.containerHeight + this.config.gutter;
        var width = this.containerWidth + this.config.gutter;
        this.config.scaleContainer(this.containerElement, width, height, function () {
            var callback = function () { };
            var i = 0;
            while (i < _this.items.length) {
                _this.config.moveItem(_this.items[i].element, _this.items[i].left, _this.items[i].top, callback);
                i++;
            }
        });
        return this;
    };
    StackUp.prototype.applyLayout = function () {
        this.layout[this.config.layout].setup().bind(this);
        if (this.items.length) {
            this.layout[this.config.layout].loop().bind(this);
        }
        return this;
    };
    StackUp.prototype.resetLayout = function () {
        this.containerHeight = 0;
        this.layoutColumnPointer = 0;
        return this;
    };
    StackUp.prototype.reset = function () {
        this.containerWidth = 0;
        this.containerHeight = 0;
        this.items = new Array;
        this.getElements()
            .populateItems()
            .resetLayout()
            .restack();
        return this;
    };
    StackUp.prototype.append = function (item, callback) {
        var itemIndex = this.items.length;
        this.appendItem(item);
        if (this.calculateNumberOfColumns() === this.numberOfColumns) {
            this.layout[this.config.layout].plot(itemIndex).bind(this);
            this.draw();
        }
        else {
            this.restack();
        }
        return this;
    };
    StackUp.prototype.restack = function () {
        this.updateNumberOfColumns()
            .resetLayout()
            .applyLayout()
            .draw();
        return this;
    };
    return StackUp;
}());
exports.StackUp = StackUp;
this.StackUp = StackUp;
//# sourceMappingURL=StackUp.js.map