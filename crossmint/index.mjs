import https from 'node:https';
import got from 'got';
import async from 'async';

/**
 * keepAlive is enabling because the application relies on making many HTTPS calls
 */
https.globalAgent = new https.Agent({ keepAlive:true });

const HOST_NAME = 'https://challenge.crossmint.io/api';

/**
 * IMPORTANT: All APIs take a required parameter 'candidateId'
 */
const CANDIDATE_ID = 'fbeec9d3-4938-4fa3-9580-37c0edeeb4c9';

const DIRECTIONS = [
    'LEFT',
    'RIGHT',
    'UP',
    'DOWN'
];

const COLORS = [
    'BLUE',
    'RED',
    'WHITE',
    'PURPLE'
];

/**
 * This queue sends requests with the information to communicate with the API.
 * If any task fails, it is pushed again to the queue to send the request again
 * The process is completed after the queue is emptied.
 */
const queue = async.queue(async (task, completed) => {
    const remaining = queue.length();
    try {
        await request(task.url, task.options);
        console.log('Finish');
    } catch (error) {
        queue.push(task) 
    }
    completed(null, {task, remaining})
}, 1);

/**
 * This function fetches the response from the API. 
 * It is prepared to work with any method (GET, DELTE, POST..)
 * @param {string} URL 
 * @param {object} options 
 * @returns 
 */
async function request (URL, options = {}) {
    options = {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body,
    }
    
    const response = got[options.method.toLowerCase()](URL, {
        json: options.body
    });

    return await response.json();
}

/**
 * This function returns a goal with each entity inside
 * @returns object[Array]
 */
async function fetchCurrentMap() {
    return (await request(`${HOST_NAME}/map/${CANDIDATE_ID}/goal`));
}

/**
 * This function prepares the structure to aggregate it on a 
 * queue with all the data that need to create a new entity 
 * on an API
 * @param {object} options 
 */
async function createEntity(options) {
    const body = {
        row: options.row, 
        column: options.column, 
        candidateId: CANDIDATE_ID
    }

    if (options.direction) {
        body.direction = options.direction
    }

    if (options.color) {
        body.color = options.color
    }

    queue.push({
        url: `${HOST_NAME}/${options.name}`,
        options: {
        method: 'POST',
        body
    }});
}

/**
 * This function prepares the structure to aggregate it on a 
 * queue with all the data that need to remove a new entity 
 * from an API
 * @param {number} row 
 * @param {number} column
 * @param {string} name
 */
async function clearCell(row, column, name) {
    const body = {
        row, column, candidateId:CANDIDATE_ID
    }

    queue.push({
        url: `${HOST_NAME}/${name}`,
        options: {
            method: 'DELETE',
            body
        }
    });

}

(async () => {
    const { goal } = await fetchCurrentMap(); //Use the goal results to create a new Megaverse

    for (let row = 0; row < goal?.length; row++) {
        const columns = goal[row];

        for (let column = 0; column < columns.length; column++) {
            try {
                let name = columns[column];
                let color = undefined;
                let direction = undefined;

                if (name === 'SPACE') {
                    continue;
                }

                if (name.includes('_')) {
                    const [ param, entityName ] = name.split('_');

                    if (COLORS.includes(param)) {
                        color = param.toLowerCase();
                    }

                    if (DIRECTIONS.includes(param)) {
                        direction = param.toLowerCase();
                    }

                    name = entityName;
                }

                await createEntity({
                    row, column, name: `${name.toLowerCase()}s`, direction, color
                });
                

            } catch (error) {
                console.log(error)
            }
        }
    }
})()
