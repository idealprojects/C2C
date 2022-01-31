/* Common */
function QueryString(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

menuItems = {
    items: 
    [
        {caption:'» Latest Lots', url:'latestLots.html',          selected:true }, 
        {caption:'» My Sales',    url:'mySales.html',             selected:false},
        {caption:'» My Bids',     url:'myBids.html',              selected:false},
        {caption:'» Profile',     url:'profile.html',             selected:false},
        {caption:'» Account',     url:'account.html',             selected:false} 
    ]
}


{/* <div style="border:1px dashed #ccc; background-color: #f2f2f2;" class="flex vCenter p10">  
<img src="images/file.png" style="padding: 4px;"> 
<div>  Have stock items? <a href="#"  style="color: blue;"> Create lot  </a>and submit to hundreds of potintal buyers.  </div>
</div> */}

newLot = { 
    type:'div', attributes: {style:'border:1px dashed #ccc; background-color: #f2f2f2;', class:'flex vCenter p10'}, 
        elements: 
            [
                {type:'img', attributes: {src:'images/file.png', style:'padding: 4px'}}, 
                {type:'div', attributes: {}, content: {innerHTML:`Have stock items? <a href="#"  style="color: blue;"> Create lot  </a>and submit to hundreds of potintal buyers.  `}}
            ]
} 

