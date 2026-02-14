class Logger {
    static #instance;
    #logs;

    constructor() {
        if (Logger.#instance) {
            return Logger.#instance;
        }

        this.#logs = [];
        Logger.#instance = this;
    }

    // Static method to get instance
    static getInstance() {
        if (!Logger.#instance) {
            Logger.#instance = new Logger();
        }
        return Logger.#instance;
    }

    // Log message
    static log(message) {
        const instance = Logger.getInstance();
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}`;

        instance.#logs.push(logEntry);
        console.log(logEntry);
    }

    // Get all logs
    static getLogs() {
        return Logger.getInstance().#logs;
    }

    // Clear logs
    static clear() {
        Logger.getInstance().#logs = [];
    }

    // Export logs to string
    static exportLogs() {
        return Logger.getInstance().#logs.join('\n');
    }
}

export default Logger;