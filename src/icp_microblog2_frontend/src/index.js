import { icp_microblog2_backend } from "../../declarations/icp_microblog2_backend";


async function post() {
  let post_button = document.getElementById("post");
  let error = document.getElementById("error");
  post_button.disabled = true;
  error.innerText = "";
  let textarea = document.getElementById("message");
  let text = textarea.value;
  let otp = document.getElementById("otp").value;
  try {
    await icp_microblog2_backend.post(otp, text);
    error.innerText = "Post is successful!"
    textarea.value = ""
  } catch (err) {
    console.log(err);
    error.innerText = "Post Failed! <br> " + err;
  }
  
  post_button.disabled = false;
}


var num_posts = 0;

async function load_posts() {
  let posts = await icp_microblog2_backend.posts(0);

  console.log("post.length =" + posts.length);

  if (num_posts == posts.length) return;

  //populate HTML
  let post_section = document.getElementById("posts");  
  post_section.replaceChildren([]);
  var posts_table = document.createElement('table');
  for (var i=0; i<posts.length; i++) {
    var r = posts_table.insertRow(0); 
    var c = r.insertCell(0);
    c.innerHTML = posts[i].message ;
    c = r.insertCell(1);
    c.innerHTML = posts[i].time ;
    c = r.insertCell(2);
    c.innerHTML = posts[i].author;
  }
  var header = posts_table.createTHead();
  var headeR = header.insertRow(0);
  var headerC = headeR.insertCell(0);
  headerC.innerHTML = "##Message";
  headerC = headeR.insertCell(1);
  headerC.innerHTML = "##Time";
  headerC = headeR.insertCell(2);
  headerC.innerHTML = "##Author";
  post_section.appendChild(posts_table);

}

var num_follows = 0;
async function load_follows() {
  let follows = await icp_microblog2_backend.follows();

  console.log("follows.length =" + follows.length);

  if (num_follows == follows.length) return;

  //populate HTML
  let follows_section = document.getElementById("follows");  
  follows_section.replaceChildren([]);

  var follows_table = document.createElement('table');
  for (var i=0; i<follows.length; i++) {
    var r = follows_table.insertRow(0); 
    var c = r.insertCell(0);
    c.innerHTML = follows[i].pid ;
    c = r.insertCell(1);
    c.innerHTML = follows[i].name ;
  }
  var header = follows_table.createTHead();
  var headeR = header.insertRow(0);
  var headerC = headeR.insertCell(0);
  headerC.innerHTML = "#Priciple";
  headerC = headeR.insertCell(1);
  headerC.innerHTML = "##Name";

  follows_section.appendChild(follows_table);
  
}

var num_timeline = 0;
async function load_timeline() {
  let timeline = await icp_microblog2_backend.timeline(0);

  console.log("timeline.length =" + timeline.length);

  if (num_timeline == timeline.length) return;

  //populate HTML
  let timeline_section = document.getElementById("timeline");  

  timeline_section.replaceChildren([]);
  var timeline_table = document.createElement('table');
  for (var i=0; i<timeline.length; i++) {
    var r = timeline_table.insertRow(0); 
    var c = r.insertCell(0);
    c.innerHTML = timeline[i].message ;
    c = r.insertCell(1);
    c.innerHTML = timeline[i].time ;
    c = r.insertCell(2);
    c.innerHTML = timeline[i].author;
  }
  var header = timeline_table.createTHead();
  var headeR = header.insertRow(0);
  var headerC = headeR.insertCell(0);
  headerC.innerHTML = "##Message";
  headerC = headeR.insertCell(1);
  headerC.innerHTML = "##Time";
  headerC = headeR.insertCell(2);
  headerC.innerHTML = "##Author";
  timeline_section.appendChild(timeline_table);
}

function load() {
  let post_button = document.getElementById("post");
  post_button.onclick = post;

  load_follows();
  load_timeline();  
  load_posts();
  setInterval(load_posts, 3000);
}

window.onload = load