# tcp-bridge-client

This project demonstrates setup of a minimal module for the MoHSES/AMM platform in Node.js using the [AMM TCP Bridge](https://github.com/AdvancedModularManikin/tcp-bridge). The tcp-bridge-client module uses auto discovery to find the tcp bridge server on the local network, connects to the server and registers itself to the AMM platform. The client also subscribes to some data topics and reprints the received data to the console.

## Prerequisites

### MoHSES/AMM
The TCP bridge client requires the [AMM Core Modules](https://github.com/AdvancedModularManikin/core-modules) be built and running on the local network.

### Node.js and npm

The project runs on Node.js. 
Follow installation and update instructions as necessary for [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Web Dashboard (optional)

Install the web dashboard ([amm-web](https://github.com/rainerleuschke/amm-web)) on the same machine as the AMM core modules to control the AMM simulation.

## Installation
```bash
    $ git clone https://github.com/rainerleuschke/tcp-bridge-client
    $ cd tcp-bridge-client
    $ npm install
    $ npm start
```

## Run tcp-bridge-client

* Start the AMM core modules 
* Navigate to to the tcp-bridge-client project directory and start it
  ```
    npm start
  ```
* start a simulation run
  ```
    $ curl http://[amm core ip]:9080/command/[SYS]START_SIM
  ```
* alternatively use the web dashboard to start a simulation by pressing the 'Start' button. The web dashboard is usually hosted from the same system as the core modules. 

This demo prints heart rate and breath rate of a simulated patient to the console at a 5Hz update rate. The subscribed data is configured in the module configuration file (src/configuration.xml).

## Authors

* **Rainer Leuschke** - [GitHub](https://github.com/RainerLeuschke)

## License

This project is licensed under the MIT License.
