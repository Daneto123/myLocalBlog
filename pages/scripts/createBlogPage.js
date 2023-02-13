const name = document.getElementById("topic");
const details = document.getElementsByTagName("textarea")[0];
const tags = document.getElementById("tags");
const list = document.getElementById("listBlogFP");
var dataStored = [];

function showHide(className) {
    let menu = document.getElementsByClassName(className)[0];
    let menuStyle = menu.style.display;

    if (menuStyle == "flex" || menuStyle == "") {
        menuStyle = "none";
    } else {
        menuStyle = "flex";
    }
}

const user = localStorage.getItem("email");

if (user != null) {
    document.getElementById("loginedUser").textContent = "Hi, " + user;
    document.getElementById("loginedUserMobile").textContent = "Hi, " + user;
    document.getElementsByClassName("notLogin")[0].style = "display: none;";
    document.getElementsByClassName("menuPhone")[0].getElementsByClassName("notLogin")[0].style = "display: none;";
    document.getElementsByClassName("buttons")[0].style = "display: block;";
    document.getElementsByClassName("menuPhone")[0].getElementsByClassName("buttons")[0].style = "display: block;";
} else {
    document.getElementsByClassName("notLogin")[0].style = "display: block;";
    document.getElementsByClassName("menuPhone")[0].getElementsByClassName("notLogin")[0].style = "display: block;";
    document.getElementsByClassName("buttons")[0].style = "display: none;";
    document.getElementsByClassName("menuPhone")[0].getElementsByClassName("buttons")[0].style = "display: none;";
}

const submit = document.getElementById("submit");

submit.addEventListener("click", event => {

    let data3 = JSON.parse(localStorage.getItem("list"));
    if (data3 !== null) {
        dataStored = JSON.parse(localStorage.getItem("list"));
        // console.log(dataStored);
    }

    event.preventDefault();

    const nameArticle = document.getElementById("topic").value;
    const details = document.getElementById("detail").value;
    const image = document.getElementById("image").value;

    if (nameArticle != "" && details != "" && image != "") {

        var date = new Date();
        var hours = date.getHours();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes();
        var minutes = minutes < 10 ? "0" + minutes : minutes;
        var time = hours + "." + minutes + " " + ampm;
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var day = date.getDate();
        day = day < 10 ? "0" + day : day;

        var mDate = day + "." + month + "." + date.getFullYear();

        let newBlog = {
            "title": nameArticle,
            "date": "час: " + time + " / " + "дата: " + mDate,
            "text": details,
            "image": image,
            "comments": []
        }

        dataStored.push(newBlog);
        localStorage.setItem("list", JSON.stringify(dataStored));
        location.reload();
        window.location.href = "http://127.0.0.1:5500/mainPage.html";
    } else {
        alert("fill all fields");
    }


})

let phoneBtn = document.getElementsByClassName("sandButton")[0];

phoneBtn.addEventListener("click", event => {
    let menu = document.getElementsByClassName("menuPhone")[0];

    console.log(menu)

    if (menu.style.display == "flex" || menu.style.display == "") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
})


var mediaQueryList = window.matchMedia("(max-width: 600px)");

function screenTest(e) {
    if (e.matches) {
        let menu = document.getElementsByClassName("menuPhone")[0];

        console.log(menu)

        if (menu.style.display == "flex" || menu.style.display == "") {
            menu.style.display = "none";
        }
    }
}

mediaQueryList.addListener(screenTest);

let back = document.getElementById("backBtn");

back.addEventListener("click", event => {
    window.location.href = "http://127.0.0.1:5500/mainPage.html";
})