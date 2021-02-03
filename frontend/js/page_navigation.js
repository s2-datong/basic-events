class Navigation{
    phistory = [];

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
}