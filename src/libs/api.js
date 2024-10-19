import Data from './data.js';

class API {
 constructor(webServer) {
  this.webServer = webServer;
  this.data = new Data();
  this.routes = {
   create_user: this.createUser,
   create_profile: this.createProfile,
   add_photo: this.addPhoto
  };
 }

 async processAPI(name, payload = null) {
  if (payload) {
   if (isValidJSON(payload)) return { error: 900, message: 'Invalid JSON' };
  }
  const req = JSON.parse(payload);
  const route = this.routes[name];
  if (!route) return { error: 901, message: 'Unknown API name' };
  return await apiMethod.method.call(this, payload);
 }

 async createUser(payload) {
  return { error: 0, message: 'User created successfully' };
 }

 async createProfile(payload) {
  return { error: 0, message: 'Profile created successfully' };
 }

 async addPhoto(payload) {
  return { error: 0, message: 'Photo added successfully' };
 }

 getUUID() {
  return crypto.randomUUID();
 }

 isValidJSON(text) {
  try {
   JSON.parse(text);
   return true;
  } catch (e) {
   return false;
  }
 }
}

export default API;
