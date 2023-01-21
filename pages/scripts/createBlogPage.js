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

    if(nameArticle != "" && details != "" && image != ""){

        let newBlog = {
            "title": nameArticle,
            "date": new Date(),
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




