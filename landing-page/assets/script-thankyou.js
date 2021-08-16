let url = document.location.href;
let emailAdd = url.split("email=");
let emailAddSpan = document.getElementById("client-add").innerHTML;
emailAddSpan += emailAdd[1].split("&")[0];
emailAddSpan = emailAddSpan.replace("%40", "@");

document.getElementById("client-add").innerHTML = emailAddSpan;