const blog = document.getElementsByClassName("blog")[0];
const comments = document.getElementsByClassName("comments")[0];
const addCommentsBtn = document.getElementById("addComment");
const blogPage = document.getElementsByClassName("blogPage")[0];
let dataStored = [];
let user = localStorage.getItem("email");

function templateComment(data) {
    comments.insertAdjacentHTML("beforeend", `
                <h2>потребител: ${data.user}</h2>
                <p>час: ${data.date}</p>
                <p>${data.comment}</p>`);
}

document.addEventListener('DOMContentLoaded', () => {

    // аутентикиране на потребител

    if (user != null) {
        document.getElementById("loginedUser").textContent = "Hi, " + user;
        document.getElementById("loginedUserMobile").textContent = "Hi, " + user;
        document.getElementsByClassName("notLogin")[0].style = "display: none;";
    } else {
        document.getElementsByClassName("buttons")[0].style = "display: none;";
    }

    // зареждане на блог
    dataStored = JSON.parse(localStorage.getItem("list"));

    let openBlog = blog.children[2];
    let date = blog.children[3];
    let text = blog.children[4];
    let image = blog.children[1];

    let topic = localStorage.getItem("bloG");

    dataStored.forEach(element => {
        if (element.title === topic) {
            openBlog.textContent = element.title;
            date.textContent = "Created on: " + element.date;
            text.textContent = element.text;
            image.src = element.image;
            image.onerror = function() {
                this.Error = null; 
                this.src = '../images/default-image.jpg';
            };
            nameBlog = element.title;

            // console.log(element.title);
            // console.log(topic);

            // element.comments.forEach(element1 => {
            //     templateComment(element1);
            // });

            // Check for saved wishlist items
            const saved = localStorage.getItem(nameBlog);

            // If there are any saved items, update our list
            if (saved) {
                comments.innerHTML = saved;
            }

        }

    });

});

let textar = document.getElementsByTagName("textarea")[0];

// броя на символите въведени в текстовото поле
textar.addEventListener("keydown", event => {
    let symbolLen = event.target.value.length + 1;

    let symbols = document.getElementById("symbols");
    console.log(symbolLen);
    if(symbolLen == 1 && event.keyCode == 8) {
        symbols.innerText = 0 + "/ 200";
    } else if (symbolLen == 200 && event.keyCode == '8') {
        symbolLen -= 1;
        symbols.innerText = (symbolLen + 1) + "/ 200";
    } else if (symbolLen < 199 && event.keyCode == '8') {
        symbolLen -= 2;
        symbols.innerText = symbolLen + "/ 200";
    } else {
        symbols.innerText = symbolLen + "/ 200";
    }

    let messageLengthErr = document.getElementById("MessageLengthErr");

    if(symbolLen >= 200) {
        messageLengthErr.style = "display: block;";
        textar.style = "border: 5px solid red;";
    } else {
        messageLengthErr.style = "display: none;";
        textar.style = "border: 3px solid black;";
    }

})

// добавяне на коментар
addCommentsBtn.addEventListener("click", event => {

    if (user != null) {
        let text = document.getElementsByTagName("textarea")[0];

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

        const data = {
            date: time + " / " + "дата: " + mDate,
            comment: text.value,
            user: user
        };

        event.preventDefault();
        templateComment(data);

        text.value = "";

        dataStored.forEach(element => {
            if (element.title == nameBlog) {
                element.comments.push(data);

            }
        });

        localStorage.setItem("list", JSON.stringify(dataStored));
        // Save the list to localStorage
        localStorage.setItem(nameBlog, comments.innerHTML);
    } else {
        alert("To write comments you should be registered");
    }
})

let sandBtn = document.getElementsByClassName("sandButton")[0];

// бутони за телефон
sandBtn.addEventListener("click", event => {
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


function backToMain() {
    window.location.href = "http://127.0.0.1:5500/mainPage.html";
}