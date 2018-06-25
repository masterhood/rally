let Paths = require('./Paths');
let Manifest = require('./Manifest');
let Dispatcher = require('./Dispatcher');
let Components = require('./components/Components');
let isFunction = require('lodash').isFunction;

class Mingle {
    /**
     * Create a new instance.
     */
    constructor() {
        this.paths = new Paths();
        this.manifest = new Manifest();
        this.dispatcher = new Dispatcher();
        this.tasks = [];
        this.bundlingJavaScript = false;
        this.components = new Components();
    }

    /**
     * Determine if the given config item is truthy.
     *
     * @param {string} tool
     */
    isUsing(tool) {
        return !!Config[tool];
    }

    /**
     * Determine if Mingle is executing in a production environment.
     */
    inProduction() {
        return Config.production;
    }

    /**
     * Determine if Mingle should watch files for changes.
     */
    isWatching() {
        return (
            process.argv.includes('--watch') || process.argv.includes('--hot')
        );
    }

    /**
     * Determine if polling is used for file watching
     */
    isPolling() {
        return this.isWatching() && process.argv.includes('--watch-poll');
    }

    /**
     * Determine if Mingle sees a particular tool or framework.
     *
     * @param {string} tool
     */
    sees(tool) {
        if (tool === 'ofcold') {
            return File.exists('./art');
        }

        return false;
    }

    /**
     * Determine if Mingle should activate hot reloading.
     */
    shouldHotReload() {
        new File(path.join(Config.publicPath, 'hot')).delete();

        return this.isUsing('hmr');
    }

    /**
     * Add a custom file to the webpack assets collection.
     *
     * @param {string} asset
     */
    addAsset(asset) {
        Config.customAssets.push(asset);
    }

    /**
     * Queue up a new task.
     *
     * @param {Task} task
     */
    addTask(task) {
        this.tasks.push(task);
    }

    /**
     * Listen for the given event.
     *
     * @param {string}   event
     * @param {Function} callback
     */
    listen(event, callback) {
        this.dispatcher.listen(event, callback);
    }

    /**
     * Dispatch the given event.
     *
     * @param {string} event
     * @param {*}      data
     */
    dispatch(event, data) {
        if (isFunction(data)) {
            data = data();
        }

        this.dispatcher.fire(event, data);
    }
}

module.exports = Mingle;
