const modal=document.querySelector('.modal');
// console.log(modal);
const overlay=document.querySelector('.overlay');

const btnShowModal=document.querySelectorAll('.show-modal');

// console.log(btnShowModal.length);
const btnCloseModal=document.querySelector('.close-modal');
console.log(btnCloseModal);

const openModal=function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal=function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for(let i=0;i< btnShowModal.length;i++){
    btnShowModal[i].addEventListener('click',openModal);
};

btnCloseModal.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);

document.addEventListener('keydown',function(e){
    // console.log(e);
    if(e.key==='Escape' && !modal.classList.contains('hidden') ){
        closeModal();
    }
})






