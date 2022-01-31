let styles = {
    pageHeader:     'font-size:12px; border-bottom:1px solid #ccc',
    warningNote:    'padding:5px ; background:var(--action); color:white; border-radius:5px; cursor: pointer;',  
    cover:          'position: absolute; width:100%; height:100%;   display: flex; align-items: center; justify-content: center; top:0;', 
    popup:          'background-color: #fff; width:600px; height:600px; opacity: 1; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0px 0px 20px #ccc; padding:5px',
    close:          'padding:8px; right:0px; width:16px; cursor:pointer',  
    row:            '', 
    thead:          'background:#f2f2f2; height:30px; padding:2px; font-weight:600', 
    table:          'width:100%; border-collapse: collapse;',
    td:             'border-bottom:1px solid #ccc; height:30px', 
    inlineMenu:     'border-right:1px solid #ccc; padding:10px; min-height:600px; display:flex; flex-direction:column; ', 
    inlineMenuItem: 'color:var(--darkPurple); font-weight:100px; cursor:pointer; padding:10px; text-decoration: none;' 
}

{
    /* <div class="p20 flex vCenter" style="font-size:12px; border-bottom:1px solid #ccc"> 
 
<img src="images/logo.svg" class="logo mlr5"> Profile 
<div class="grow"></div>
<div style="padding:5px ; background:var(--action); color:white; border-radius:5px; cursor: pointer;"> Verify your account! </div>
<div class="mlr5">Support</div>
<div class="mlr5">Contact</div>
 
</div> */}

seperator = () => { 
    return {type:'div', attributes:{style:'height:50px'}} 
}

caption = (content) => { 
  return  {type:'div', attributes: {style: 'height:40px; font-size:18px; font-weight:600; '}, content:{innerText:content}} 
}

pageHeader = (options) => { 
    return  {
                type:'div', attributes: {class:'p20 flex vCenter', style:styles.pageHeader}, elements: 
                [
                    {type:'img', attributes:{src:'images/logo.svg', class:'logo mlr5'}}, 
                    {type:'div', attributes:{id:'currentPage'}}, 
                    {type:'div', attributes:{class:'grow'}},
                    {type:'div', attributes:{style:styles.warningNote}, content: {innerText:'Verify your account!'}}, 
                    {type:'div', attributes:{class:'mlr5'},             content: {innerText:'Support'}}, 
                    {type:'div', attributes:{class:'mlr5'},             content: {innerText:'Contact'}}
                ]
            }
}

image = (options) => {
    return {type:'img', attributes:{src: options.src, class: (typeof options.class != 'undefined') ? options.class : 'logo', style: options.style}}
}
anchor = (options) => {
    return {type: 'a', attributes: { class: options.class, style: options.style, href: (typeof options.href != 'undefined') ? options.href : '#'}, content:{innerText: options.text}}
}

modal = (options) => { 

    //Idea
    // add for ( key in options )
    // check if exists then replace
    // else add it 
    // The remainning of the style should stay the same !

     styles.popup = options?.width  ? styles.popup.replace('width:600px;',  `width:${options.width}`)    :styles.popup; 
     styles.popup = options?.height ? styles.popup.replace('height:600px;', `height:${options.height}`)  :styles.popup; 
   

    console.log(styles.popup)
    return {
                type:'div', attributes: {id:'modal', style: styles.cover}, 
                elements: 
                    [
                        {
                            type:'div',         attributes: {style: styles.popup}, elements: 
                            [
                                {type:'div',    attributes: {style: styles.close}, content: {innerHTML : ' ✕ '}, events: {click: function(){ document.getElementById('modal').remove() }} }, 
                                {type:'iframe', attributes:{ 
                                                                height:         options?.height?    options.height: '550px'     , 
                                                                width:          options?.width?     options.width:  '600px'     ,  
                                                                src:            options?.src ?      options.src :   '404.html'  ,
                                                                frameborder:    'no', 
                                                            }
                                }
                            ]
                        }
                    ]
           }    



}

// title = (options) => {
//     return {
//         type: 'h1', attributes: {style: 'height:40px; font-size:18px; font-weight:600; '}, content:{innerText:content}} 
//     }
// }


textInput  =  (options) => {
    return {
        type: 'text', attributes: {style: 'height:40px; font-size:18px; font-weight:600;', placeholder: options.placeholder}, content: {innerText:options.text}
    }
}

tabularView     = (options) => { 
    return {
        type:'table', attributes: {style:styles.table} ,
        elements :
            [
               { 
                   type:'thead', attributes:{style:styles.thead}, elements :  (()=>{     
                                                        let entries = [];   
                                                         options.fields.forEach( field => {  
                                                             entries.push({type:'td', attributes:field.attributes?.header,  content:{innerText: field.name? field.name : ''}}) 
                                                            });  
                                                         return entries 
                                                         
                                                    })()
               }
               ,
               
               {
                type:'tbody', 
                elements:
                     (() => { 
                        let entries = []; 
                            options?.data?.forEach( record => {        
                                entries.push({type:'tr', elements: 
                                                                    (()=>{  
                                                                        let entries = []; 
                                                                        //for(key in record ) {   entries.push({type:'td', content:{innerHTML: fieldView(key,record, options)}})   }; 
                                                                        options.fields.forEach( field => { 
                                                                            entries.push({type:'td', attributes:{style:styles.td}, elements: [fieldView(field,record)]})
                                                                        })
                                                                        return entries;     
                                                                         })()
                                                                    })     
                            }) 
                            return entries 
                     })()
               }
            ]
    }
}



rowView         = async (options) => {  
     
    //   let output = await GET({url:'lotDetails/get', parameters: {}});
    //                return {type:'tr', elements: {type:'td', content: 'X'}} 

    return {
            type:'tbody', 
            elements:
                 (() => { 
                    let entries = []; 
                        options?.data?.forEach( record => {        entries.push({type:'tr'})     }) 
                        return entries 
                 })()
           }

}



fieldView       = (field, record) => { 
    
 

    let value ;  
    
    switch (field.viewAs)
    {
        
        case 'system': 
        value = {type:'div', attributes:  field.attributes , content: field.content}; 
        
        break; 
        case 'button':  
        value = {type:'input', attributes: field.attributes, events:field.events}; 
        let att = {...field.attributes} 
        field.data ? att.data =  record[field.data] : false;
        value.attributes = att

        break; 
        case 'text' : 
        break;

        case 'select': 
        break; 

        case 'number': 
        break; 

        case 'date':
            value = {type:'div', content:{innerText:  record[field.name].toString().substr(0,10)  }};
        break; 

        default: 
            value = {type:'div', content:{innerText: (field.prefix?field.prefix:'') + record[field.name] + (field.suffix?field.suffix:'')}};
        break; 

    }
   

    return value; 

}

// <div  style="border-right:1px solid #ccc; padding:10px;"> 
// <div    class="p10 menuLink"    onclick="window.location.href='latestLots.html'"  style="font-weight:bold"  > » Latest Lots     </div>
// <div    class="p10 menuLink"    onclick="window.location.href='sales.html'"                                 > » Sales Profile   </div>
// <div    class="p10 menuLink"    onclick="window.location.href='bid.html'"                                   > » Bidding Profile </div>
// <div    class="p10 menuLink"    onclick="window.location.href='profile.html'"                               > » Profile         </div>
// <div    class="p10 menuLink"    onclick="window.location.href='account.html'"                               > » Account         </div>
// </div>


inlineMenu = (options) => { 
    return  {
                type:'div', attributes: {style:styles.inlineMenu},  
                elements: ( (optins) =>{ 
                    let entries = []; 
                        options.items.forEach( item => { 
                            entries.push
                            (
                                {
                                    type:'a', 
                                    attributes: {href:item.url, style:styles.inlineMenuItem}, 
                                    content: {innerHTML: item.caption} 
                                }
                            )
                        })
                        return entries;
                })()
            }
}

openPage = (url) => {
    let a = document.createElement('a');
    a.href = url;
    a.click();
}

textInputWithImage = (options) => {
    return {
        type: 'div', attributes: { class:'textBox', style:'display:flex'}, elements: [
            { type: 'div', attributes: { class:'mlr5' }},
            { type: 'img', attributes: { style:'width: 12px;', src: options.src, class: 'mlr5' }},
            textInput(options)
        ]
    }
}

textInput = (options) => {
    return {
        type: 'div', attributes: { class:'textBox', style:'display:grid'}, elements: [
            { type: 'input', attributes: options.attributes, events: mergeObjects(options.events, {focusout: function() {
                if(!this.value) {
                   this.getAttribute('isRequired')     
                }
                console.log(this.getAttribute('isRequired'))
            }}) },
            // { type: 'div', attributes: {style:'color: var(--white); display: none;' }, content:{innerText: "Field is required."} },
        ]
    }
}

text  =  (options) => {
    return {
        type: (typeof options.type != 'undefined') ? options.type :  'div', attributes: options.attributes, content: {innerText:options.text}
    }
}



// textInput = (options) => {
//     let el = {type: 'input', attributes: options.attributes, events: mergeObjects(options.events, {focusout: function() {
//         if(!this.value) {
//            this.getAttribute('isRequired')     
//         }
//         console.log(this.getAttribute('isRequired'))
//     }}) }
//     for(key1 in options.attributes)  {  
//         el[key1] = options.attributes[key1]
//     } 

//     return {
//         type: 'div', attributes: { class:'textBox', style:'display:grid'}, elements: [
//             el,
//             // { type: 'div', attributes: {style:'color: var(--white); display: none;' }, content:{innerText: "Field is required."} },
//         ]
//     }
// }

let gab = {
    type: 'div', attributes: { class: 'grow ptm10', style: 'height: 40px;' }
}

footer = () => {
    return {
        type: 'div', attributes: { class: "p20 flex vCenter", style: 'font-size:12px;' },
        elements: [
            { type: 'img', attributes: { src: 'images/logo.svg', class: 'logo mlr5' }},
            { type:'div', content: { innerText: 'Copy © 2022, rights reserved' } },
            { type: 'div', attributes: { class: 'grow' } },
            { type: 'div', attributes: { class: 'mlr5' }, content: { innerText: 'Support' }, events: {
                                click: function () {
                                    openPage('signin.html')
                                }
                            }  },
            { type: 'div', attributes: { class: 'mlr5' }, content: { innerText: 'Contact' }, events: {
                                click: function () {
                                    openPage('signin.html')
                                }
                            }  },
        ]
    }
}

function mergeObjects(o1,o2) {
    if(o1) {
        for(key1 in o1)  {  
            for (key2 in o2) {
                (key1 == key2 && key1 != 'id')? o1[key1]+= ' ' + o2[key2]: o1[key2] = o2[key2];  
            }
        } 
    } else {
         o1 = o2
    }
     
    return o1
}