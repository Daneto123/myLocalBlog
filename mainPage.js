const ul = document.getElementsByTagName("ul");
const section = ul[0];
var dataStored = [];
let have = false;

// зареждане на темите от json файл

fetch('./database/localStorage.json')
    .then(response => response.json())
    .then(data => {
        if (dataStored.length < 2) {
            have = true;
            data.forEach(element => {
                dataStored.push(element);
            });
        }

        if(have == true){
            localStorage.setItem("list", JSON.stringify(dataStored));
        }    
    })
    .catch(error => console.log(error));

// аутентикиране ---------------------------------------------------------------
const user = localStorage.getItem("email");

if(user != null) {
    document.getElementsByClassName("buttons")[0].style = "display: none;";
    document.getElementById("loginedUser").textContent = "Hi, " + user;
}

// презареждане на блогове -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    let data3 = JSON.parse(localStorage.getItem("list"));
    if (data3 !== null) {
        dataStored = data3;
        console.log(dataStored);
    }

    // <img src="${element.image}" alt="image"/>
    dataStored.forEach(element => {
        let newSection = document.createElement("section");
        newSection.innerHTML = `
        <img src="${element.image}" alt="image"/>
        <h2>${element.title}</h2>
        <div class="additionalInformation">
            <p>${element.date}</p>
            <p>коментари: <b>${element.comments.length}</b></p>
        </div>
        `

        //console.log(newSection);
        section.appendChild(newSection);
    });

});

// зареждане на информацията за всеки блог и коментарите от json фаелът -------
section.addEventListener("click", event => {

    let element = event.target.parentElement;

    if (element.tagName.toLowerCase() !== 'section') {
        element = element.parentElement;
    }

    if(element.tagName.toLowerCase() === 'section') {
        localStorage.setItem("bloG", element.children[1].textContent);

        console.log(element)
        window.location.href = "http://127.0.0.1:5500/pages/blogPost.html";
    }

})