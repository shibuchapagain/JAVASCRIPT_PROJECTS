

const recurring=function(){

// const future=new Date(2022,04,14);
let date1=new Date(2023,00,01);
date1=date1.getTime();
let date2=new Date();
date2=date2.getTime();
let distance=date1-date2;


//for current time---to calculate current hour,minute,seconds--->FOR CURRENT TIME...
// let curHour=date2.getHours()+'';
// let currMinute=date2.getMinutes()+'';
// let currSecond=date2.getSeconds()+'';


//Time calculations for days,hours,minute and second...--->FOR NEW YEAR..
let days=Math.floor(distance/(1000*60*60*24))+'';//convert string bcoz-->use padStart(2,'0');
days=days.padStart(2,'0');//use padStart for ex-->01.. double digit
let hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60))+'';
hours=hours.padStart(2,'0');
let minute=Math.floor((distance%(1000*60*60))/(1000*60))+'';
minute=minute.padStart(2,'0');
let second=Math.floor((distance%(1000*60))/1000)+'';
second=second.padStart(2,'0');

//for assigning value in DOM---->UPCOMING NEW YEAR REMAINING TIME..
document.querySelector('#days').innerHTML=days;
document.querySelector('#hours').innerHTML=hours;
document.querySelector('#mins').innerHTML=minute;
document.querySelector('#seconds').innerHTML=second;

// //for assiging value in DOM---->CURRENT TIME..
// document.querySelector('#hours').innerHTML=curHour;
// document.querySelector('#mins').innerHTML=currMinute;
// document.querySelector('#seconds').innerHTML=currSecond;

}


setInterval(recurring,1000);


