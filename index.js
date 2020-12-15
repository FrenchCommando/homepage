template0 = document.getElementsByTagName("template")[0].content.querySelector("div");
template1 = document.getElementsByTagName("template")[1].content.querySelector("div");
function addContent(content){
  a = document.importNode(template0, true);
  a.innerText = content;
  document.body.appendChild(a);
}
function addBlank(){addContent("")}
function addArray(array){for (const [index, value] of Object.entries(array)) {addContent(value)}}
function addDict(dict){for (const [key, value] of Object.entries(dict)) {addContent(`${key} :\t${value}`)}}
function addLink(name, link){
  a = document.importNode(template0, true);
  aa = document.createElement('a');
  link_object = document.createTextNode(link);
  aa.appendChild(link_object);
  aa.innerText = name;
  aa.href = link;
  a.appendChild(aa);
  document.body.appendChild(a);
}
function showHide(row){
  var x = document.getElementById(row);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function addTitleContent(title, content){
    a = document.importNode(template1, true);
    content_object = a.querySelector("div[class*=template_content]");
    content_object.innerText = content;
    content_id = `content_object_${title}`;
    content_object.id = content_id;
    content_object.style.display = "none";
    title_object = a.querySelector("span[class*=template_title]");
    title_object.innerText = title.replace("_", " ");
    title_object.setAttribute("onClick", `showHide("${content_id}");`);
    document.body.appendChild(a);
}
async function loadfileandshowcontent(filename){
    try{
        var foldername = "notes";
        var full_path = `${foldername}/${filename}.txt`;
        const response = await fetch(full_path);
        const data = await response.text();
        addTitleContent(filename, data);
        addBlank();
    } catch(err){
        console.error(err);
    }
}

addBlank(); addBlank(); addBlank();
var myArrTitle = ["These are just notes - Things that happen in my head"]; addArray(myArrTitle);
addBlank();
var myStuff = {
    "web hosting": "simple local server - javascript - nginx",
}; addDict(myStuff);
addLink("that's where this is -> go pull-request", "https://github.com/FrenchCommando/homepage")
addBlank();
addBlank();
addBlank();

loadfileandshowcontent("web_hosting");
loadfileandshowcontent("social_media");
