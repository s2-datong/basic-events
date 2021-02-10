document.addEventListener('event-change', (e) => {
    const events = e.detail.events;
    RenderEvents(events);
})