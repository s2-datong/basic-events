document.addEventListener('events-change', (e) => {
    console.log('called');
    const {events, admin} = e.detail;
    if(admin === true) AdminRenderEvents(events);
    else RenderEvents(events);
});

document.addEventListener('event-types-changed', (e) => {
    const {event_types, admin} = e.detail;
    if(admin === true) AdminRenderEventType(event_types);
    else RenderEventTypes(event_types);
});

document.addEventListener('event-detail', (event) => {
    const {id} = event.detail;
    const _event = events.find(e => e.id === id);
    if(_event){
        const _event_types = _event.event_types.map(type => `<span class="pill">${type}</span>`)
        const page = document.querySelector('#event-detail');
        page.querySelector('#e-name').textContent = _event.name;
        page.querySelector('#e-desc').textContent = _event.description;
        page.querySelector('#e-venue').textContent = _event.venue;
        page.querySelector('#e-date').textContent = new Date(_event.date).toDateString();
        page.querySelector('#e-labels').innerHTML = _event_types.join('');
        Navigation.ShowSideDrawer('event-detail');
    }
})

function AddCardEvents(){
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', CardEventOnClickhandler);
    })
}

function RemoveCardEvents(){
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.removeEventListener('click', CardEventOnClickhandler);
    })
}

function CardEventOnClickhandler(event){
    event.stopPropagation();
    const id = findDataId(event.srcElement);
    if(id){
        const showEventDetail = new CustomEvent('event-detail', {
            detail: {id}
        });
        document.dispatchEvent(showEventDetail);
    }
}

function findDataId(node){
    try{
        if(node.hasAttribute('data-id')) return node.getAttribute('data-id');
        return findDataId(node.parentElement);
    }
    catch(e){
        return null;
    }
}