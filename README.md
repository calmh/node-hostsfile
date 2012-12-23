node-hostsfile
==============

Manipulate the `/etc/hosts` file.

```javascript
var hf = require('./lib/hostsfile');

hf.readHostsFile(function (err, data) {
    if (err)
        throw err;

    var hosts = [
        {ip: '10.1.2.3', names: ['test1', 'test1-alias']},
    ];

    data = hf.addHosts(data, hosts, 'test');
    hf.replaceHostsFile(data, function (err) {
        if (err)
            throw err;
        console.log('Done');
    });
});
```

License
-------

MIT
