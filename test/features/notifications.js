import rally from './helpers/setup';

test.cb.serial('it displays OS notifications', t => {
    compile(t, config => {
        // Find the webpack-notifier plugin. (Yeah, a little awkward...)
        let plugin = config.plugins.find(
            plugin => plugin.options && plugin.options.alwaysNotify === true
        );

        t.truthy(plugin);
    });
});

test.cb.serial('it disables OS notifications', t => {
    rally.disableNotifications();

    compile(t, config => {
        // Find the webpack-notifier plugin. (Yeah, a little awkward...)
        let plugin = config.plugins.find(
            plugin => plugin.options && plugin.options.alwaysNotify === true
        );

        t.falsy(plugin);
    });
});

test.cb.serial('it disables OS success notifications', t => {
    rally.disableSuccessNotifications();

    compile(t, config => {
        // Find the webpack-notifier plugin. (Yeah, a little awkward...)
        let plugin = config.plugins.find(
            // To disable success notifications, we only have to set the alwaysNotify
            // option on the webpack plugin to false.
            plugin => plugin.options && plugin.options.alwaysNotify === false
        );

        t.truthy(plugin);
    });
});

test.serial('rally.disableNotifications()', t => {
    t.is(rally, rally.disableNotifications());
});
