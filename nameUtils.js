var nameUtils = function () {
    this.supRE = /(\w+)(\.)(\d{6})(?:_r\d)?(\.)(s)(\d{3})(\.)(\w+)/i;

    // https://regex101.com/r/wH0xY2/2
    this.figureRE = /^(\w+)(\.)(\d{6})(?:_r\d)?(\.)([fb])(\d{3})(\.)(tif)/i;

    // https://regex101.com/r/cE6yJ3/3
    this.formatRE = /^(\w+)(\.)(\d{6})(?:_r\d)?(\.)(xml|pdf|json|mobi|epub)/i;

    this.articleRE = /^(\w+)(\.)(\d{6})(\.|_)/i;
};

nameUtils.prototype.joinCaptureGroups = function(re, name, start) {
    var m;
    var result = '';
    start = start || 1;
    if ((m = re.exec(name)) !== null) {
        for (var i=start; m[i]; i++) {
            result += m[i];
        }
    }
    return result;
};

nameUtils.prototype.reverse = function(s) {
    return s ? s.split('').reverse().join('') : '';
}

nameUtils.prototype.pref = function(name) {
    var m = this.articleRE.exec(name);
    return m ? this.reverse(m[3]) + '.' + m[1] : '';
}

nameUtils.prototype.suff = function(name) {
    if (this.isFormat(name)) {
        return this.formatSuffix(name);
    } else if (this.isFigure(name)) {
        return this.figureSuffix(name);
    } else {
        return this.supplementalSuffix(name);
    }
}

nameUtils.prototype.isValidAsset = function(name) {
    return this.isSupplemental(name) || this.isFigure(name) || this.isFormat(name);
}

nameUtils.prototype.journalTag = function(name) {
    var m = this.articleRE.exec(name);
    return m ? m[1] : '';
}

nameUtils.prototype.articleNumber = function(name) {
    var m = this.articleRE.exec(name);
    return m ? parseInt(m[3], 10) : 0;
}

nameUtils.prototype.isSupplemental = function(name) {
    return this.supRE.test(name);
};

nameUtils.prototype.supplementalName = function(name) {
    return this.joinCaptureGroups(this.supRE, name);
};

nameUtils.prototype.supplementalSuffix = function(name) {
    return this.joinCaptureGroups(this.supRE, name, 5);
}

nameUtils.prototype.isFigure = function(name) {
    return this.figureRE.test(name);
};

nameUtils.prototype.figureSuffix = function(name) {
    return this.joinCaptureGroups(this.figureRE, name, 5);
}

nameUtils.prototype.isFormat = function(name) {
    return this.formatRE.test(name);
};

nameUtils.prototype.formatName = function(name) {
    return this.joinCaptureGroups(this.formatRE, name);
};

nameUtils.prototype.formatSuffix = function(name) {
    return this.joinCaptureGroups(this.formatRE, name, 5);
}

module.exports = new nameUtils();

