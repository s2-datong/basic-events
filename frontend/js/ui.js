function RenderEvents(_events){
    RemoveCardEvents();
    const div = document.querySelector('.list-events');
    div.innerHTML = "";
    let collector = "";
    _events.forEach(event => {
        const event_types = event.event_types.map(type => `<span>${type}</span>` );
        let standout = "";
        if(event.event_types.includes('Leap') || event.event_types.includes('Mission') || event.event_types.includes('Hackathon')){
            standout = "hightlight";
        }
        const template_dom = `
            <div class="card ${standout}" data-id="${event.id}">
                    <div class="title">
                        <h1>${event.name}</h1>
                        <p>${event.description}</p>
                    </div>
                    <div class="content">
                        <label>Date: </label>
                        <div>${new Date(event.date).toDateString()}</div>
                        <label>Venue</label>
                        <div>${event.venue}</div>
                        <label>Event Type</label>
                        <div>${event_types.join('')}</div>
                    </div>
                </div>
        `;
        collector += template_dom;
    });

    div.innerHTML = collector;
    AddCardEvents();
}

function AdminRenderEvents(events){
    const _events = events.map(event => {
        const event_types = event.event_types.map(type => `<span class="pill">${type}</span>` );
        const template = `
            <tr id="event_item_${event.id}">
                <td> ${event.name} </td>
                <td> <pre> ${event.description} </pre> </td>
                <td> ${event.venue} </td>
                <td> ${new Date(event.date).toDateString()} </td>
                <td> ${event_types.join('')} </td>
                <td> 
                    <div> <a href="#" onclick="ShowUpdateEvent('${event.id}')"> Update </a> </div>
                    <div> <a href="#" onclick="ShowDeleteEvent('${event.id}')"> Delete </a> </div>
                </td>
            </tr>
        `;
        return template;
    });

    const section = document.querySelector('#admin-home section');
    const _html = `
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Event Types</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            ${_events.join('')}
        </tbody>
    </table>
    `;
    section.innerHTML = _html;
}

function RenderEventTypes(event_types){
    const collector = event_types.map(event_type => `
    <option>${event_type.name}</option>
    `);
    const dropdowns = document.querySelectorAll('.event-types-options');
    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = "";
        dropdown.innerHTML = collector;
    })
    
}

function AdminRenderEventType(event_types){
    const _event_types = event_types.map(event_type => `
        <tr id="event_type_item_${event_type.id}">
            <td> ${event_type.name} </td>
            <td> <pre> ${event_type.description} </pre> </td>
            <td> 
                <div> <a href="#" onclick="ShowUpdateEventType('${event_type.id}')"> Update </a> </div>
                <div> <a href="#" onclick="ShowDeleteEventType('${event_type.id}')"> Delete </a> </div>
            </td>
        </tr>
    `); 

    const section = document.querySelector('#admin-home section');
    const _html = `
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            ${_event_types.join('')}
        </tbody>
    </table>
    `;
    section.innerHTML = _html;
}

let update_event_id = null;
function ShowUpdateEvent(id){
    update_event_id = id;
    const initUpdateEvent = (id) => {
        const event = events.find(e => e.id === id);
        if(event){
            const page = document.querySelector('#update-event');
            page.querySelector('input[name=event-name]').value = event.name;
            page.querySelector('textarea[name=event-description]').value = event.description;
            page.querySelector('input[name=event-date]').value = new Date(event.date).toDateString();
            page.querySelector('input[name=event-venue]').value = event.venue;

            const options = page.querySelector('.event-types-options').options;
            for(let i = 0; i < options.length; i++){
                const option = options[i];
                let text = option.value || option.text;
                if(event.event_types.includes(text)) option.selected = true;
            }
        }
    }; 
    Navigation.ShowSideDrawer("update-event");
    initUpdateEvent(id);
}
function ShowDeleteEvent(id){
    const ok = confirm(`Are you sure you want to delete this event`);
    if(ok){
        Navigation.Loading();
        DeleteEvent(id)
        .then(() => {
            Navigation.Done();
            const item = document.querySelector(`#event_item_${id}`);
            item.remove();
        })
        .catch(e => {
            Navigation.Done();
            console.log(e);
        });
    }
}
let update_event_type_id = null;
function ShowUpdateEventType(id){
    update_event_type_id = id;
    const initUpdateEventType = (id) => {
        const event_type = event_types.find(e => e.id === id);
        if(event_type){
            const page = document.querySelector('#update-event-type');
            page.querySelector('input[name=event-type-name]').value = event_type.name;
            page.querySelector('textarea[name=event-type-description]').value = event_type.description;
        }
    }; 
    Navigation.ShowSideDrawer("update-event-type");
    initUpdateEventType(id);
}
function ShowDeleteEventType(id){
    const ok = confirm(`Are you sure you want to delete this event type`);
    if(ok){
        Navigation.Loading();
        DeleteEventType(id)
        .then(() => {
            Navigation.Done();
            const item = document.querySelector(`#event_type_item_${id}`);
            item.remove();
        })
        .catch(e => {
            Navigation.Done();
            console.log(e);
        });
    }
}

function Logout(){
    localStorage.removeItem('token');
    Navigation.GoBackPage('home-page');
    GetEvents(false);
}