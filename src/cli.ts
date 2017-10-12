import { Log, SeverityLevel } from './services/logger';
import { Http } from './services/http';
import { parseServers } from './services/xmltojson';
import { SERVER_ENDPOINT } from './models/api-endpoints';
import { IServer } from './models/server';
import readline = require('readline');
import { Client } from './core/client';

export class CLI {

    private serverList: IServer[];

    constructor() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        Log('NRelay', 'Starting...', SeverityLevel.Info);
        this.getServers().then((servers) => {
            this.serverList = servers;
            if (servers.length > 0) {
                Log('NRelay', 'Connecting to ' + servers[4].name);
                const client = new Client(servers[4].address);
            }
            // for (let i = 0; i < servers.length; i++) {
            //     Log(servers[i].name, servers[i].address, SeverityLevel.Info);
            // }
            // rl.question('Enter server name: ', (sName) => {
            //     for (let i = 0; i < this.serverList.length; i++) {
            //         if (sName.toLowerCase() === this.serverList[i].name.toLowerCase()) {
            //             const client = new Client(this.serverList[i].address);
            //         }
            //     }
            // });
        });
    }

    getServers(): Promise<IServer[]> {
        Log('NRelay', 'Getting server list...', SeverityLevel.Info);
        return new Promise((resolve, reject) => {
            Http.get(SERVER_ENDPOINT).then((data) => {
                Log('NRelay', 'Got servers!', SeverityLevel.Success);
                const servers = parseServers(data);
                resolve(servers);
            }).catch((serverListError) => {
                Log('NRelay', 'Error getting servers.', SeverityLevel.Error);
                reject(serverListError);
            });
        });
    }
}