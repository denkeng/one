let http = require('http');
let url = require('url');
let banner=require('./banner')
let fs=require('fs');
let fsPromise=fs.promises;
function readjosn(){
  return fsPromise.readFile('./good.json','utf8').then(data=>{
    return JSON.parse(data);
  })
}
http.createServer((req,res)=>{
	
  //允许哪个域名跨域 
    res.setHeader('Access-Control-Allow-Origin',"*");
    //允许哪个方法跨域
    res.setHeader('Access-Control-Allow-Methods','PUT,POST,GET,DELETE')
    //预检测存活时间，单位是s
    res.setHeader('Access-Control-Max-Age',6)
     res.setHeader('Content-Type','text/json;charset=utf8')
    if(req.method==='OPITIONS'){
       res.end()//OPITIONS请求不做任何处理
    } 
//轮播图接口
let {pathname,query}=url.parse(req.url,true);
if(pathname==='/slider'){
	res.end(JSON.stringify({
		code:200,
		data:banner
	}))
	return
}
if (pathname==='/hot') {
  readjosn().then(data=>{
    let hotdata = data.slice(0,6);
    setTimeout(()=>{
      res.end(JSON.stringify({
      code:200,
      data:hotdata
    }))
  },4500)
  })
  return
}
    
if (pathname==='/list') {
  let page = parseInt(query.page); //取出前端传过来的页数
  //把所有的数据拿出来  第一页 1~5 
  readjosn().then(data=>{
    // let pagedata = data.slice(page*5,(page+1)*5);
    //假设maxlength是最大的数据长度
    let maxlength=(page+1)*5;
    
    //判断是否有下一页(用hasMore表示) maxlength>=data.length表示 没有下一页了
    let pagedata = data.slice(maxlength-5,maxlength)
    let hasMore = maxlength>=data.length?false:true
    res.end(JSON.stringify({
      code:200,
      data:{
        hasMore,
        pagedata
      }
    }))
  })
  return
}
//详情页面请求
if(pathname==='/detail'){
  let id = query.id;
  readjosn().then(data=>{
    let single = data.find(item=>item.id==id);
    if (!single) {
       res.end(JSON.stringify({
         code:201,
         data:{}
       }))
       return
    }
    res.end(JSON.stringify({
      code:200,
      data:single
    }))
  })
  return
}
res.end('404')
}).listen(3000)







