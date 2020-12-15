template0 = document.getElementsByTagName("template")[0].content.querySelector("div");
template1 = document.getElementsByTagName("template")[1].content.querySelector("div");
function addContent(content){
  a = document.importNode(template0, true);
  a.innerText = content;
  document.body.appendChild(a);
}
function addArray(array){for (const [index, value] of Object.entries(array)) {addContent(value)}}
function addDict(dict){for (const [key, value] of Object.entries(dict)) {addContent(`${key} :\t${value}`)}}
function addTitleContent(title, content){
    a = document.importNode(template1, true);
    a.querySelector("span[class*=template_title]").innerText = title;
    a.querySelector("div[class*=template_content]").innerText = content;
    document.body.appendChild(a);
}
async function loadfileandshowcontent(filename){
    try{
        var foldername = "notes";
        var full_path = `${foldername}/${filename}.txt`;
        const response = await fetch(full_path);
        const data = await response.text();
        addTitleContent(filename.replace("_", " "), data);
//        fetch(full_path)
//            .then(response => response.text())
//            .then(data => addTitleContent(filename.replace("_", " "), data));
    } catch(err){
        console.error(err);
    }
}

var myArrBlank = ["", "", ""]; addArray(myArrBlank);
var myArrTitle = ["These are just notes - Things that happen in my head"]; addArray(myArrTitle);
var myArrBlank = [""]; addArray(myArrBlank);
var myStuff = {
    "web hosting": "simple local server - javascript - nginx",
    "that's where this is -> go pull-request": "https://github.com/FrenchCommando/homepage",
}; addDict(myStuff);
var myArrBlank = [""]; addArray(myArrBlank);
loadfileandshowcontent("web_hosting");
loadfileandshowcontent("social_media");
var myArrBlank = [""]; addArray(myArrBlank);
var myArr = ["Audi", "BMW", "Ford", "Honda", "Jaguar", "Nissan", "Tesla"]; addArray(myArr);
var myArrBlank = [""]; addArray(myArrBlank);
