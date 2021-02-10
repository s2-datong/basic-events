function RenderEvents(_events){
    const div = document.querySelector('/list-events');
    div.innerHTML = "";
    let collector = "";
    _events.forEach(event => {
        const event_types = event.event_types.map(type => `<span>${type}</span>` );
        const template_dom = `
            <div class="card">
                    <div class="title">
                        <h1>${event.name}</h1>
                        <p>${event.description}</p>
                    </div>
                    <div class="content">
                        <label>Date: </label>
                        <div>${event.date}</div>
                        <label>Venue</label>
                        <div>${event.venue}</div>
                        <label>Event Type</label>
                        <div>${event_types}</div>
                    </div>
                </div>
        `;
        collector += template_dom;
    });

    div.innerHTML = collector;
}