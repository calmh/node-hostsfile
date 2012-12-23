var fs = require('fs');
var temp = require('temp');
var sudo = require('sudo');

module.exports.removeTagged = removeTagged;
module.exports.addHosts = addHosts;
module.exports.readHostsFile = readHostsFile;
module.exports.replaceHostsFile = replaceHostsFile;

/* This might throw an exception if the hosts file doesn't exist. That's not
 * unintentional.
 */

var hostsFile = fs.realpathSync('/etc/hosts');

function removeTagged(lines, tag) {
    var filterFunc = function (l) { return !l.match('<tag:' + tag + '>'); };
    return lines.filter(filterFunc);
}

function addHosts(lines, hosts, tag) {
    var newLines = lines.slice(0);
    hosts.forEach(function (host) {
        newLines.push(host.ip + '\t' + host.names.join(' ') + ' # <tag:' + tag + '>');
    });
    return newLines;
}

function readHostsFile(cb) {
    fs.readFile(hostsFile, 'utf-8', function (err, data) {
        if (err)
            return cb(err);
        var lines = data.replace(/\n$/, '').split('\n');
        cb(null, lines);
    });
}

function replaceHostsFile(lines, cb) {
    var tmp = temp.path();
    fs.writeFile(tmp, lines.join('\n') + '\n', 'utf-8', function (err) {
        if (err)
            return cb(err);
        var p = sudo(['/bin/sh', '-c', 'cat < ' + tmp + ' > ' + hostsFile]);
        p.on('exit', function (code) {
            fs.unlinkSync(tmp);
            if (code === 0)
                cb(null);
            else
                cb(new Error('Exit code ' + code));
        });
    });
}
