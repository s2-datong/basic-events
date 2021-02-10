let events = [];
let event_types = [];
async function init(){
    const token = localStorage.getItem('token');
    if(token){
        Navigation.GoToPage('admin-home');
        InitAdminHome();
    }else{
        GetEvents();
    }
}

init();

async function GetEvents(admin){
    events = await ListEvents();
    const eventsChanged = new CustomEvent('events-change', {
        detail: { events, admin }
    });
    document.dispatchEvent(eventsChanged);
}

async function GetEventTypes(admin){
    event_types = await ListEventTypes();
    RenderEventTypes(event_types);
    const eventTypeChanged = new CustomEvent('event-types-changed', {
        detail: { event_types, admin }
    });
    document.dispatchEvent(eventTypeChanged);
}

async function AdminLogin(event){
    event.preventDefault();
    const page = document.querySelector('#admin-login');
    const email = page.querySelector('input[type=email]').value;
    const password = page.querySelector('input[type=password]').value;
    try{
        const user = await Login(email, password);
        if(user.roles.includes('admin')){
            Navigation.GoToPage('admin-home');
            InitAdminHome();
        }
    }
    catch(e){
        //
    }
}

function InitAdminHome(){
    GetEvents(true);
    GetEventTypes(false);
}