const name = document.getElementById("topic");
const details = document.getElementsByTagName("textarea")[0];
const tags = document.getElementById("tags");
const list = document.getElementById("listBlogFP");
var dataStored = [];

const submit = document.getElementById("submit");

submit.addEventListener("click", event => {

    let data3 = JSON.parse(localStorage.getItem("list"));
    if (data3 !== null) {
        dataStored = JSON.parse(localStorage.getItem("list"));
        console.log(dataStored);
    }

    event.preventDefault();

    const nameArticle = document.getElementById("topic").value;
    const details = document.getElementById("detail").value;
    const image = document.getElementById("image").value;

    console.log(nameArticle);
    console.log(details);
    console.log(image);

    if (nameArticle != "" && details != "" && image != "") {

        var date = new Date();
        var hours = date.getHours();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        var minutes = date.getMinutes();
        var minutes = minutes < 10 ? "0" + minutes : minutes;
        var time = hours + "." + minutes + " " + ampm;
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;

        var mDate = date.getDate() + "." + month + "." + date.getFullYear();

        let newBlog = {
            "title": nameArticle,
            "date": "час: " + time + " / " + "дата: " + mDate,
            "text": details,
            "image": image,
            "comments": []
        }

        dataStored.push(newBlog)
        console.log(dataStored);
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

