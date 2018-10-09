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

const url = 'https://jsonplaceholder.typicode.com';
const xhr = new XMLHttpRequest();
// xhr.open('get', `${url}/users`);
xhr.open('get', `${url}/photos`);
xhr.setRequestHeader("Content-type", "application/json");
xhr.setRequestHeader("Content-Encoding", "gzip");
xhr.send();
xhr.addEventListener('load', () => {

    const users = JSON.parse(xhr.responseText);

    users.forEach((user) => getInfoUser(user));

});


xhr.addEventListener('error', () => {
    console.error(`Произошла ошибка соединения по адрессу ${url}`);
});








//Пробежаться по массиву
//



function addUserInfo(userInfo) {
    const allUsers = document.querySelector('.users');
    allUsers.insertAdjacentHTML('beforeend', userInfo);
}

function parseDeep(user) {
    let info='';
    for (let key in user) {
        if (typeof user[key] !== 'object' ) {
            info += `<li><b>${key} :</b> <span>${user[key]}</span></li>`;
        }else{
            info += `<ul><li><b>${key} :</b> <span>${parseDeep(user[key])}</span></li></ul>`;
        }
    }
    return info;
}

function getInfoUser(user) {
    let name;
    let id;
    let userInfo = '';
    let info;
    name = user['name'];
    id = user['id'];

    userInfo = parseDeep(user);

    info =
        `
        <div data-set="${id}">
            <h2>${name}</h2>
            <ul>
                ${userInfo}
            </ul>
        </div>
    `;

    addUserInfo(info);
}





