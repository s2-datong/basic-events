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

document.addEventListener('click', (event) => {
    //Navigation.CloseSideDrawer()
})