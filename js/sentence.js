
var assetsPath      = '/css/assets/'; 
var languagePath    = '/language/'; 
var base            = '' // API Url should go here !
var language        = {};
var uploadsUrl      =  base + '/uploads/' 
 
$ = function(selector)
{
    let self = {};  

    if(selector) {
        self.element = document.querySelector(selector);  
    }
    
     
     // creats a DOM element based on tag, passed attributes, events & initial content
    self.create =   (tag, attributes, events, content, extend, _options) => {

        self.element = document.createElement(tag);

        (_options)?  self.element._options = _options : false; 
         
        for (key in attributes) {
            self.element.setAttribute(key,  attributes[key] );
            if (key == 'id') {
                self.id = attributes[key];
                self.selector = attributes[key];  }
            }

        for (key in events) { self.element.addEventListener(key, events[key], true); }
        for (key in content) { self.element[key] =  content[key] ; }; 

        return self;

    }
 
    return self; 

}
  
// renderAsyncs the element given parent node ( as container ) with recursive capabilities 
async function  renderAsync(node, parent) {

    var el = $().create(node.type, node.attributes, node.events, node.content, node.extend, node._options).element;
    parent.append(el); 
    
    if(node.elements)
    {   node.elements.forEach(async child => {     await renderAsync(child, el);   });    }
 
   
   return el
} 

 function  render(node, parent) {

    var el = $().create(node.type, node.attributes, node.events, node.content, node.extend, node._options).element;
    parent.append(el); 
    
    if(node.elements)
    {   node.elements.forEach( child => {    render(child, el);   });    }
 
   
   return el
} 
 
    