const urlParser = (formatString: string, urlInstance: string): Record<string, any> => {
    //splits the URL format string
    const formatParts = formatString.split('/');
    //splits the URL instance into
    const urlParts = urlInstance.split('/');

    const queryParams = new URLSearchParams(urlInstance.split('?')[1] || '');

    const result: Record<string, any> = {};
  
    for (let i = 0; i < formatParts.length; i++) {
        const formatPart = formatParts[i];
        const urlPart = urlParts[i];

        //iterates to extract the variable parts (those starting with ':') 
        if (formatPart.startsWith(':')) {
            const key = formatPart.substring(1);
            result[key] = urlPart;
        }
    }
    //creates hash key:value
    queryParams.forEach((value, key) => {
        result[key] = isNaN(parseInt(value)) ? value : parseInt(value);
    });
  
    return result;
};
  
const formatString = '/:version/api/:collection/:id';
const urlInstance = '/6/api/listings/3?sort=desc&limit=10';
  
const parsedData = urlParser(formatString, urlInstance);
console.log(parsedData);
  