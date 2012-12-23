var hostsfile = require('../lib/hostsfile');
var should = require('should');

var exfile = [
    '##',
    '# Host Database',
    '#',
    '# localhost is used to configure the loopback interface',
    '# when the system is booting.  Do not change this entry.',
    '##',
    '127.0.0.1	localhost',
    '255.255.255.255	broadcasthost',
    '::1             localhost ',
    'fe80::1%lo0	localhost',
    '',
    '10.1.2.3   tmp1    # <tag:foo>',
    '10.1.2.4   tmp2    # <tag:foo>',
    '10.1.2.5   tmp3    # <tag:bar>',
    '10.1.2.6   tmp3    # <tag:foobar>',
];

describe('hostsfile', function () {
    it('should remove tagged hosts', function () {
        var r = hostsfile.removeTagged(exfile, 'foo').join('\n');
        should.not.exist(r.match(/<tag:foo>/));
        should.exist(r.match(/<tag:foobar>/));
        should.exist(r.match(/<tag:bar>/));
        should.exist(r.match(/::1/));
    });

    it('should add tagged hosts', function () {
        var hosts = [
            {ip: '10.2.3.4', names:['foo', 'bar']},
            {ip: '10.2.3.5', names:['foo2', 'bar2']},
        ]
        var r = hostsfile.addHosts(exfile, hosts, 'foobar').join('\n');
        should.exist(r.match(/\s10.2.3.4\s+foo\s+bar\s+# <tag:foobar>\s+/));
        should.exist(r.match(/\s10.2.3.5\s+foo2\s+bar2\s+# <tag:foobar>$/));
        should.exist(r.match(/<tag:foo>/));
        should.exist(r.match(/<tag:foobar>/));
        should.exist(r.match(/<tag:bar>/));
        should.exist(r.match(/::1/));
    });

    it('should read the system hosts file', function (done) {
        hostsfile.readHostsFile(function (err, data) {
            should.not.exist(err);
            should.exist(data);
            should.exist(data.join('\n').match(/localhost/));
            done();
        });
    });
});
