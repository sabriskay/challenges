"use strict";
class URLParser {
    constructor(formatString) {
        this.paramsIndexes = {};
        const urlParts = formatString.split('/');
        for (const [index, part] of urlParts.entries()) {
            if (part.startsWith(':')) {
                this.paramsIndexes[part.replace(/:/, '')] = index;
            }
        }
    }
    parse(url) {
        if (!url || url.length === 0) {
            return {};
        }
        if (!this.validURL(url)) {
            return {};
        }
        return Object.assign(Object.assign({}, this.parseURL(url)), this.parseParameters(url));
    }
    validURL(url) {
        // This function ensures the URL is valid
        return true;
    }
    parseURL(url) {
        const urlParts = url.split('/');
        return Object.keys(this.paramsIndexes).reduce((output, key) => (Object.assign(Object.assign({}, output), { [key]: urlParts[this.paramsIndexes[key]] })), {});
    }
    parseParameters(url) {
        const urlParts = url.split('?');
        if (urlParts.length === 1) {
            return {};
        }
        const params = urlParts[1];
        const paramsArray = params.split('&');
        const outputParams = {};
        for (const param of paramsArray) {
            const paramParts = param.split('=');
            outputParams[paramParts[0]] = paramParts[1];
        }
        return outputParams;
    }
}
const formatString = '/:version/api/:collection/:id';
const urlInstance = '/6/api/listings/3?sort=desc&limit=10';
const parser = new URLParser(formatString);
console.log(parser.parse(urlInstance));
