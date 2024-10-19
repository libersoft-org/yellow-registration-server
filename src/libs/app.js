import WebServer from './webserver.js';
import Data from './data.js';
import { Common } from './common.js';

class App {
 async run() {
  const args = process.argv.slice(2);
  switch (args.length) {
   case 0:
    await this.startServer();
    break;
   case 1:
    if (args[0] === '--create-settings') await this.createSettings();
    else this.getHelp();
    break;
   default:
    this.getHelp();
    break;
  }
 }

 async startServer() {
  try {
   await this.loadSettings();
   const header = Common.appName + ' ver. ' + Common.appVersion;
   const dashes = '='.repeat(header.length);
   Common.addLog(dashes);
   Common.addLog(header);
   Common.addLog(dashes);
   Common.addLog('');
   this.webServer = new WebServer();
   await this.webServer.run();
  } catch (ex) {
   Common.addLog(ex);
  }
 }

 getHelp() {
  Common.addLog('Command line arguments:');
  Common.addLog('');
  Common.addLog('--help - to see this help');
  Common.addLog('--create-settings - to create a default settings file named "' + Common.settingsFile + '"');
 }

 async loadSettings() {
  const file = Bun.file(Common.settingsFile);
  if (await file.exists()) {
   try {
    Common.settings = await file.json();
   } catch {
    Common.addLog('Settings file "' + Common.settingsFile + '" has an invalid format.', 2);
    process.exit(1);
   }
  } else {
   Common.addLog('Settings file "' + Common.settingsFile + '" not found. Please run this application again using: "./start.sh --create-settings"', 2);
   process.exit(1);
  }
 }

 async createSettings() {
  const file = Bun.file(Common.settingsFile);
  if (await file.exists()) {
   Common.addLog('Settings file "' + Common.settingsFile + '" already exists. If you need to replace it with default one, delete the old one first.', 2);
   process.exit(1);
  } else {
   let settings = {
    web: {
     http_port: 26001,
     allow_network: false
    },
    database: {
     server: {
      host: '127.0.0.1',
      port: 3306,
      user: 'your_username',
      password: 'your_password',
      name: 'yellow_server'
     },
     module_profiles: {
      host: '127.0.0.1',
      port: 3306,
      user: 'your_username',
      password: 'your_password',
      name: 'yellow_server_module_messages'
     }
    },
    other: {
     log_file: 'yellow-registration-server.log',
     log_to_file: true
    }
   };
   await Bun.write(Common.settingsFile, JSON.stringify(settings, null, 1));
   Common.addLog('Settings file was created sucessfully.');
  }
 }
}

export default App;
