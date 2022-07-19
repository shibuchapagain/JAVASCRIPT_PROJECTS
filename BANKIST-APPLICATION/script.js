//BANKIST APPLICATION
//ELEMENTS
//on top
const labelWelcome=document.querySelector('.welcome');
const labelDate=document.querySelector('.date');
const labelBalance=document.querySelector('.balance__value');
//on button
const lableSumIn=document.querySelector('.summary__value--in');
const labelSumOut=document.querySelector('.summary__value--out');
const labelSumInterest=document.querySelector('.summary__value--interest');
const labelTimer=document.querySelector('.timer');
//in middle
const containerApp=document.querySelector('.app');
const containerMovements=document.querySelector('.movements');
//for all button
const btnLogin=document.querySelector('.login__btn');
const btnTransfer=document.querySelector('.form__btn--transfer');
const btnLoan=document.querySelector('.form__btn--loan');
const btnClose=document.querySelector('.form__btn--close');
const btnSort=document.querySelector('.btn--sort');

//for login page
const inputLoginUsername=document.querySelector('.login__input--user');
const inputLoginPin=document.querySelector('.login__input--pin');
//for transfer
const inputTransferTo=document.querySelector('.form__input--to');
const inputTransferAmount=document.querySelector('.form__input--amount');
const inputLoanAmount=document.querySelector('.form__input--loan-amount');
const inputCloseUsername=document.querySelector('.form__input--user');
const inputClosePin=document.querySelector('.form__input--pin');

//DATA
const account1={
    owner:'shiva chapagain',
    movements:[1000,2000,6000,-5000,8000,-10000,3000],
    interestRate:1.2,
    pin:1111,
}
const account2={
    owner:'manisha khattri',
    movements:[2000,7000,-5000,11000,13000,-15000,8000],
    interestRate:1.5,
    pin:2222,
}
const account3={
    owner:'sajan rimal',
    movements:[100,400,-300,600,500,-900,200],
    interestRate:0.7,
    pin:3333
}
const accounts=[account1,account2,account3];
console.log(accounts);

//for mapping trick
// movements=[100,200,-500,-800,1000];
// const movementsDescriptions=movements.map((mov,i,arr)=>{
//     if(mov>0){
//         return `${i+1}:${mov} is deposit`;
//     }else{
//         return `${i+1}:${mov} is withdrew`;
//     };
// })
// console.log(movementsDescriptions);
//for username create...
// const user='Shiva prasad Chapagain';
// const username=user.toLowerCase().split(' ').map(name=>name[0]).join('');

// console.log(username);
const createUsernames=function(accs){
    accs.forEach(acc=>{
        acc.username=acc.owner.toLowerCase().split(' ').map(name=>name[0]).join('');
    })
}
createUsernames(accounts);
console.log(accounts);

//for adding date on UI
const now=new Date();
//for fetch the current date..
const day=`${now.getDate()}`.padStart(2,0);//for good format.... 1--->01 format
const month=`${now.getMonth()+1}`.padStart(2,0);
const year=now.getFullYear();
//for fetch the current time
const hour=`${now.getHours()}`.padStart(2,0);
const minute=`${now.getMinutes()}`.padStart(2,0);
labelDate.textContent=`${day}/${month}/${year},${hour}:${minute}`;

//for update UI
const updateUI=function(acc){
    //display movements
    displayMovements(acc.movements);

    //display balance
    calcDisplayBalance(acc);

    //display summary
    calcDisplaySummary(acc.movements);
};

const startLogOutTimer=function(){
        const tick= function(){//to store timer variable for close the timer in below
        const min=String(Math.trunc(time/60)).padStart(2,0);//show on proper time format of minutes 
        const sec=String(time%60).padStart(2,0);//set format
        labelTimer.textContent=`${min}:${sec}`;//to show time on UI
        
        //when time 0 sec then stop the timer and logout the account
        if(time===0){
            clearInterval(timer);//to stop the timer
            labelWelcome.textContent='Log in to get started';//after complete timer.. then back to normal
            containerApp.style.opacity=0;//hide the UI acount and back to login page
        }
        time--;//decrease the second on every 1 second

    }
    //set time
    let time=300;//for set the time to 5 minutes
    tick();//first call the tick function then call timer... thats mean no chance to delay on timer..
    const timer=setInterval(tick,1000);

    return timer;
}

//for deposit...
const movements=[1000,2000,6000,-5000,8000,-10000,3000];
const deposit=movements.filter(function(mov){
    if(mov>0){
        return mov;
    };
});
console.log(deposit);

//for WITHDRAWAL
const withdrew=movements.filter(mov=>mov<0);
console.log(withdrew);

//for reduce method to calculate balance..
// const balance=movements.reduce((acc,cur,i)=>acc+cur);
// console.log(balance);

//in apply this method in project...
const calcDisplayBalance=function(acc){
    acc.balance=acc.movements.reduce((acc,cur,i)=>acc+cur,0);
    labelBalance.textContent=`${acc.balance.toFixed(2)}$`;
};
// calcDisplayBalance(accounts.movements);

const calcDisplaySummary=function(movements){
    const incomes=movements.filter(mov=>mov>0).reduce((acc,cur,i)=>acc+cur,0);
    lableSumIn.textContent=`${incomes.toFixed(2)}$`;

    const outgoing=movements.filter(mov=>mov<0).reduce((acc,cur,i)=>acc+cur,0);
    labelSumOut.textContent=`${Math.abs(outgoing).toFixed(2)}$`;

    const interest=movements.filter(mov=>mov>0).map(deposit=>(deposit*1.2)/100).filter((int,i,arr)=>int>=1).reduce((acc,int)=>acc+int,0); //here..again use filter method after map coz... in bank there will not take below the 1$ interest so it will not added on final result of interest.
    labelSumInterest.textContent=`${interest.toFixed(2)}$`;
};
// calcDisplaySummary(accounts.movements);

//for use find method to find specific owner profile..
// const account=accounts.find(acc=>acc.owner==='sajan rimal');
// console.log(account.pin);


const displayMovements=function(movements,sort=false){
    containerMovements.innerHTML='';

    //for sorting this movements..in decending order
    const movs=sort? movements.slice().sort((a,b)=>a-b):movements;

    movs.forEach(function(mov,i){
        const type=mov>0?'deposit':'withdrawal';
        const html=`
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1}${type}</div>
        <div class="movements__value">${Math.abs(mov)}</div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin',html);
    })
}
// displayMovements(accounts.movements);

//Event handlers right here...
//implement login form...
let currentAccount,timer;

btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value);
    if(currentAccount?.pin===Number(inputLoginPin.value)){//this is the gate to enter the login page
        labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity=100;

        //clear the input field.. its still show the user n password after account is logged.
        inputLoginUsername.value=inputLoginPin.value='';
        inputLoginPin.blur();

        // //display movements
        // displayMovements(currentAccount.movements);

        // //display balance
        // calcDisplayBalance(currentAccount);

        // //display summary
        // calcDisplaySummary(currentAccount.movements);

        //update UI

        //timer
        if(timer) clearInterval(timer);
        timer=startLogOutTimer();//call the timer to logout account


        updateUI(currentAccount);

    }
});



//FOR TRANSFER THE AMOUNT TO ANOTHER ACCOUNT..

btnTransfer.addEventListener('click',function(e){
    e.preventDefault();
    const amount=Number(inputTransferAmount.value);
    const receiverAcc=accounts.find(acc=>acc.username===inputTransferTo.value);

    inputTransferTo.value=inputTransferAmount.value='';//for clear the transcation
    //for tranfer to valid account and check balance also
    if(amount>0&&currentAccount.balance>=amount&&receiverAcc&&
        receiverAcc?.username!==currentAccount.username){
            //doing the transfer... add and subtract the amount from each account.
            currentAccount.movements.push(-amount);
            receiverAcc.movements.push(amount);

            //update UI
            updateUI(currentAccount);

            //reset timer
            clearInterval(timer);//clear the timeout while performing transcation
            timer=startLogOutTimer();//again started the timer after finished transcation
        }
});

//for loan
btnLoan.addEventListener('click',function(e){
    e.preventDefault();
    const amount=Number(inputLoanAmount.value);
    if(amount>0 && currentAccount.movements.some(mov=>mov>=amount*0.1)){//you cant take loan more than 10% of your deposit
        currentAccount.movements.push(amount);//push on your account after getting loan
        updateUI(currentAccount);//update this loan on top...after takeing loan
    }
    inputLoanAmount.value='';
    
    //reset timer
    clearInterval(timer);//clear the timeout while performing transcation
    timer=startLogOutTimer();//again started the timer after finished transcation
    
})

//for closing the account...
btnClose.addEventListener('click',function(e){
    e.preventDefault();

    // matching the current account and pin for delete the account...
    if(currentAccount.username===inputCloseUsername.value && currentAccount.pin===Number(inputClosePin.value)){
        //to find index of  account you want to delete
        const index=accounts.findIndex(acc=>acc.username===currentAccount.username);
        //delete account
        accounts.splice(index,1);
        //for hide UI
        containerApp.style.opacity=0;

        //for hide the data in input field
        // inputCloseUsername.value=inputClosePin.value='';
    }
    inputCloseUsername.value=inputClosePin.value='';

});

let sorted=false;
btnSort.addEventListener('click',function(e){
    e.preventDefault();
    displayMovements(currentAccount.movements,!sorted);
    sorted= !sorted;
});

const move=[2000,7000,-5000,11000,13000,-15000,8000];
// const depo=move.some(acc=>acc>1500);
// console.log(depo);

// console.log(move.includes(-5000));

//for every...
console.log(move.every(mov=>mov>0));
