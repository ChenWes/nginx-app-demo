var express = require('express');
var router = express.Router();
var os = require('os');

/* GET home page. */
router.get('/', function (req, res, next) {
  var ipaddress = [];
  var ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log(ifname + ':' + alias, iface.address);
        ipaddress.push({
          network: ifname,
          address: iface.address
        })

      } else {
        // this interface has only one ipv4 adress
        // console.log(ifname, iface.address);
        ipaddress.push({
          network: ifname,
          address: iface.address
        })
      }
      ++alias;
    });
  });

  res.render('index', {
    title: 'nginx Demo',
    hostname: os.hostname(),
    systemtype: os.type(),
    ipaddress: ipaddress
  });
});

module.exports = router;
