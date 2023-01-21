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

    if(user != null) {
        document.getElementsByClassName("buttons")[0].style = "display: none;";
        document.getElementById("loginedUser").textContent = "Hi, " + user;
    }

    // зареждане на блог
    dataStored = JSON.parse(localStorage.getItem("list"));

    let openBlog = blog.children[1];
    let date = blog.children[2];
    let text = blog.children[3];
    let image = blog.children[0];

    let topic = localStorage.getItem("bloG");

    dataStored.forEach(element => {
        if (element.title === topic) {
            openBlog.textContent = element.title;
            date.textContent = "Created on: " + element.date;
            text.textContent = element.text;
            image.src = element.image;

            nameBlog = element.title;

            // console.log(element.title);
            // console.log(topic);

            // element.comments.forEach(element1 => {
            //     templateComment(element1);
            // });

            console.log(nameBlog);

            // Check for saved wishlist items
            const saved = localStorage.getItem(nameBlog);

            // If there are any saved items, update our list
            if (saved) {
                comments.innerHTML = saved;
            }

        }

    });

});

// добавяне на коментар
addCommentsBtn.addEventListener("click", event => {

    if(user != null) {
        let text = document.getElementsByTagName("textarea")[0];

        const data = {
            date: new Date(),
            comment: text.value,
            user: user
        };

        event.preventDefault();
        templateComment(data);

        text.value = "";

        dataStored.forEach(element => {
            console.log("vlez 1");
            if(element.title == nameBlog) {
                console.log("vlez 2");
                element.comments.push(data);
            }
        });

        localStorage.setItem("list", JSON.stringify(dataStored));
        // Save the list to localStorage
        console.log(comments.innerHTML)
        localStorage.setItem(nameBlog, comments.innerHTML);
    } else {
        alert("To write comments you should be registered");
    }
})