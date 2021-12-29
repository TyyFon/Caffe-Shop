

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
  },
  img:{
    active: 'active'
  }
};
const settings = {
  db: '//localhost:3131',
  products: 'products',
  contact: 'contact'
};
class Product{
  constructor(id, data) {
    const thisProduct = this;
    thisProduct.id = id;
    thisProduct.data = data;
    thisProduct.renderProduct();
  }
  renderProduct(){
    const thisProduct = this;
   
    let productNumber = thisProduct.id;
    if (productNumber <= 9){
      productNumber = '0'+ thisProduct.id;
    } else {productNumber = thisProduct.id;
    }

    const mostPopular = document.querySelector('.most-popular');
    //console.log(thisProduct.data.id , mostPopular);
    if (thisProduct.data.most_popular == true){
      mostPopular.classList.add(classNames.img.active);
      //console.log('prawda');
    //} else {
      //console.log('fałsz');
    }
    //console.log(thisProduct.data.most_popular);

    
    const textSource = document.getElementById('text-template').innerHTML;
    const generatedTextHTML = Handlebars.compile(textSource);
    
    
    const productData = {
      id: thisProduct.data.id,
      number: productNumber,
      name: thisProduct.data.name,
      description: thisProduct.data.description,
      roasting: thisProduct.data.roasting,
      intensity: thisProduct.data.intensity,
      most_popular: thisProduct.most_popular,
      image: thisProduct.data.image
    };
    //console.log(productData);
    //console.log(thisProduct.data.most_popular);
    const productTextHTML = generatedTextHTML(productData);
    const textDomElement = document.querySelector('.text');
    
    textDomElement.insertAdjacentHTML('beforebegin', productTextHTML);
    
    if (thisProduct.data.id <=3){
    
      const homeHTML = generatedTextHTML(productData);
    //console.log(homeHTML);
      const homeDomElement = document.querySelector('.home-text');
      homeDomElement.insertAdjacentHTML('beforebegin', homeHTML);
    }
   
    
    
    
  }
  
}
  
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
  
  initMenu: function(){
    const thisApp = this;
    //console.log('thisApp.data', thisApp.data);

    for (let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },
  initData: function(){
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db + '/' + settings.products;
    //console.log(url);
    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.products = parsedResponse;
        thisApp.initMenu();
      });
  },

  init: function(){
    const thisApp = this;
    thisApp.initPages();
    thisApp.initData();
  },
};
app.init();