# This project is not actively maintained

Issues and pull requests on this repository may not be acted on in a timely
manner, or at all.  You are of course welcome to use it anyway. You are even
more welcome to fork it and maintain the results.

![Unmaintained](https://nym.se/img/unmaintained.jpg)

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
