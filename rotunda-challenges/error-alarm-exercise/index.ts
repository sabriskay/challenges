enum LOG_TYPE {
    LOG = 1,
    DEBUG = 2,
    ERROR = 3,
    // ...
}

class Loger {

    public log: (message: string) => void;
    public error: (message: string) => void;
    public debug: (message: string) => void;

    private notificationThresholdInMS: number;
    private errorRegistry: Array<number>;

    constructor(errorNotificationThreshold = 10) {
        this.errorRegistry = [];
        this.notificationThresholdInMS = errorNotificationThreshold * 1000;

        this.log = this.write(LOG_TYPE.LOG);
        this.error = this.write(LOG_TYPE.ERROR);
        this.debug = this.write(LOG_TYPE.DEBUG);
        // ...
    }

    write (logType: LOG_TYPE) {
        return (message: string) => {
            this.writeToFile(message);
            this.logToConsole(message, logType);
    
            if (this.registerAndCheckErrorFrequency(logType)) {
                this.notifyHighErrorCount();
            };
        }
    }

    writeToFile (message: string) {
        // This function writes to the log file
    }

    logToConsole (message: string, type: LOG_TYPE) {
        // This function checks the log level configured
        // and logs accordingly
    }

    notifyHighErrorCount () {
        // This function notifies via email or
        // whatever is configured, that there's
        // a high error count on this server
    }

    registerAndCheckErrorFrequency (logType: LOG_TYPE): boolean {
        if (logType !== LOG_TYPE.ERROR) {
            return false;
        }

        const now = Date.now()
        const nowMinusThresholdInMS = now - this.notificationThresholdInMS;

        this.errorRegistry.push(now);

        while (this.errorRegistry[0] && this.errorRegistry[0] < nowMinusThresholdInMS) {
            this.errorRegistry.shift();
        }

        return this.errorRegistry.length > 10;
    }
}