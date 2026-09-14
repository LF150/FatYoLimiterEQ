const http=require('http'),fs=require('fs'),path=require('path');
const PORT=Number(process.env.PORT||8080),ROOT=path.join(__dirname,'public'),PLUGINS=path.join(ROOT,'plugins');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const results=[];
const send=(r,c,b,t='application/json; charset=utf-8')=>{r.writeHead(c,{'Content-Type':t,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});r.end(b)};
const safe=p=>{const x=path.resolve(ROOT,'.'+p);return x.startsWith(path.resolve(ROOT)+path.sep)?x:null};
const list=()=>fs.existsSync(PLUGINS)?fs.readdirSync(PLUGINS).filter(x=>/\.html?$/i.test(x)).sort().map(name=>({name,url:'/plugins/'+encodeURIComponent(name)})):[];
http.createServer((req,res)=>{
 const u=new URL(req.url,'http://localhost');
 if(u.pathname==='/health')return send(res,200,JSON.stringify({ok:true,service:'manzkind-cloud-sandbox'}));
 if(u.pathname==='/api/plugins')return send(res,200,JSON.stringify(list()));
 if(u.pathname==='/api/results'&&req.method==='GET')return send(res,200,JSON.stringify(results.slice(-100)));
 if(u.pathname==='/api/results'&&req.method==='POST'){let b='';req.on('data',c=>b+=c);req.on('end',()=>{try{results.push({...JSON.parse(b),receivedAt:new Date().toISOString()});send(res,200,JSON.stringify({ok:true}))}catch{send(res,400,JSON.stringify({ok:false}))}});return}
 let p=decodeURIComponent(u.pathname);if(p==='/')p='/index.html';const f=safe(p);
 if(!f||!fs.existsSync(f)||fs.statSync(f).isDirectory())return send(res,404,'Not found','text/plain');
 res.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});fs.createReadStream(f).pipe(res);
}).listen(PORT,'0.0.0.0',()=>console.log('ManzKind sandbox on '+PORT));
