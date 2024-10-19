import API from './api.js';
import { Common } from './common.js';

class WebServer {
 async run() {
  try {
   this.api = new API(this);
   await this.startServer();
  } catch (ex) {
   Common.addLog('Cannot start web server.', 2);
   Common.addLog(ex, 2);
  }
 }

 async startServer() {
  try {
   Bun.serve({
    fetch: this.getFetch(),
    port: Common.settings.web.http_port
   });
   Common.addLog('HTTP server is running on port: ' + Common.settings.web.http_port);
  } catch (ex) {
   Common.addLog('Error: ' + ex.message, 2);
   process.exit(1);
  }
 }

 getFetch() {
  return async (req, server) => {
   if (server.upgrade(req)) return;
   let clientIP = server.requestIP(req).address;
   const forwardedHeaders = [req.headers.get('x-forwarded-for'), req.headers.get('cf-connecting-ip'), req.headers.get('x-real-ip'), req.headers.get('forwarded'), req.headers.get('x-client-ip'), req.headers.get('x-cluster-client-ip'), req.headers.get('true-client-ip'), req.headers.get('proxy-client-ip'), req.headers.get('wl-proxy-client-ip')];
   for (const header of forwardedHeaders) {
    if (header) {
     clientIP = header.split(',')[0];
     break;
    }
   }
   Common.addLog(req.method + ' request from: ' + clientIP + ', URL: ' + req.url);
   const api = this.api;
   const path = new URL(req.url).pathname;
   if (path.startsWith('/api/')) return new Response(api.processAPI(path.replace('/api/'), json));
   else return new Response('<h1>404 Not Found</h1>', { status: 404, headers: { 'Content-Type': 'text/html' } });
  };
 }
}

export default WebServer;
