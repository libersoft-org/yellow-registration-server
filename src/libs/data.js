import Database from './database.js';
import { Common } from './common.js';

class Data {
 constructor() {
  this.db_server = new Database(Common.settings.database.server.host, Common.settings.database.server.port, Common.settings.database.server.user, Common.settings.database.server.password, Common.settings.database.server.name);
  this.db_module_profiles = new Database(Common.settings.database.module_profiles.host, Common.settings.database.module_profiles.port, Common.settings.database.module_profiles.user, Common.settings.database.module_profiles.password, Common.settings.database.module_profiles.name);
 }

 async dbCheckServer() {
  this.db_server.connect();
 }

 async dbConnectModuleProfiles() {
  this.db_module_profiles.connect();
 }

 async createUser(username, domainID, password) {
  return await this.db_server.query('INSERT INTO users (name, id_domains, password) VALUES (?)', [username, domainID, password]);
 }

 async createProfile(firstName, lastName, gender, birthday, phone) {
  return await this.db_module_profiles.query('INSERT INTO profiles (first_name, last_name, gender, birthday, phone) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, gender, birthday, phone]);
 }

 async addPhoto(guid, id_users) {
  return await this.db_module_profiles.query('INSERT INTO photos (guid, id_users) VALUES (?, ?)', [guid, id_users]);
 }
}

export default Data;
