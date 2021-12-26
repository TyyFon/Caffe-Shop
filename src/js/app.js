

const select = {
  containerOf: {
    pages: '#pages',
    menu: '.navigation'
  },
  nav: {
    links: '.nav-link'
  }
};
const classNames = {
  pages:{
    active: 'active'
  },
  nav:{
    active: 'active'
  }
};
const settings = {
  db: '//localhost:3131',
  products: 'products',
  contact: 'contact'
};

const app = {
  initPages: function(){
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    
    const idFromHash = window.location.hash.replace('#/' , '');
    
    let pageMachingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMachingHash = page.id;
        break;
      }
    }
        
    thisApp.activatePage(pageMachingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click' , function(event){
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#' , '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  init: function(){
    const thisApp = this;
    thisApp.initPages();
  },
};
app.init();