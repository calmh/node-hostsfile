var hf = require('./lib/hostsfile');

hf.readHostsFile(function (err, origData) {
    if (err)
        throw err;
    var hosts = [
        {ip: '10.1.2.3', names: ['test1', 'test1-alias']},
    ];
    var data = hf.addHosts(hf.removeTagged(origData, 'test'), hosts, 'test');
    hf.replaceHostsFile(data, function (err) {
        if (err)
            throw err;
        console.log('Done');
    });
});

