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
function addTitle(text){
  a = document.importNode(template0, true);
  h = document.createElement('div');
  h.className = 'section_header';
  h.innerText = text;
  a.appendChild(h);
  document.body.appendChild(a);
}
function addIconLink(name, link, iconClass){
  a = document.importNode(template0, true);
  icon = document.createElement('span');
  icon.className = `badge ${iconClass}`;
  a.appendChild(icon);
  aa = document.createElement('a');
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

// search bar prefixes - "gh nginx" searches github, bare text falls through to google
const searchPrefixes = {
  gh:    q => `https://github.com/search?q=${q}`,
  py:    q => `https://pypi.org/search/?q=${q}`,
  wiki:  q => `https://en.wikipedia.org/w/index.php?search=${q}`,
  yt:    q => `https://www.youtube.com/results?search_query=${q}`,
  so:    q => `https://stackoverflow.com/search?q=${q}`,
  mdn:   q => `https://developer.mozilla.org/en-US/search?q=${q}`,
  arxiv: q => `https://arxiv.org/abs/${q}`,
  map:   q => `https://www.google.com/maps/search/${q}`,
  amz:   q => `https://www.amazon.com/s?k=${q}`,
};
// hostname is the right label for most, but a few need spelling out
const searchPrefixLabels = { map: "google maps", arxiv: "arxiv.org id" };
function searchPrefixSite(prefix, builder){
  return searchPrefixLabels[prefix] || new URL(builder("")).hostname.replace(/^(www|en)\./, "");
}
function renderSearchHint(){
  const hint = document.getElementById("search_hint");
  if (!hint) return;
  const pairs = Object.entries(searchPrefixes)
    .map(([prefix, builder]) => `<code>${prefix}</code> ${searchPrefixSite(prefix, builder)}`)
    .join(" &middot; ");
  hint.innerHTML = `type a prefix to search elsewhere &mdash; ${pairs} &mdash; anything else goes to Google`;
}
function setupSearchPrefixes(){
  const form = document.querySelector("form.searchform");
  if (!form) return;
  const input = form.querySelector("input[name=q]");
  input.title = `prefixes: ${Object.keys(searchPrefixes).join(", ")}`;
  renderSearchHint();
  form.addEventListener("submit", function(event){
    const raw = input.value.trim();
    const space = raw.indexOf(" ");
    if (space < 0) return;
    const builder = searchPrefixes[raw.slice(0, space).toLowerCase()];
    if (!builder) return;
    const rest = raw.slice(space + 1).trim();
    if (!rest) return;
    event.preventDefault();
    window.open(builder(encodeURIComponent(rest)), form.target || "_blank");
  });
}
setupSearchPrefixes();

addBlank();
// var myArrTitle = ["These are just notes - Things that happen in my head"]; addArray(myArrTitle);
// var myStuff = {"web hosting": "simple local server - javascript - nginx",}; addDict(myStuff);

addTitle("Source Code")
addIconLink("this is the github repo for this page", "https://github.com/FrenchCommando/homepage", "badge-github")
addBlank();addBlank();

addTitle("Productivity Apps")
addIconLink("chrome extension allowing to open custom tab", "https://github.com/FrenchCommando/startup-extension", "badge-startup-extension")
addIconLink("pensine - a place for your thoughts", "https://frenchcommando.github.io/pensine/site/", "badge-pensine")
addIconLink("do-my-taxes", "https://frenchcommando.github.io/do-my-taxes/", "badge-do-my-taxes")
addIconLink("watch-me-buzz", "https://github.com/FrenchCommando/watch-me-buzz", "badge-watch-me-buzz")
addIconLink("latex-preview", "https://github.com/FrenchCommando/latex-preview", "badge-latex-preview")
addBlank();

addTitle("Quant projects")
addLink("volatility.fit", "https://volatility.fit/")
addIconLink("2piece - Dupire PDE knot", "https://frenchcommando.github.io/2piece/", "badge-github")
addIconLink("variance_factors", "https://github.com/FrenchCommando/variance_factors", "badge-github")
addIconLink("malliavin-ssr", "https://github.com/FrenchCommando/malliavin-ssr", "badge-github")
addBlank();
addBlank();

// loadfileandshowcontent("web_hosting");
// loadfileandshowcontent("social_media");
// loadfileandshowcontent("cognitive_dissonance");
// loadfileandshowcontent("retirement");
// loadfileandshowcontent("garbage");
// loadfileandshowcontent("chores");
