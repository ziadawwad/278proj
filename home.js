function submitted() {
    var text = document.getElementById("postText").value;
    var img = document.getElementById("fileUpload").value;
    if (text=="" && img == ""){
        alert("Cant submit an empty post!");
        return false;
    }
    else {
        return true;
    }
}

function postcomment(id) {
    text=document.getElementById(id+"_input").value;
    if(text!="") {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var d = new Date();
            d = new Date(d.getTime() - 3000000);
            var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
            var info = JSON.parse(this.responseText);
            var comment = "<div class='list-group-item list-group-item-action flex-column align-items-start'>\
                            <div class='d-flex w-100 justify-content-between'>\
                                <h5 class='mb-1'>" + "<a href=profile.php?user="+info[0] +">" + info[2] + " " + info[3] + "</a></h5>\
                                <small>" + date_format_str + "</small>\
                            </div>\
                            <p class='mb-1'>" + text + "</p>\
                        </div>";
            
            document.getElementById(id+"_input").value="";
            var comments = document.getElementsByName("list-group_" + id)[0];
            comments.innerHTML += comment;
        }
    }
        ajax.open("get","postcontent.php?id="+id+"&text="+text, true);
        ajax.send();
    }
    else {
        alert("Comment cant be empty");
    }
}

function deletepost(id) {
    id = id.replace("delete_","");
    var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Post deleted.");
                document.getElementById("post_"+id).style.display="none";
            }
        }
        ajax.open("get","postcontent.php?delete="+id, true);
        ajax.send();
}

function likepost(id) {
    var btn = document.getElementById(id);
    id = id.replace("likebutton_","");
    var nboflikes = document.getElementById("nboflikes");
    var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (btn.style.color == "green"){
                    btn.style.color = "";
                }
                else {
                    btn.style.color = "green";
                }
                var nb = JSON.parse(this.responseText);
                nboflikes.innerHTML = nb;
            }
        }
        if (btn.style.color == "green") {
            ajax.open("get","postcontent.php?unlike="+id, true);
        }
        else {
            ajax.open("get","postcontent.php?like="+id, true);
        }
        ajax.send();
}

function dislikepost(id) {
    var btn = document.getElementById(id);
    id = id.replace("dislikebutton_","");
    var nbofdislikes = document.getElementById("nbofdislikes");
    var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (btn.style.color == "red"){
                    btn.style.color = "";
                }
                else {
                    btn.style.color = "red";
                }
                var nb = JSON.parse(this.responseText);
                nbofdislikes.innerHTML = nb;
            }
        }
        if (btn.style.color == "red") {
            ajax.open("get","postcontent.php?undislike="+id, true);
        }
        else {
            ajax.open("get","postcontent.php?dislike="+id, true);
        }
        ajax.send();
}