(function(w,d) {
    var TeamList = function (titleElem, descriptionElem, config, callback) {
        this.config = {
            speed: 4000,
            reverse: false,
            activeClass: 'active',
            activeElementTitle: '.team-person',
            activeElementDescription: '.team-person-item',
            event: 'click'
        };

        if (typeof titleElem == 'undefined') throw new TypeError("titleElem selector is undefined");
        if (typeof descriptionElem == 'undefined') throw new TypeError("descriptionElem selector is undefined");
        if (typeof config !== 'undefined' && config !== null) {
            if (typeof config.speed != 'undefined') this.config.speed =  config.speed;
            if (typeof config.reverse != 'undefined') this.config.reverse =  config.reverse;
            if (typeof config.activeCLass != 'undefined') this.config.activeCLass =  config.activeCLass;
            if (typeof config.activeElement != 'undefined') this.config.activeElement =  config.activeElement;
            if (typeof config.event != 'undefined' && ['click', 'mouseover'].indexOf(config.event) > -1) this.config.event =  config.event;
        }
        if (typeof callback === 'function') this.callback = callback;

        var $titleElem = document.querySelector(titleElem);
        var $descriptionElem = document.querySelector(descriptionElem);

        if ($titleElem == 'undefined') throw new TypeError("Element with selector was not found on the page");
        if ($descriptionElem == 'undefined') throw new TypeError("Element with selector was not found on the page");

        this.element = $titleElem;
        this.descriptionElement = $descriptionElem;

        this.init();
    };
    TeamList.prototype.callback = function (element) {};
    TeamList.prototype.init = function () {
        var itemsTitle,
            itemsDescription,
            self = this;

        itemsTitle = self.element.querySelectorAll(self.config.activeElementTitle);
        itemsDescription = self.descriptionElement.querySelectorAll(self.config.activeElementDescription);

        var names = [];
        var description = [];

        for(var i = 0, l = itemsTitle.length; i < l; i++) {
            names.push(itemsTitle[i]);
            description.push(itemsDescription[i]);
            itemsTitle[i].addEventListener(self.config.event, clickCallback);
        }
        this.names = names;
        this.description = description;

        function clickCallback (event) {
            var targetElem = event.srcElement || event.originTarget || event.target;
            self.setActive(targetElem, true);
            function passed() {}
            clearInterval(self.interval);
            setTimeout(passed, 5000);
            self.interval = setInterval(function (){
                self.setActive(getNext ());
            }, self.config.speed);
        }
        function getNext () {
            return self._getOffsetElement(self.config.reverse);
        }
        self.interval = setInterval(function (){
            self.setActive(getNext ());
        }, self.config.speed);
    };
    TeamList.prototype.setActive = function (targetElemObj, flag) {
        var self = this,
            names = self.names,
            activeElementsTitle,
            activeElementsDescription;

        function clearActive () {
            for( var i = 0, l = activeElementsTitle.length; i < l; i++ ) {
                activeElementsTitle[i].removeClass('active');
                activeElementsDescription[i].removeClass('active');
            }
        }
        activeElementsTitle = self.element.querySelectorAll('.' + self.config.activeClass);
        activeElementsDescription = self.descriptionElement.querySelectorAll('.' + self.config.activeClass);
        if (!flag) {
            if (typeof targetElemObj === 'undefined') return false;
            if (targetElemObj[0].hasClass(self.config.activeClass)) return;
            if (targetElemObj[1].hasClass(self.config.activeClass)) return;
            clearActive();
            targetElemObj[0].addClass(self.config.activeClass);
            targetElemObj[1].addClass(self.config.activeClass);

        } else {
            var newActiveDescription = names.indexOf(targetElemObj);
            clearActive();
            targetElemObj.addClass(self.config.activeClass);
            self.description[newActiveDescription].addClass(self.config.activeClass);
        }
    };
    TeamList.prototype._getOffsetElement = function (reverse) {

        var activeElementTitle,
            title,
            description,
            idx,
            nextIdx,
            self = this,
            arr;

        activeElementTitle = self.element.querySelector('.' + self.config.activeClass);
        title = self.names;
        description = self.description;
        idx = title.indexOf(activeElementTitle);

        var lenItems = title.length;
        nextIdx =  idx;
        nextIdx += (reverse) ? -1 : 1;

        nextIdx = (nextIdx > lenItems -1) ? 0 : nextIdx;
        nextIdx = (nextIdx < 0) ? lenItems-1: nextIdx;
        arr = [title[nextIdx], description[nextIdx]];
        return arr;
    };
    window.TeamList= TeamList;

})(window, document);


Node.prototype.hasClass = function (className) {
    if (this.classList) {
        return this.classList.contains(className);
    } else {
        return (-1 < this.className.indexOf(className));
    }
};

Node.prototype.addClass = function (className) {
    if (this.classList) {
        this.classList.add(className);
    } else if (!this.hasClass(className)) {
        var classes = this.className.split(" ");
        classes.push(className);
        this.className = classes.join(" ");
    }
    return this;
};

Node.prototype.removeClass = function (className) {
    if (this.classList) {
        this.classList.remove(className);
    } else {
        var classes = this.className.split(" ");
        classes.splice(classes.indexOf(className), 1);
        this.className = classes.join(" ");
    }
    return this;
};

(function(w, d) {

    var slider = new TeamList('#myTeam','#sliderContainer', {
        activeElementList: '.team-person',
        activeElementItem: '.team-person-item'
    }, function (item, prevItem) {});
    
}(window, document));