class Navigation{
    static phistory = [];
    static side_drawer_open = false;
    static side_drawer_id = null;

    static GoToPage(id){
        // slides from right to left
        const page = document.querySelector("#" + id);
        const currentPage = document.querySelector(".page.active");
        const currentPageId = currentPage.getAttribute('id');
        if(currentPageId == id) return;
        
        if(page.classList.contains("left")){
            // move page to right first

            const transitionEndHandler = () => {
                page.classList.add("transition");
                currentPage.classList.remove("active");
                currentPage.classList.add("left");

                page.classList.add("active");
                page.classList.remove("right");
            }

            page.classList.remove("transition");
            setTimeout(() => {
                page.classList.remove("left");
                page.classList.add("right");
                setTimeout(transitionEndHandler, 10);
            }, 100)
            
            
            //page.addEventListener('transitionend', transitionEndHandler);
        }else{
            currentPage.classList.remove("active");
            currentPage.classList.add("left");

            page.classList.add("active");
            page.classList.remove("right");
        }
    }

    static GoBackPage(id){
        // slides from left to right
        if(!id && phistory.length === 0) return;
        if(!id && phistory.length > 0) id = phistory.pop();

        const page = document.querySelector("#" + id);
        const currentPage = document.querySelector(".page.active");
        const currentPageId = currentPage.getAttribute('id');
        if(currentPageId == id) return;

        if(page.classList.contains("right")){
            // move page to left first

            const transitionEndHandler = () => {
                page.classList.add("transition");
                currentPage.classList.remove("active");
                currentPage.classList.add("right");

                page.classList.add("active");
                page.classList.remove("left");
            }

            page.classList.remove("transition");
            setTimeout(() => {
                page.classList.remove("right");
                page.classList.add("left");
                setTimeout(transitionEndHandler, 10);
            }, 100);
        }else{
            currentPage.classList.remove("active");
            currentPage.classList.add("right");

            page.classList.add("active");
            page.classList.remove("left");
        }
    }

    static ShowSideDrawer(id){
        if(Navigation.side_drawer_open === true && id === Navigation.side_drawer_id) return;
        if(Navigation.side_drawer_open === false){
            const sideDrawer = document.querySelector("#" + id);
            sideDrawer.classList.add("thirty");
            Navigation.side_drawer_open = true;
            Navigation.side_drawer_id = id;
        }
        if(Navigation.side_drawer_open === true && id !== Navigation.side_drawer_id){
            const openSideDrawer = document.querySelector("#"+ Navigation.side_drawer_id);
            const sideDrawer = document.querySelector("#" + id);

            const transitionEnd = () => {
                sideDrawer.classList.add("thirty");
                Navigation.side_drawer_id = id;
                openSideDrawer.removeEventListener('transitionend', transitionEnd);
            };

            openSideDrawer.addEventListener('transitionend', transitionEnd);
            openSideDrawer.classList.remove("thirty");
        }
    }

    static CloseSideDrawer(){
        if(Navigation.side_drawer_open === true){
            const sideDrawer = document.querySelector("#" + Navigation.side_drawer_id);
            sideDrawer.classList.remove("thirty");
            Navigation.side_drawer_open = false;
            Navigation.side_drawer_id = null;
        }
    }

    static SideDrawerLoading(){
        if(Navigation.side_drawer_open === false) return;
        const div = document.createElement("div");
        div.classList.add('side-drawer-loading');
        div.innerHTML = '<img src="img/loader2.gif" width="60px" />';
        document.body.appendChild(div);
    }

    static SideDrawerLoadingSuccess(callback){
        if(Navigation.side_drawer_open === false) return;
        const div = document.querySelector('.side-drawer-loading');
        if(div){
            div.innerHTML = '<img src="img/success.png" width="160px" />';
            if(typeof callback === 'function'){
                setTimeout(callback, 1000);
            }
        }
    }

    static SideDrawerLoadingError(callback){
        if(Navigation.side_drawer_open === false) return;
        const div = document.querySelector('.side-drawer-loading');
        if(div){
            div.innerHTML = '<img src="img/error.png" width="160px" />';
            if(typeof callback === 'function'){
                setTimeout(callback, 1000);
            }
        }
    }

    static SideDrawerDone(){
        const div = document.querySelector('.side-drawer-loading');
        if(div){
            div.remove();
        }
    }

    static Loading(){
        const loader = document.querySelector('.loading');
        loader.classList.remove('hide');
    }

    static Done(){
        const loader = document.querySelector('.loading');
        loader.classList.add('hide');
    }

    static showModal(id){
        const modal = document.querySelector(`#${id}.modal-container`);
        if(modal){
            modal.classList.remove('hide');
        }
    }

    static closeModal(id){
        const modal = document.querySelector(`#${id}.modal-container`);
        if(modal){
            modal.classList.add('hide');
        }
    }
}