const input = document.querySelector(".search__input");
const searchLists = document.querySelector(".search__lists");
const repoLists = document.querySelector(".lists");

function renderRepo(item) {
    item.forEach(repo => {
        const li = document.createElement("li");
        li.classList.add("search__list");
        li.textContent = repo.name;
        searchLists.appendChild(li);
        li.addEventListener("click", () => {
            input.value = "";
            li.remove();
            const list = document.createElement("div");
            repoLists.appendChild(list);
            const listInner = document.createElement("div");
            list.appendChild(listInner);
            list.classList.add("list");

            const title = document.createElement("h5");
            title.textContent = `Name: ${repo.name}`;
            listInner.appendChild(title);

            const owner = document.createElement("p");
            owner.textContent = `Owner: ${repo.owner.login}`;
            listInner.appendChild(owner);

            const stars = document.querySelector("p");
            stars.textContent = `Stars: ${repo.stargazers_count}`;
            listInner.appendChild(stars);

            const btn = document.createElement("button");
            btn.classList.add("list-btn");
            list.appendChild(btn);
            btn.addEventListener("click", () => {
                list.remove();
            });

        })
    });
}

function debounce(callback, ms) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args);
        }, ms)
    }
}

input.addEventListener("keyup", debounce(async (e) => {
    let value = e.target.value.trim();
    let obj = await fetch(`https://api.github.com/search/repositories?q=${value}`);
    obj = await obj.json();
    let item;
    if (obj.items) {
        item = obj.items.slice(-5);
        renderRepo(item);
    }
    if (value === "") {
        searchLists.innerHTML = "";
    }
}, 600)
)