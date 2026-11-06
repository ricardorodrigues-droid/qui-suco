import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.wasm':'application/wasm','.gz':'application/gzip','.png':'image/png','.pck':'application/octet-stream'};
http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=path.resolve(base,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(base+path.sep)){res.writeHead(403);res.end();return;}
 fs.stat(file,(err,stat)=>{
  if(err||!stat.isFile()){res.writeHead(404);res.end('Arquivo não encontrado');return;}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':stat.size,'Cache-Control':'no-cache'});
  fs.createReadStream(file).pipe(res);
 });
}).listen(8765,'127.0.0.1',()=>console.log('QUÍ-SUCO: http://127.0.0.1:8765'));
