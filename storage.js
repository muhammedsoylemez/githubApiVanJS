class Storage{
   
    // herhangi bir obje üretmeyeceğiz herhangi bir özelliği olmayacak yalnızca iki metodumuz olacak
    // metodlarımız statik olacak
    static getSearchedUsersFromStorage(){
        //Tüm kullanıcıları al 
        let  users;
        if (localStorage.getItem("searched") === null) {
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem("searched"));

        }

        return users;

    }

    static addSearchedUserToStorage(username){
        // Kullanıcı Ekle
        let users = this.getSearchedUsersFromStorage();
        if (users.indexOf(username) === -1) {
            users.push(username);
        }


        localStorage.setItem("searched",JSON.stringify(users))
    }

    static clearAllSearchedUsersFromStorage(){
        localStorage.removeItem("searched");
    }

}