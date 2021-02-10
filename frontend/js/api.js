// make api calls to backend
const baseURL = "http://localhost:3000";

// EVENTS
async function ListEvents(page, limit, search){
    if(!page) page = 1;
    if(!limit) limit = 20;
    let url = `${baseURL}/v1/event?page=${page}&limit=${limit}`;
    if(search) url += `&search=${encodeURIComponent(search)}`;

    const result = await _get(url);
    return result;
}

async function GetSingleEvent(id){
    const url = `${baseURL}/v1/event/${id}`;
    const result = await _get(url);
    return result;
}

async function ListEventTypes(){
    const url = `${baseURL}/v1/event_type`;
    const result = await _get(url);
    return result;
}

// USER

async function Login(email, password){
    const url = `${baseURL}/v1/user/login`;
    const data = {email, password};
    const result = await _post(url, data, {'Content-type': 'application/json'});
    const {token, user} = result;
    localStorage.setItem('token', token);
    return user;
}

async function Register(firstname, lastname, email, password){
    const url = `${baseURL}/v1/user/register`;
    const data = {firstname, lastname, email, password};
    const result = await _post(url, data, {'Content-type': 'application/json'});
    return result;
}

// ADMIN

async function CreateEvent(name, description, event_types, date, venue){
    const url = `${baseURL}/v1/event`;
    const data = {name, description, event_types, date, venue};
    const token = localStorage.getItem('token');
    const result = await _post(url, data, {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return result;
}

async function UpdateEvent(id, name, description, event_types, date, venue){
    const url = `${baseURL}/v1/event/${id}`;
    const data = {name, description, event_types, date, venue};
    const token = localStorage.getItem('token');
    const result = await _patch(url, data, {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return result;
}

async function DeleteEvent(id){
    const url = `${baseURL}/v1/event/${id}`;
    const token = localStorage.getItem('token');
    const result = await _delete(url, null, {'Authorization': `Bearer ${token}`});
    return result;
}

async function CreateEventType(name, description){
    const url = `${baseURL}/v1/event_type`;
    const data = {name, description};
    const token = localStorage.getItem('token');
    const result = await _post(url, data, {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return result;
}

async function UpdateEventType(id, name, description){
    const url = `${baseURL}/v1/event_type/${id}`;
    const data = {name, description};
    const token = localStorage.getItem('token');
    const result = await _patch(url, data, {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return result;
}

async function DeleteEventType(id){
    const url = `${baseURL}/v1/event_type/${id}`;
    const token = localStorage.getItem('token');
    const result = await _delete(url, null, {'Authorization': `Bearer ${token}`});
    return result;
}