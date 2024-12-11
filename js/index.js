document.addEventListener("DOMContentLoaded", init)

function init(){
    const userList = document.querySelector("#user-list")
    const reposList = document.querySelector("#repos-list")

    const form = document.querySelector("#github-form")
    form.addEventListener("submit", getUsers)


    function getUsers(eventObject){
        eventObject.preventDefault()
        const userInput = document.querySelector("#search")
        fetch(`https://api.github.com/search/users?q=${userInput.value}`)
        .then(resp => resp.json())
        .then(data => {
            data.items.forEach(addFoundUsersToDOM)
        })
    }

    function addFoundUsersToDOM(element){
        const user = document.createElement("div")
        /*
        const name = document.createElement("h3")
        name.textContent = element.login
        const avatar = document.createElement("img")
        avatar.src = element.avatar_url
        const profileLink = document.createElement("a")
        profileLink.href = element.url
        profileLink.textContent = "Link to profile"
        */
        user.innerHTML=`<h3>${element.login}</h3>
        <img src=${element.avatar_url}> <br>
        <a href=${element.url}>Link to profile</a>
        <br><br>`
        userList.appendChild(user)

        user.querySelector("h3").addEventListener("click", getUserRepos)

        function getUserRepos(){
            fetch(`https://api.github.com/users/${element.login}/repos`)
            .then(resp => resp.json())
            .then(data => {
                const userRepos = document.createElement("ul")
                reposList.appendChild(userRepos)
                data.forEach(item =>{
                    const repo = document.createElement("li")
                    repo.innerHTML = `<a href = ${item.url}> ${item.full_name} </a>`
                    userRepos.appendChild(repo)
                })
            })
        }
    }

    



}