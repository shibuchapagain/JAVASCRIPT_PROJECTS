// let btn=document.querySelector('.btn');

// const request= new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/portugal`);
// request.send();
// request.addEventListener('load', function(){
//     // console.log(this.responseText);
//     // const data= JSON.parse(this.responseText);
//     // console.log(data);

//     //destructuring ---> then immediately return object
//     const [data]= JSON.parse(this.responseText);
//     console.log(data);

//     //for neighbours country...
//     const [neighbour]=data.borders;
//     console.log(neighbour);
// });

// const getCountryAndNeighbour=function(country){
//     const request=new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     const [data]= JSON.parse(this.responseText);
//     console.log(data);
// }
// getCountryAndNeighbour('nepal');

//https://nex-g.herokuapp.com

// const request= fetch(`https://nex-g.herokuapp.com`).then(res=>res.json());
// console.log(request);


// const request = fetch(`https://restcountries.com/v3.1/name/nepal`);
// console.log(request);


// let btn=document.querySelector('.btn');

// const request= new XMLHttpRequest();
// request.open('GET', `https://nex-g.herokuapp.com`);
// request.send();

// // console.log(request.responseText);
// request.addEventListener('click', function(){
//     // console.log(this.responseText);
//     const data= JSON.parse(this.responseText);
//     console.log(data);
// });


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// ----------------> ALL ABOUT API ------------------->

// fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(json => console.log(json));

fetch(`https://jsonplaceholder.typicode.com/users`)
.then(response=>response.json())
.then(data=>{
    console.log(data);
    for(x in data){
        console.log(data[x].name);
        document.write(`${data[x].id} : ${data[x].name} : ${data[x].email} : ${data[x].address.city} <br>`);
    }
})
.catch(e=>console.log(e));
