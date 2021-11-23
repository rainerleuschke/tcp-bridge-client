const dgram = require("dgram");
const udpServer = dgram.createSocket("udp4");

const net = require("net");
const  ip = require("ip");
const addr = ip.address();
var client = {};

const MULTI_CAST_ADDR = "224.0.0.1";

udpServer.bind(8888, (a) => {
   udpServer.addMembership(MULTI_CAST_ADDR);
   udpServer.setMulticastLoopback(false);
});

udpServer.on("listening", () => {
   const address = udpServer.address();
   console.log("AMM Autodiscovery");
   console.log("private ip address: ", addr);
   console.log(`listening on: ${address.address}:${address.port}`);
});

var udpInterval = setInterval(() => {
   const message = Buffer.from("AMM Autodiscovery");
   udpServer.send(message, 8888, MULTI_CAST_ADDR);
}, 2000);

udpServer.on("message", (msg, rinfo) => {
   console.log(`udp server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
   client = net.createConnection(9015, rinfo.address, () => {
      console.log('connected to tcp-bridge server');
      client.write('MODULE_NAME=AMM_TCP_CLIENT\n');

      const fs = require('fs')
      fs.readFile('./src/configuration.xml', 'utf8' , (err, data) => {
         if (err) {
            console.error(err)
            return
         }
         client.write('CAPABILITY='+ Buffer.from(data).toString('base64') + '\n');
      })
   })
   client.on('data', (data) => {
      var line = data.toString();
      var kvp = line.split('=');
      var key = kvp[0].trim();
      var value = Math.round( parseFloat( kvp[1].trim().replace('|', '') ) );
      if ( key == 'Respiratory_Respiration_Rate' ) {
         console.log('RR = ', value);
      } else if ( key == 'Cardiovascular_HeartRate' ) {
         console.log('HR = ', value);
      } else {
         console.log(data.toString());
      }
   });

   client.on('end', () => {
      console.log('disconnected from tcp-bridge server');
   });

   udpServer.close();
});

udpServer.on('close', () => {
  clearInterval(udpInterval);
  console.log('stopped auto discovery udp server');
});

process.on('SIGINT', function() {
   console.log(" caught interrupt signal ...");
   client.destroy();
   process.exit();
});
