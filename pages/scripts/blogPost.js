const blog = document.getElementsByClassName("blog")[0];
const commentsList = document.getElementsByClassName("comments")[0];
const addCommentsBtn = document.getElementById("addComment");
const blogPage = document.getElementsByClassName("blogPage")[0];
let dataStored = [];
let nameBlog = "";
let user = localStorage.getItem("email");
let logned = false;

// темплейт за показване на коментарите
function templateComment(data) {
    commentsList.insertAdjacentHTML("beforeend", `
            <li>
                <img id="removeComment" src="../images/bin.png" style="width: 48px; height: 48px;" />
                <h2>потребител: ${data.user}</h2>
                <p>час: ${data.date}</p>
                <p>${data.comment}</p>
            <li>`);

}

// показване на рейтинга на блог
function setRating(numberStar) {
    for (let i = 1; i <= numberStar; i++) {
        document.getElementById(i.toString()).innerHTML = '&#9733';
    }

    if(numberStar == null) {
        document.getElementById("currentRating").textContent = "0 / 5";
    } else {
        document.getElementById("currentRating").textContent = numberStar + " / 5";
    }
}

// премахване на коментар, блог и промяна на блог 
document.addEventListener("click", event => {

    // премахване на коментар
    if(event.target.id == "removeComment" && logned == true){
        console.log(event.target.parentElement);
        console.log(event.target.parentElement.children[2].textContent);
        event.target.parentElement.remove();

        dataStored.forEach(element => {
            if (element.title == nameBlog) {
                element.comments.forEach(commentEl => {
                    if(commentEl.comment == event.target.parentElement.children[3].textContent) {
                        const index = element.comments.indexOf(commentEl);
                        element.comments.splice(index, 1);
                        localStorage.setItem("list", JSON.stringify(dataStored));

                        if(element.comments.length == 0){
                            document.getElementsByClassName("comments")[0].style = "display: none;";
                        }
                    }
                })
            }
        });
    }

    // премахване на блог
    if(event.target.id == "removeBlog") {
        console.log(blog.children[2].textContent);
        dataStored.forEach(element => {
            if(element.title == blog.children[2].textContent) {
                const index = dataStored.indexOf(element);
                dataStored.splice(index, 1);
                localStorage.setItem("list", JSON.stringify(dataStored));
                backToMain();
            }
        })
    }

    // промяна на блог
    let newText = document.getElementById("editedBlog");
    let oldText = blog.children[4];
    if(event.target.id ==  "editBlog"){
        document.getElementsByClassName("edit")[0].style = "display: block;";
        newText.value = oldText.textContent;
    }

    if(event.target.id == "addEditedBlog"){
        if(newText.value != ""){
            oldText.textContent = newText.value;
            document.getElementsByClassName("edit")[0].style = "display: none;";
        }
    }

    //рейтинг
    if(event.target.parentElement.className == "rating" && logned == true){
        let numberStar = event.target.id;

        for (let i = 1; i <= 5; i++) {
            document.getElementById(i.toString()).innerHTML = '&#9734';
        }

        setRating(numberStar);

        localStorage.setItem(nameBlog + "Rating", numberStar);
    }

})

document.addEventListener('DOMContentLoaded', () => {

    // аутентикиране на потребител
    if (user != null) {
        document.getElementById("loginedUser").textContent = "Hi, " + user;
        document.getElementById("loginedUserMobile").textContent = "Hi, " + user;
        document.getElementsByClassName("notLogin")[0].style = "display: none;";
        document.getElementsByClassName("menuPhone")[0].getElementsByClassName("notLogin")[0].style = "display: none;";
        document.getElementsByClassName("buttons")[0].style = "display: block;";
        document.getElementsByClassName("menuPhone")[0].getElementsByClassName("buttons")[0].style = "display: block;";
        document.getElementById("removeBlog").style = "text-align: center;";
        document.getElementById("editBlog").style = "text-align: center;";
        logned = true;
    } else {
        document.getElementsByClassName("notLogin")[0].style = "display: block;";
        document.getElementsByClassName("menuPhone")[0].getElementsByClassName("notLogin")[0].style = "display: block;";
        document.getElementsByClassName("buttons")[0].style = "display: none;";
        document.getElementsByClassName("menuPhone")[0].getElementsByClassName("buttons")[0].style = "display: none;";
        document.getElementById("removeBlog").style = "display: none;";
        document.getElementById("editBlog").style = "display: none;";
        logned = false;
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

            element.comments.forEach(element1 => {
                templateComment(element1);
            });

            if(element.comments.length == 0){
                document.getElementsByClassName("comments")[0].style = "display: none;";
            }

            let getRating = localStorage.getItem(nameBlog + "Rating");
            setRating(getRating);
        }

    });

});

let textar = document.getElementById("newComment");

// броя на символите въведени в текстовото поле
textar.addEventListener("keydown", event => {
    let symbolLen = event.target.value.length + 1;

    let symbols = document.getElementById("symbols");
    //console.log(symbolLen);
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
        let text = document.getElementById("newComment");

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
                if(element.comments.length == 1){
                    document.getElementsByClassName("comments")[0].style = "display: block;";
                }
            }
        });

        localStorage.setItem("list", JSON.stringify(dataStored));

    } else {
        alert("To write comments you should be registered");
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