 
var base = 'http://localhost:15000/'
JSON.parse(sessionStorage.getItem('user')) == undefined ? sessionStorage.setItem('user', JSON.stringify({name:'name', token:'-'})) : false;

async function POST(options)
{
    var url = ( options.base !== undefined ?  new URL(options.base + options.url) : new URL(base + options.url)) ; 
    const response = await fetch(
                                    url,
                                    {
                                    method:'POST', 
                                    headers: {'Content-Type': 'application/json', 'Authorization' : JSON.parse(sessionStorage.getItem('user')).token} ,
                                    body:  JSON.stringify(options.parameters) 
                                    }
                                ); 

    const json     = await response.json();

    return json 
}

async function PUT(options)
{
   
    var url = ( options.base !== undefined ?  new URL(options.base + options.url) : new URL(base + options.url)) ; 
    const response = await fetch(
        url,
        {
        method:'PUT', 
        headers: {'Content-Type': 'application/json', 'Authorization' : JSON.parse(sessionStorage.getItem('user')).token} ,
        body:  JSON.stringify(options.parameters) 
        }
    ); 

    const json     = await response.json();

    return json 
}

async function GET(options)
{
  
    let url = ( options.base !== undefined ?  new URL(options.base + options.url) : new URL(base + options.url)) ; 
    const response = await fetch(
        url  + new URLSearchParams(options.parameters).toString() ,
        {
        method:'GET', 
        headers: {'Content-Type': 'application/json', 'Authorization' : JSON.parse(sessionStorage.getItem('user')).token} 
        }
    );  
    const json     = await response.json();  
    return json;  
}
 
async function DELETE(options)
{
    var url = new URL( base + options.url); 
    
    //url.search = new URLSearchParams(options.parameters).toString();

    const response = await fetch(
        url ,//+ '?' + new URLSearchParams(options.parameters).toString() ,
        {
        method:'DELETE', 
        headers: {'Content-Type': 'application/json', 'Authorization' : JSON.parse(sessionStorage.getItem('user')).token},
        body:  JSON.stringify(options.parameters)  
        }
    ); 

    const json     = await response.json();

    return json 
    
}
 
async function store(key, params, base) {
     
    
    await GET({ url: `${key}/get?`, parameters: params , base: base}).then((response) => {
      
      if (response.data != undefined)
        sessionStorage.setItem(key, JSON.stringify(response.data));
       else 
       sessionStorage.setItem(key, JSON.stringify(response));
    });
  }

   

function load(key)
{
    return JSON.parse(sessionStorage.getItem(key))
}
 
let observer = {}; 