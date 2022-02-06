let styles = {
  pageHeader: "font-size:12px; border-bottom:1px solid #ccc",
  warningNote:
    "padding:5px ; background:var(--action); color:white; border-radius:5px; cursor: pointer;",
  cover:
    "position: absolute; width:100%; height:100%;   display: flex; align-items: center; justify-content: center; top:0;",
  popup:
    "background-color: #fff; width:600px; height:600px; opacity: 1; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0px 0px 20px #ccc; padding:5px",
  close: "padding:8px; right:0px; width:16px; cursor:pointer",
  row: "",
  thead: "background:#f2f2f2; height:30px; padding:2px; font-weight:600",
  table: "width:100%; border-collapse: collapse;",
  td: "border-bottom:1px solid #ccc; height:30px",
  inlineMenu:
    "border-right:1px solid #ccc; padding:10px; min-height:600px; display:flex; flex-direction:column; ",
  inlineMenuItem:
    "color:var(--darkPurple); font-weight:100px; cursor:pointer; padding:10px; text-decoration: none;",
};

// {
/* <div class="p20 flex vCenter" style="font-size:12px; border-bottom:1px solid #ccc"> 
 
<img src="images/logo.svg" class="logo mlr5"> Profile 
<div class="grow"></div>
<div style="padding:5px ; background:var(--action); color:white; border-radius:5px; cursor: pointer;"> Verify your account! </div>
<div class="mlr5">Support</div>
<div class="mlr5">Contact</div>
 
</div> */
// }

seperator = () => {
  return { type: "div", attributes: { style: "height:50px" } };
};

caption = (content) => {
  return {
    type: "div",
    attributes: { style: "height:40px; font-size:18px; font-weight:600; " },
    content: { innerText: content },
  };
};

pageHeader = (options) => {
  return {
    type: "div",
    attributes: { class: "p20 flex vCenter", style: styles.pageHeader },
    elements: [
      {
        type: "img",
        attributes: { src: "images/logo.svg", class: "logo mlr5" },
      },
      { type: "div", attributes: { id: "currentPage" } },
      { type: "div", attributes: { class: "grow" } },
      {
        type: "div",
        attributes: { style: styles.warningNote },
        content: { innerText: "Verify your account!" },
      },
      {
        type: "div",
        attributes: { class: "mlr5" },
        content: { innerText: "Support" },
      },
      {
        type: "div",
        attributes: { class: "mlr5" },
        content: { innerText: "Contact" },
      },
    ],
  };
};

image = (options) => {
  return {
    type: "a",
    attributes: { href: options.href },
    elements: [
      {
        type: "img",
        attributes: {
          src: options.src,
          class: typeof options.class != "undefined" ? options.class : "logo",
          style: options.style,
        }
      },
    ],
  };
};

anchor = (options) => {
  return {
    type: "a",
    attributes: {
      class: options.class,
      style: options.style,
      href: typeof options.href != "undefined" ? options.href : "#",
    },
    content: { innerText: options.text },
  };
};

modal = (options) => {
  //Idea
  // add for ( key in options )
  // check if exists then replace
  // else add it
  // The remainning of the style should stay the same !

  styles.popup = options?.width
    ? styles.popup.replace("width:600px;", `width:${options.width}`)
    : styles.popup;
  styles.popup = options?.height
    ? styles.popup.replace("height:600px;", `height:${options.height}`)
    : styles.popup;

  console.log(styles.popup);
  return {
    type: "div",
    attributes: { id: "modal", style: styles.cover },
    elements: [
      {
        type: "div",
        attributes: { style: styles.popup },
        elements: [
          {
            type: "div",
            attributes: { style: styles.close },
            content: { innerHTML: " ✕ " },
            events: {
              click: function () {
                document.getElementById("modal").remove();
              },
            },
          },
          {
            type: "iframe",
            attributes: {
              height: options?.height ? options.height : "550px",
              width: options?.width ? options.width : "600px",
              src: options?.src ? options.src : "404.html",
              frameborder: "no",
            },
          },
        ],
      },
    ],
  };
};

// title = (options) => {
//     return {
//         type: 'h1', attributes: {style: 'height:40px; font-size:18px; font-weight:600; '}, content:{innerText:content}}
//     }
// }

textInput = (options) => {
  console.log(options);
  return {
    type: options.type || "text",
    attributes: {
      style: "height:40px; font-size:18px; font-weight:600;",
      placeholder: options.placeholder,
    },
    content: { innerText: options.text },
  };
};

tabularView = (options) => {
  return {
    type: "table",
    attributes: { style: styles.table },
    elements: [
      {
        type: "thead",
        attributes: {
          style:
            typeof options.styles.header.style != "undefined"
              ? options.styles.header.style
              : styles.thead,
        },
        elements: (() => {
          let entries = [];
          options.fields.forEach((field) => {
            entries.push({
              type: "td",
              attributes: field.attributes?.header,
              content: { innerText: field.name ? field.name : "" },
            });
          });
          return entries;
        })(),
      },
      {
        type: "tbody",
        elements: (() => {
          let entries = [];
          options?.data?.forEach((record) => {
            entries.push({
              type: "tr",
              elements: (() => {
                let entries = [];
                //for(key in record ) {   entries.push({type:'td', content:{innerHTML: fieldView(key,record, options)}})   };
                options.fields.forEach((field) => {
                  entries.push({
                    type: "td",
                    attributes: { style: styles.td },
                    elements: [fieldView(field, record)],
                  });
                });
                return entries;
              })(),
            });
          });
          return entries;
        })(),
      },
    ],
  };
};

rowView = async (options) => {
  //   let output = await GET({url:'lotDetails/get', parameters: {}});
  //                return {type:'tr', elements: {type:'td', content: 'X'}}

  return {
    type: "tbody",
    elements: (() => {
      let entries = [];
      options?.data?.forEach((record) => {
        entries.push({ type: "tr" });
      });
      return entries;
    })(),
  };
};

fieldView = (field, record) => {
  let value;

  switch (field.viewAs) {
    case "system":
      value = {
        type: "div",
        attributes: field.attributes,
        content: field.content,
      };

      break;
    case "button":
      value = {
        type: "input",
        attributes: field.attributes,
        events: field.events,
      };
      let att = { ...field.attributes };
      field.data ? (att.data = record[field.data]) : false;
      value.attributes = att;

      break;
    case "text":
      break;

    case "select":
      break;

    case "number":
      break;

    case "date":
      value = {
        type: "div",
        content: { innerText: record[field.name].toString().substr(0, 10) },
      };
      break;

    default:
      value = {
        type: "div",
        content: {
          innerText:
            (field.prefix ? field.prefix : "") +
            record[field.name] +
            (field.suffix ? field.suffix : ""),
        },
      };
      break;
  }

  return value;
};

// <div  style="border-right:1px solid #ccc; padding:10px;">
// <div    class="p10 menuLink"    onclick="window.location.href='latestLots.html'"  style="font-weight:bold"  > » Latest Lots     </div>
// <div    class="p10 menuLink"    onclick="window.location.href='sales.html'"                                 > » Sales Profile   </div>
// <div    class="p10 menuLink"    onclick="window.location.href='bid.html'"                                   > » Bidding Profile </div>
// <div    class="p10 menuLink"    onclick="window.location.href='profile.html'"                               > » Profile         </div>
// <div    class="p10 menuLink"    onclick="window.location.href='account.html'"                               > » Account         </div>
// </div>

inlineMenu = (options) => {
  return {
    type: "div",
    attributes: { style: styles.inlineMenu },
    elements: ((optins) => {
      let entries = [];
      options.items.forEach((item) => {
        entries.push({
          type: "a",
          attributes: { href: item.url, style: styles.inlineMenuItem },
          content: { innerHTML: item.caption },
        });
      });
      return entries;
    })(),
  };
};

openPage = (url) => {
  let a = document.createElement("a");
  a.href = url;
  a.click();
};

textInputWithImage = (options) => {
  return {
    type: "div",
    attributes: { class: "textBox", style: "display:flex" },
    elements: [
      { type: "div", attributes: { class: "mlr5" } },
      {
        type: "img",
        attributes: { style: "width: 12px;", src: options.src, class: "mlr5" },
      },
      textInput(options),
    ],
  };
};

textInput = (options) => {
  return {
    type: options.type || "div",
    attributes: options.attributes || {
      class: "textBox",
      style: "display:grid",
    },
    elements: [
      {
        type: "input",
        attributes: options.attributes,
        events: mergeObjects(options.events, {
          focusout: function () {
            // if (!this.value) {
            //   this.getAttribute("isRequired");
            // }
            // console.log(this.getAttribute("isRequired"));
          },
        }),
      },
      // { type: 'div', attributes: {style:'color: var(--white); display: none;' }, content:{innerText: "Field is required."} },
    ],
  };
};

// textInput = (options) => {
//   return {
//     type: "div",
//     attributes: { class: "textBox", style: "display:grid; border-radius: 10px;" },
//     elements: [
//       {
//         type: "input",
//         attributes: options.attributes,
//         events: mergeObjects(options.events, {
//           focusout: function () {
//             if (!this.value) {
//               this.getAttribute("isRequired");
//             }
//             console.log(this.getAttribute("isRequired"));
//           },
//         }),
//       },
//       // { type: 'div', attributes: {style:'color: var(--white); display: none;' }, content:{innerText: "Field is required."} },
//     ],
//   };
// };

text = (options) => {
  return {
    type: typeof options.type != "undefined" ? options.type : "div",
    attributes: options.attributes,
    content: { innerText: options.text },
  };
};

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

let gap = {
  type: "div",
  attributes: { class: "grow ptm10", style: "height: 40px;" },
};

let grow = {
  type: "div",
  attributes: { class: "grow", style: "" },
};

let toolbar = {
  type: "div",
  attributes: {
    class: "flex vCenter p10",
    style: "background: var(--gradientPurple);",
  },
  elements: [
    image({ href: "index.html", src: "images/logo.svg" }),
    { type: "div", attributes: { class: "grow" } },
    anchor({
      href: "contactus.html",
      text: "Contact",
      style: "color: var(--white);",
    }),
    { type: "div", attributes: { class: "mlr5" } },
    anchor({
      href: "signin.html",
      text: "Sign in",
      style: "color: var(--white);",
    }),
    { type: "div", attributes: { class: "mlr5" } },
  ],
};

footer = () => {
  return {
    type: "div",
    attributes: { class: "p20 flex vCenter", style: "font-size:12px;" },
    elements: [
      {
        type: "img",
        attributes: { src: "images/logo.svg", class: "logo mlr5" },
      },
      { type: "div", content: { innerText: "Copy © 2022, rights reserved" } },
      { type: "div", attributes: { class: "grow" } },
      {
        type: "div",
        attributes: { class: "mlr5" },
        content: { innerText: "Privacy Policy" },
        events: {
          click: function () {
            openPage("privacyPolicy.html");
          },
        },
      },
      {
        type: "div",
        attributes: { class: "mlr5" },
        content: { innerText: "Terms and Conditions" },
        events: {
          click: function () {
            openPage("termsAndConditions.html");
          },
        },
      },
      {
        type: "div",
        attributes: { class: "mlr5" },
        content: { innerText: "Contact" },
        events: {
          click: function () {
            openPage("contactus.html");
          },
        },
      },
    ],
  };
};

function mergeObjects(o1, o2) {
  if (o1) {
    for (key1 in o1) {
      for (key2 in o2) {
        key1 == key2 && key1 != "id"
          ? (o1[key1] += " " + o2[key2])
          : (o1[key2] = o2[key2]);
      }
    }
  } else {
    o1 = o2;
  }

  return o1;
}
var countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central Arfrican Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauro",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

// function autocomplete(inp, arr) {
//   /*the autocomplete function takes two arguments,
//   the text field element and an array of possible autocompleted values:*/
//   var currentFocus;
//   /*execute a function when someone writes in the text field:*/
//   inp.addEventListener("input", function (e) {
//     var a, b, i, val = this.value;
//     /*close any already open lists of autocompleted values*/
//     closeAllLists();
//     if (!val) {
//       return false;
//     }
//     currentFocus = -1;
//     /*create a DIV element that will contain the items (values):*/
//     a = document.createElement("DIV");
//     a.setAttribute("id", this.id + "autocomplete-list");
//     a.setAttribute("class", "autocomplete-items");
//     /*append the DIV element as a child of the autocomplete container:*/
//     let le = document.getElementById('resultContiner')
//     console.log(le);
//     le.appendChild(a);
//     /*for each item in the array...*/
//     for (i = 0; i < arr.length; i++) {
//       /*check if the item starts with the same letters as the text field value:*/
//       if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//         /*create a DIV element for each matching element:*/
//         b = document.createElement("DIV");
//         b.style = 'border-bottom: 1px solid #d4d4d4; padding: 10px;';
//         /*make the matching letters bold:*/
//         // b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//         // b.innerHTML += arr[i].substr(val.length);
//         /*insert a input field that will hold the current array item's value:*/
//         // b.innerHTML += "<input type='hidden' style='color: black;' value='" + arr[i] + "'>";
//         console.log(autocompleteItem(arr[i]))
//         b.innerHTML += autocompleteItem(arr[i]);
//         /*execute a function when someone clicks on the item value (DIV element):*/
//         b.addEventListener("click", function (e) {
//           /*insert the value for the autocomplete text field:*/
//           inp.value = this.getElementsByTagName("input")[0].value;
//           /*close the list of autocompleted values,
//               (or any other open lists of autocompleted values:*/
//           closeAllLists();
//         });
//         a.appendChild(b);
//       }
//     }
//   });
//   /*execute a function presses a key on the keyboard:*/
//   inp.addEventListener("keydown", function (e) {
//     var x = document.getElementById(this.id + "autocomplete-list");
//     if (x) x = x.getElementsByTagName("div");
//     if (e.keyCode == 40) {
//       /*If the arrow DOWN key is pressed,
//         increase the currentFocus variable:*/
//       currentFocus++;
//       /*and and make the current item more visible:*/
//       addActive(x);
//     } else if (e.keyCode == 38) {
//       //up
//       /*If the arrow UP key is pressed,
//         decrease the currentFocus variable:*/
//       currentFocus--;
//       /*and and make the current item more visible:*/
//       addActive(x);
//     } else if (e.keyCode == 13) {
//       /*If the ENTER key is pressed, prevent the form from being submitted,*/
//       e.preventDefault();
//       if (currentFocus > -1) {
//         /*and simulate a click on the "active" item:*/
//         if (x) x[currentFocus].click();
//       }
//     }
//   });
//   function addActive(x) {
//     /*a function to classify an item as "active":*/
//     if (!x) return false;
//     /*start by removing the "active" class on all items:*/
//     removeActive(x);
//     if (currentFocus >= x.length) currentFocus = 0;
//     if (currentFocus < 0) currentFocus = x.length - 1;
//     /*add class "autocomplete-active":*/
//     x[currentFocus].classList.add("autocomplete-active");
//   }
//   function removeActive(x) {
//     /*a function to remove the "active" class from all autocomplete items:*/
//     for (var i = 0; i < x.length; i++) {
//       x[i].classList.remove("autocomplete-active");
//     }
//   }
//   function closeAllLists(elmnt) {
//     /*close all autocomplete lists in the document,
//     except the one passed as an argument:*/
//     var x = document.getElementsByClassName("autocomplete-items");
//     for (var i = 0; i < x.length; i++) {
//       if (elmnt != x[i] && elmnt != inp) {
//         x[i].parentNode.removeChild(x[i]);
//       }
//     }
//   }
//   /*execute a function when someone clicks in the document:*/
//   document.addEventListener("click", function (e) {
//     closeAllLists(e.target);
//   });
// }

autoCompleteItem = (title, details, qty, events) => {
  return {
    type: "div",
    attributes: { class: "" },
    elements: [
      textInput({
        attributes: { type: "hidden", value: title, style: "color: black;" },
      }),
      text({
        text: title,
        attributes: {
          class: "noBorder fs16 f800",
          style: "color: #1D293F; font-size: 15px; font-weight: 800;",
        },
      }),
      {
        type: "div",
        attributes: { style: "align-items: flex-end;", class: "flex noBorder" },
        elements: [
          text({ text: details, attributes: { class: "noBorder", style: "" } }),
          grow,
          text({
            text: "45% discount.",
            attributes: { class: "black", style: "" },
          }),
          text({
            text: `Qty: ${qty}`,
            attributes: { class: "mlr10 black", style: "" },
          }),
          {
            type: "input",
            attributes: {
              class: "addButton",
              type: "button",
              value: "Add",
              style: "width: 120px;",
            },
            events: {
              click: function () {
                // renderAsync(modal({ width: '350px;', height: '200px', src: 'bidNow.html' }), document.body)
                openPage("dealDetails.html");
              },
            },
          },
          // textInput({title: 'Add', type: 'button', attributes: { class:'addButton', style:'' }}),
          // {type: 'div', attributes:{ type:'button', class: 'addButton', value:'Add' }}
        ],
      },
    ],
    events: events,
  };
};

autocompleteItem = (title, details, qty) => {
  return `
    <input type='hidden' style='color: black;' value='${title} '>
    <div class='noBorder' style='color: #1D293F; font-size: 15px; font-weight: 800;'> ${title} </div>
    <div class="flex noBorder" style="align-items: flex-end;">
        <div class="noBorder"> ${details} </div>
        <div class="grow"></div>
        <div>45% discount.</div>
        <div class="mlr10">Qty: ${qty}</div>
        <input type="button" class="addButton"  value="Add">
    </div>
`;
};

let autoComplete = function (attributes) {
  !attributes.displayField ? (attributes.displayField = "name") : false;
  !attributes.valueField ? (attributes.valueField = "id") : false;
  !attributes.data ? (attributes.data = load(field.name)) : false;

  let results = [];

  let element = {
    type: "div",
    attributes: mergeObjects(attributes.container, { class: "autoComplete" }),
    elements: [
      {
        type: "input",
        attributes: mergeObjects(attributes.input, {
          type: "text",
          autoComplete: "off",
        }), //, style: `background:url(${assetsPath}down-arrow.png) no-repeat  center   ; background-position-x:98%;`
        events: {
          dblclick: function () {
            this.nextSibling.style.display =
              this.nextSibling.style.display == "block" ? "none" : "block";
          },
          DOMNodeInserted: function () {
            for (ev in attributes.input.events) {
              this.addEventListener(ev, attributes.input.events[ev]);
            }
            attributes.data.forEach((entry, index) => {
              if (
                entry[attributes.valueField] ==
                this.getAttribute("selectedValue")
              ) {
                this.value = entry[attributes.displayField];
                this.setAttribute(
                  "selectedText",
                  entry[attributes.displayField]
                );
              }
            });
          },

          input: function () {
            resultsFound = false;
            [].slice.call(this.nextSibling.children).forEach((item) => {
              item.classList.remove("selected");
              if (
                item.innerText.toLowerCase().includes(this.value.toLowerCase())
              ) {
                item.style.display = "block";
                resultsFound = true;
              } else {
                item.style.display = "none";
              }
            });
            this.index = -1;
            results = this.nextSibling.querySelectorAll(
              '[style="display: block;"]'
            );
            resultsFound ? (this.nextSibling.style.display = "block") : false;
            this.value == ""
              ? (this.nextSibling.style.display = "none")
              : false;
          },
          keydown: function (e) {
            switch (e.keyCode) {
              case 38:
                [].forEach.call(results, function (el) {
                  el.classList.remove("selected");
                });
                this.index =
                  this.index == -1 || this.index == 0
                    ? results.length - 1
                    : this.index - 1;
                results[this.index].classList.add("selected");

                break;
              case 40:
                [].forEach.call(results, function (el) {
                  el.classList.remove("selected");
                });
                this.index =
                  this.index == results.length - 1 ? 0 : this.index + 1;
                results[this.index].classList.add("selected");
                break;

              case 13:
                this.value = results[this.index].innerText;
                this.nextSibling.style.display = "none";

                this.setAttribute(
                  "selectedValue",
                  results[this.index].getAttribute("value")
                );
                this.setAttribute("selectedText", this.value);
                // element.selectedValue = results[this.index].getAttribute('value');
                element.elements[0].attributes.selectedValue =
                  results[this.index].getAttribute("value");
                break;

              default:
                break;
            }
          },
        },
      },

      {
        type: "div",
        attributes: { id: "rc", class: "autocomplete-items" },
        elements: (function () {
          let items = [];
          attributes.data.forEach((entry, index) => {
            items.push({
              type: "div",
              attributes: {
                class: "item",
                index: index,
                value: entry[attributes.valueField],
                datatype: entry.type,
              },
              content: { innerHTML: entry[attributes.displayField] },
              events: {
                click: function () {
                  this.parentNode.previousSibling.value = this.innerText;
                  this.parentNode.style.display = "none";
                  this.parentNode.previousSibling.setAttribute(
                    "selectedValue",
                    this.getAttribute("value")
                  );
                  this.parentNode.previousSibling.setAttribute(
                    "selectedText",
                    this.innerText
                  );
                  element.elements[0].attributes.selectedValue =
                    this.getAttribute("value");
                  var event = new Event("change");
                  this.parentNode.previousSibling.dispatchEvent(event);
                },
              },
            });
          });
          return items;
        })(),
      },
    ],
    //maybe variable
    selectedValue: function () {
      return this.elements[0].attributes.selectedValue;
    },
  };

  return element;
};
