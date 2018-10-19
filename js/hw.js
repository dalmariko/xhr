/**
 * AJAX (Asynchronous JavaScript And Xml);
 * GET  - получить информацию
 * POST - передать инфу на сервер
 * PUT - изменить сущкествующие данные
 * DELETE - удалить данные на сервере
 *
 * JSON
 */


// TODO: Сделать запрос на сервер по адресу "https://jsonplaceholder.typicode.com/users"

// TODO: Получить ответ преобразовать его из json в обычный массив объектов

// TODO: вывести на страницу список пользователей, выводить только имя (name)

// TODO: при клике на имя пользователя у меня должен открыться блок с подробной информацией об этом пользователе


// TODO Переписать на промисы домашнее задание по ajax с пользователями которое



erros={eror:[]};

function promisGetUsersInfo(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Content-Encoding", "gzip");
        xhr.send();

        xhr.addEventListener('load',() => {resolve(JSON.parse(xhr.responseText));} );
        xhr.addEventListener('error',() => reject(erros.eror =`Произошла ошибка соединения по адрессу ${url}`));

    })
}

function addUserInfo(userInfo) {
    const allUsers = document.querySelector('.users');
    allUsers.insertAdjacentHTML('beforeend', userInfo);
}

function parseDeep(user) {
    let info = '';
    for (let key in user) {
        if (typeof user[key] !== 'object') {
            info += `<li><b>${key} :</b> <span>${user[key]}</span></li>`;
        } else {
            info += `<ul><li><b>${key} :</b> <span>${parseDeep(user[key])}</span></li></ul>`;
        }
    }
    return info;
}

function promisGetUser(user) {
   return new Promise((resolve,reject)=>{
       let name;
       let id;
       let userInfo = '';
       let info;
       name = user['name'];
       id = user['id'];

       userInfo = parseDeep(user);

       info =
           `
        <div data-id="${id}">
            <h2 class="letsShow">${name}</h2>
            <ul class="hidden">
                ${userInfo}
            </ul>
        </div>
    `;

      resolve(info);
      reject(erros.eror=`Ошибка парсинга`)
   })
}

const url = 'https://jsonplaceholder.typicode.com/users';

promisGetUsersInfo(url)
    .then(users=>{
        users.forEach(user=>{
                       promisGetUser(user)
                       .then(userinfo=>addUserInfo(userinfo))
        })
    })
    .catch(err => console.error(erros.eror));


        const onNameCick = e =>{
            if (e.target.classList.contains('letsShow')){
                const div = e.target.closest('div');
                const id = div.dataset.id;
                const ul = document.querySelector(`div[data-id="${id}"] ul`);
                ul.classList.toggle('hidden');
            }
        };
        const userName = document.querySelector('.users');
        userName.addEventListener('click', onNameCick);

