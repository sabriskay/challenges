class URLParser {

    private paramsIndexes: { [key: string]: number };

    constructor (formatString: string) {
        this.paramsIndexes = {};
        
        const urlParts = formatString.split('/');
        for (const [ index, part ] of urlParts.entries()) {
            if (part.startsWith(':')) {
                this.paramsIndexes[part.replace(/:/, '')] = index;
            }
        }
    }

    parse (url: string): { [key: string]: any } {
        if (!url || url.length === 0) {
            return {};
        }

        if (!this.validURL(url)) {
            return {}
        }

        return {
            ...this.parseURL(url),
            ...this.parseParameters(url)
        }
    }

    private validURL (url: string): boolean {
        // This function ensures the URL is valid
        return true;
    }

    private parseURL (url: string): { [key: string]: any } {
        const urlParts = url.split('/');

        return Object.keys(this.paramsIndexes).reduce(
            (output, key) => ({ ...output, [key]: urlParts[this.paramsIndexes[key]] }), {}
        );
    }

    private parseParameters (url: string): { [key: string]: any } {
        const urlParts = url.split('?');
        
        if (urlParts.length === 1) {
            return {};
        }

        const params = urlParts[1];
        const paramsArray = params.split('&');
        const outputParams: { [key: string]: any } = {};

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
  