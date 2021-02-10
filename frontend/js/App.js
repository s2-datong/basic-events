let events = [];
async function init(){
    GetEvents();
}

init();

async function GetEvents(){
    events = await ListEvents();
    const eventsChanged = new CustomEvent('events-changed', {
        detail: { events }
    });
    document.dispatchEvent(eventsChanged);
}

async function AdminLogin(event){
    event.preventDefault();
    const page = document.querySelector('#admin-login');
    const email = page.querySelector('input[type=email]').nodeValue;
    const password = page.querySelector('input[type=password]').nodeValue;
    try{
        const user = await Login(email, password);
        if(user.roles.includes('admin')){
            Navigation.GoToPage('admin-home');
        }
    }
    catch(e){
        //
    }
}