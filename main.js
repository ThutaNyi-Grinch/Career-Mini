function Gold(){
    const slides = document.querySelectorAll('.slide');
    const pages = document.querySelectorAll('.page');
    const radialGradient = [`radial-gradient(#2B3760,#0B1023)`,`radial-gradient(#4E3022,#161616)`,`radial-gradient(#4E4342,#161616)`];
    let current = 0;
    let scrollSlide = 0;
    slides.forEach((slide,index)=>{
        slide.addEventListener('click', function(){
            clickdots(this);
            pageChange(index);
            scrollSlide = index;
        });
    });

    function clickdots(dot){
        slides.forEach(slide =>{
            slide.classList.remove('active');
        });
        dot.classList.add('active');
    };

    function pageChange(pageNumber){
        const currentPage = pages[current];
        const nextPage = pages[pageNumber];
        const nextLeft = nextPage.querySelector('.hero .model-left'); 
        const nextRight = nextPage.querySelector('.hero .model-right'); 
        const currentLeft =currentPage.querySelector('.hero .model-left');
        const currentRight =currentPage.querySelector('.hero .model-right');
        const nextText = nextPage.querySelector('.details');
        const profolio = document.querySelector('.profolio');
        const tl = new TimelineMax({
            onStart: function(){
                slides.forEach(slide =>{
                    slide.style.pointerEvents='none';
                })
            },
            onComplete: function(){
                slides.forEach(slide =>{
                    slide.style.pointerEvents='all';
                })
            }
        });

        tl.fromTo(currentLeft,0.3,{y:'10%'},{y:'-100%'})
        .fromTo(currentRight,0.3,{y:'-10%'},{y:'-100%'},'-=0.2')
        .to(profolio,0.3,{backgroundImage: radialGradient[pageNumber]})
        .fromTo(currentPage,0.3,{opacity:1,pointerEvents:'all'},{opacity:0,pointerEvents:'none'})
        .fromTo(nextPage,0.3,{opacity:0,pointerEvents:'none'},{opacity:1,pointerEvents:'all'})
        .fromTo(nextLeft,0.3,{y:'-100%'},{y:'10%'},'-=0.6')
        .fromTo(nextRight,0.3,{y:'-100%'},{y:'-10%'},'-=0.8')
        .set(nextLeft,{clearProps:"all"})
        .set(nextRight,{clearProps:"all"})
        current = pageNumber;
    }
    document.addEventListener('wheel',throttle(scrollChange,1500));
    document.addEventListener('touchmove',throttle(scrollChange,1500));
    function scrollChangemain(dotnumber){
        const activeDot = document.querySelectorAll('.slide')[dotnumber];
        slides.forEach(slide =>{
            slide.classList.remove('active');
        });
        activeDot.classList.add('active');
    };
    function scrollChange(e){
        if(e.deltaY > 0){
            scrollSlide +=1;
        }else{
            scrollSlide -=1;
        }
        if(scrollSlide >2){
            scrollSlide=0;
        }else if( scrollSlide<0){
            scrollSlide =2;
        }
        scrollChangemain(scrollSlide);
        pageChange(scrollSlide);
    };
    const logo = document.querySelector('.logo');
    const menuLines = document.querySelectorAll('.menu line');
    const menu = document.querySelector('.menu');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');
    const nav = document.querySelector('.nav-open');
    const tl = new TimelineMax({ paused: true,reversed : true});
    
    tl.fromTo(logo,0.1,{opacity: 1},{opacity: 0 })
    .fromTo(menuLines,0.1,{opacity: 1},{opacity: 0 },'-=0.1')
    .to(nav,0.5,{y: 0})
    .fromTo(social,0.3,{opacity: 0, y : "10%"},{opacity: 1, y : 0})
    .fromTo(contact,0.3,{opacity: 0, y : "10%"},{opacity: 1, y : 0},'-=0.2')
    .fromTo(logo,0.3,{color: 'white'},{ opacity: 1,color: 'black' },'-=0.2')
    .fromTo(menuLines,0.3,{stroke: 'white'},{ opacity: 1,stroke: 'black' },'-=0.2');
    

    menu.addEventListener('click',()=>{
        tl.reversed() ? tl.play() : tl.reverse();
    });

};   
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
            }
        };
    };
      
Gold();