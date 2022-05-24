/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')


/*===== MENU SHOW =====*/
/* Validate if constant exist*/ 
if(navToggle){
    navToggle.addEventListener('click', ()=>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exist*/ 
if(navClose){
    navClose.addEventListener('click', ()=>{
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    //When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header');
    //When the scroll is greater than 50 viewport heigth, add the scroll-header class to the header tag
    if(this.scrollY >=50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}

window.addEventListener('scroll', scrollHeader);

/*=============== POPULAR SWIPER ===============*/
let swiperPopular = new Swiper(".popular__container", {
    loop: true,
    spaceBetween: 24,
    slidesPerView: 'auto',
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
        768: {
          slidesPerView: 3,
        },
        1024: {
          spaceBetween: 48,
        },
      },
  });

/*=============== MIXITUP FILTER FEATURED ===============*/
let mixerFeatured = mixitup('.featured__content', {
    selectors: {
        target: '.featured__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active featured */ 
const linkFeatured = document.querySelectorAll('.featured__item');

function activeFeatured(){
    linkFeatured.forEach(l=> l.classList.remove('active-featured'));
    this.classList.add('active-featured');
}
linkFeatured.forEach(l=> l.addEventListener('click', activeFeatured));

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    //When the scroll is higher than 350 viewport heigth, add the show-scroll class
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');
function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeigth = current.offsetHeigth,
              sectionTop = current.OffsetTop - 58,
              sectionId = current.getAttribute('id');
    
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeigth){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    
    })
}

window.addEventListener('scroll', scrollActive);
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    //reset: true
});

sr.reveal(`.home__title, .popular__container, .features__img, .featured__filters`);
sr.reveal(`.home__subtitle`, {delay: 500});
sr.reveal(`.home__elec`, {delay: 600});
sr.reveal(`.home__img`, {delay: 800});
sr.reveal(`.home__car-data`, {delay: 900, interval: 100, origin: 'bottom'});
sr.reveal(`.home__button`, {delay: 1000, origin: 'bottom'});
sr.reveal(`.about__group, .offer__data`, {origin: 'left'});
sr.reveal(`.about__data, .offer__img`, {origin: 'right'});
sr.reveal(`.features__map`, {delay: 600, origin: 'bottom'});
sr.reveal(`.features__card`, {interval: 300});
sr.reveal(`.featured__card, .logos__content, .footer__content`, {interval:100});



let users = [];
function User (name,surnames,email,password){
        
        this.name = name;
        this.surnames = surnames,
        this.email = email;
        this.password = password;
    
        
}


let identificado=false;
let login = document.getElementById('login');
login.addEventListener('click', function(){


        let valueEmail = document.getElementById("email-login").value;
        let valuePassword = document.getElementById("password-login").value;
        let passwordEncoded = btoa(valuePassword);
        console.log(passwordEncoded);

        console.log(valueEmail);
        console.log(valuePassword);
        getUser(valueEmail, passwordEncoded);
        identificado=true;
        let forms = document.getElementsByClassName('register section')[0];
        forms.style.visibility= "hidden";
        
        
    


})



function muestraUsuario(users){
    let menu = document.getElementsByClassName('nav container')[0];
    let nombreApellido = document.createElement('h2');
    let registerMenu = document.getElementById('register-menu');
    registerMenu.style.visibility = "hidden";
    for(let i =0; i <users.length; i++){
            nombreApellido.innerHTML=users[i].name + ' '+users[i].surnames;
            menu.appendChild(nombreApellido);


    }
    mostrarCoches(coches);
    

}

let coches = [];
function Coches(id,modelo, marca, precio, foto){
        this.id = id;
        this.modelo = modelo;
        this.marca = marca
        this.precio = precio;
        this.foto = foto;


}

let all =document.getElementById('all');
all.addEventListener('click',()=>{
    getCars();
});
getCars();

function mostrarCoches(coches){
    
    let carDiv = document.getElementsByClassName('featured__content grid')[0];
    carDiv.innerHTML='';
        for(let i=0; i<coches.length; i++){
           
            carDiv.insertAdjacentHTML('afterbegin',`
            
           
                        <article class="featured__card mix">
                            <div class="shape shape__smaller"></div>

                            <h1 class="featured__title">${coches[i].nombre}</h1>

                            <h3 class="featured__subtitle">${coches[i].modelo}</h3>

                            <img src="${coches[i].fotos}" alt="" class="featured__img">

                            <h3 class="featured__price">$${coches[i].precio}</h3>

                           
                            <button class="button featured__button" >
                            <i class="ri-shopping-bag-2-line"></i>
                            <i class="ri-heart-add-line" id="${coches[i].id}" onclick="updateFavoriteStatus(${coches[i].id})"></i>
                        </button>
                        </article>
               
            `)

            let botones = document.getElementsByClassName('button featured__button')[0];
            botones.style.visibility="hidden";
            if(identificado==true){botones.style.visibility = "visible";}

           
        
            
            
        }
        
        
}


function updateFavoriteStatus(id_coche){
    let btnFav =document.getElementById(id_coche);
    let id = btnFav.getAttribute('idFavoritos');
    console.log('ID COCHE QUE RECIBE EL CORAZON: '+id_coche);
    console.log('ID FAVORITOS PARA EL DELETE: '+id);
    if(btnFav.style.color=='red'){
        deleteFromFavorites(id, id_coche);
    }
                    
    if(btnFav.style.color!='red'){
        addToFavorites(id_coche);
    }
                              
        
}


getMarcas();
function getMarcas(){
    let url ="http://localhost:3000/marcas";
    let options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    };
    fetch(url, options)
            .then(response => {return response.json()})
            .then(data =>{
               let marcas = data.result;
               mostrarLogos(marcas);
            })


}



function mostrarLogos(marcas){

            let filtro = document.getElementById('all');
            console.log(marcas);
            for(let i=0; i<marcas.length; i++){
                filtro.insertAdjacentHTML('afterend',`
                   
                            <li>
                                <button class="featured__item" id="${marcas[i].id}" onclick='filtrarMarcas(${marcas[i].id})'>
                                    <img src="${marcas[i].logo}" alt="">
                                </button>   
                            </li>
                        
                       
                        
                `)
                
               
            }   
}


function filtrarMarcas(id){
    
    let url ="http://localhost:3000/marcas"+'/'+id;
    let options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    };
    fetch(url, options)
            .then(response => {return response.json()})
            .then(data =>{
            
                mostrarCoches(data.result);
            })




}


   


let register = document.getElementById('registro');
register.addEventListener('click',function(){
       
        let valueName = document.getElementById("name").value;
        let valueSurnames = document.getElementById("surnames").value;
        let valueEmail = document.getElementById("email").value;
        let valuePassword = document.getElementById("password").value;

        let passwordEncoded = btoa(valuePassword);
        console.log(passwordEncoded);
        const user = new User(valueName, valueSurnames, valueEmail, passwordEncoded);

        addUser(user);
        console.log(user);
});




function addUser(usuario){

    let url ="http://localhost:3000/users";
    let options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },body: JSON.stringify({ 
                name: usuario.name,
                surnames: usuario.surnames,
                email: usuario.email,
                password: usuario.password
        })
    };
    fetch(url, options)
            .then(response => {return response.json()})
            .then((data) => {
                    console.log('esto es la :'+JSON.stringify(data));
                    
            });



}

let id='';
function getUser(email,password){
    
    let url ="http://localhost:3000/users"+'/'+email +'/'+password;
    let options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    };
    fetch(url, options)
            .then(response => {return response.json()})
            .then(data =>{
                console.log('Data string :'+JSON.stringify(data));
                console .log('DATA NORMAL: ' +data);
                console.log(data.result);
                sessionStorage.setItem('token', data.token);
                console.log(sessionStorage.getItem('token'));
                let usuario = data.result;
                muestraUsuario(usuario);
                id=usuario[0].id;
                getfavorites(id);
                
            })

}


function getCars(){
    let url ="http://localhost:3000/cars";
    let options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    };
    fetch(url, options)
            .then(response => {return response.json()})
            .then(data =>{
                coches = data.result;
               mostrarCoches(data.result);
            })

}



function addToFavorites(coches){
        console.log('COCHES: '+coches);
        let url ="http://localhost:3000/users/favoritos";
        let options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },body: JSON.stringify({ 
                usuario_id: id,
                coche_id: coches
            })
        };
        fetch(url, options)
                .then(response => {return response.json()})
                .then((data) => {
                        console.log('esto es la :'+JSON.stringify(data));
                        let btnFav = document.getElementById(coches);
                        btnFav.setAttribute('idFavoritos', data.id );
                        btnFav.style.color='red';
                        
                        
                });

}

function deleteFromFavorites(id, coche_id){
    
    let url ="http://localhost:3000/users/favoritos/delete"+'/'+id+'/'+coche_id;
    let options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    };
    fetch(url, options)
            .then(response => {return response.json()})
            .then((data) => {
                    
                    let btnFav = document.getElementById(coche_id);
                    btnFav.style.color='white';
                   
            });

} 

function getfavorites(id){
    console.log('ID DEL USUARIO: '+id);
    let url ="http://localhost:3000/favoritos"+'/'+id;
    let options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    };
    fetch(url, options)
            .then(response => {return response.json()})
            .then(data =>{
                let cochesFavs = data.result;
                for(let i=0; i<cochesFavs.length; i++){
                console.log('ID DEL COCHE: '+cochesFavs[i].coche_id);

                   let btnFav = document.getElementById(cochesFavs[i].coche_id);
                    btnFav.style.color='red';
                    console.log('ID FAVORITOS CUANDO GET FAVORITES: '+ cochesFavs[i].id);
                    btnFav.setAttribute('idFavoritos', cochesFavs[i].id);
                    
                }
            })

}



