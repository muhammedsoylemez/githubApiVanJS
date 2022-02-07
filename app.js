// Elementleri seçme


const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");


const github = new Github();
const ui = new UI();


eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}


function getData(e) {
    let username = nameInput.value.trim();



    if (username === "") {
        alert("Lütfen geçerli bir kullanıcı adı girin")
    }else{  
        github.getGithubData(username)
        .then(response => {
            if (response.user.message === "Not Found") {
                // Hata Mesajı
            }else{
                ui.addSearchedUsersToUi(username); // Storage'dan önce çağırmamız gerekiyor.
                // Eğer yukarıdaki satırı storage.add 'ten sonra yazarsak hata alırız.
                // sebep ?!
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => console.log(err))
    }

    ui.clearInput();
    e.preventDefault();

}


function clearAllSearched() {
    // Tüm arananları temizle
    if (confirm("Emin misiniz")) {
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUi();
    }
}


function getAllSearched() {
    // Arananları storagedan al ve ui'a ekle
    let users = Storage.getSearchedUsersFromStorage();
    let result = ""
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li> 
        result += `
    <li class="list-group-item">${user}</li> 
        
        `
    });

    lastUsers.innerHTML = result;
}