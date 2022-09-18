


class workout{

    date=new Date();
    id=(Date.now() + '').slice(-10);//date.now gives current time stamp.
    clicks=0;


    constructor(coords,distance,duration){
        this.coords=coords; // [lat,lng]
        this.distance=distance; // in km
        this.duration=duration; // in min
        
    }
    _setDescription(){
        //prettier-ignore:
    const month=['January','February','March','April','May','June','July','August','September',
    'October','November','December'];
    this.description=`${this.type[0].toUpperCase()}${this.type.slice(1)} on ${month[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    click(){
        this.clicks++;
    }
}

class Running extends workout {
    type='running';
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration);
        this.cadence=cadence;
        // this.type='running';
        this.calcPace();
        this._setDescription();
    }
    calcPace(){
        //min/km
        this.pace=this.duration/this.distance;
        return this.pace;
    }
}

class Cycling extends workout {
    type='cycling';
    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration);
        this.elevationGain=elevationGain;
        // this.type='cycling';
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed(){
        //km/hr
        this.speed=this.distance/(this.duration/60);
        return this.speed;
    }
}

// const run1=new Running([23,-12],5.2,15,160);
// const cycling1=new Cycling([23,-12],5,6,111);

// console.log(run1,cycling1);

/////////////////////////////////////////////////////////////////////////
//APPLICATION ARCHITECTURE.


const form=document.querySelector('.form');
const containerWorkouts=document.querySelector('.workouts');
const inputType=document.querySelector('.form__input--type');
const inputDistance=document.querySelector('.form__input--distance');
const inputDuration=document.querySelector('.form__input--duration');
const inputCadence=document.querySelector('.form__input--cadence');
const inputElevation=document.querySelector('.form__input--elevation');

class App{
    #mapZoomLevel=13;
    #map;
    #mapEvent;
    #workouts=[];
    constructor(){
        //Gets user position.
        this._getPosition();
        
        //Get data from local storage.
        this._getLocalStorage();

        //Attach event handlers
        form.addEventListener('submit',this._newWorkout.bind(this));
        containerWorkouts.addEventListener('click',this._moveToPopup.bind(this));

//change when we click the cycling and running change the cadence and evel.chain
inputType.addEventListener('change',this._toggleElevationField);
    }

    _getPosition(){
        
if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
        alert('couldnot get your position');
    })
}

    _loadMap(position){
            // console.log(position);
            const {latitude}=position.coords;
            const {longitude}=position.coords;
            // console.log(www.google.com/maps/@27.7172446,85.3239595,15z);
            // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        
            const coords=[latitude,longitude];
        
            this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
            // console.log(map);
        
            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        
            // L.marker(coords).addTo(map)
            // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            // .openPopup();
        
            //handling clicks on maps
            this.#map.on('click',this._showForm.bind(this));
        

            this.#workouts.forEach(work=>{
                this._renderWorkoutMarker(work);
            })
    }

    _showForm(mapE){
        this.#mapEvent=mapE;
        form.classList.remove('hidden');//remove the hidden class when click on maps... and show form...
        inputDistance.focus();//when click the map and focus the inputDistance for input data...
    //     console.log(mapEvent);
    }

    _hideForm(){
        //Empty Inputs
        inputDistance.value=inputDuration.value=inputCadence.value=inputElevation.value='';

        form.style.display='none';
        form.classList.add('hidden');
        setTimeout(()=>(form.style.display='grid'),1000);
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e){
        //for valid input
        const validInputs=(...inputs)=>inputs.every(inp=>Number.isFinite(inp));
        const allPositive=(...inputs)=>inputs.every(inp=>inp>0);

        e.preventDefault();

        //Get data from FORM.
        const type=inputType.value;
        const distance=+inputDistance.value;
        const duration=+inputDuration.value;
        const {lat,lng}=this.#mapEvent.latlng;
        let workout;//we assign here workout bcz... we need outside this if statement.. scope chain didnot give it so....

        
        //If workout running, create running object.
        
        if(type==='running'){
            const cadence=+inputCadence.value;
            //Check if data is valid?.
            // if(!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence))
            if(
            !validInputs(distance,duration,cadence) || !allPositive(distance,duration,cadence))
            return alert('Input have to be positive numbers.');
            
            workout=new Running([lat,lng],distance,duration,cadence);
        }

        //If workout cycling, create cycling object.
        if(type==='cycling'){
            const elevation=+inputElevation.value;
            if(
            !validInputs(distance,duration,elevation) || !allPositive(distance,duration))
            return alert('Input have to be positive numbers.');

            workout=new Cycling([lat,lng],distance,duration,elevation);

        }
        

        //Add new object to workout object.
        this.#workouts.push(workout);//in this workout fetch from line 142.
        console.log(workout);

        //Render workout on map as marker.
        this._renderWorkoutMarker(workout);


        //Render workout on list.
        this._renderWorkout(workout);

        //Hide form + Clear input fields
        this._hideForm();

        //Set local storage to all workouts
        this._setLocalStorage();


}
_renderWorkoutMarker(workout){
    L.marker(workout.coords)
    .addTo(this.#map)
    .bindPopup(L.popup({
        maxWidth:250,
        minWidth:100,
        autoClose:false,
        closeOnClick:false,
        className:`${workout.type}-popup`
    }))
    .setPopupContent(`${workout.type==='running'?'🏃‍♂️':'🚴‍♀️'} ${workout.description}`)
    .openPopup();
}
_renderWorkout(workout){
    let html=`
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
        <span class="workout__icon">${workout.type==='running'?'🏃‍♂️':'🚴‍♀️'}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
    </div>
    `;

    if(workout.type==='running')
    html+=`
    <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
    </div>
   <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
    </div>
    </li>
    `;

    if(workout.type==='cycling')
        html+=`
    <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
    </div>
    </li>
        `;
    
    form.insertAdjacentHTML('afterend',html);

}

_moveToPopup(e){
    const workoutEl=e.target.closest('.workout');
    // console.log(workoutEl);

    if(!workoutEl) return;

    const workout=this.#workouts.find(work=>work.id===workoutEl.dataset.id);
    console.log(workout);

    this.#map.setView(workout.coords,this.#mapZoomLevel,{
        animate:true,
        pan:{
            duration:1,
        },
    });

    //using the public interface.
    // workout.click();

}

_setLocalStorage(){
    localStorage.setItem('workouts',JSON.stringify(this.#workouts));
}

_getLocalStorage(){
    const data=JSON.parse(localStorage.getItem('workouts'));

    if(!data) return;

    this.#workouts=data;
    
    this.#workouts.forEach(work=>{
        this._renderWorkout(work);
    })

}

reset(){
    localStorage.removeItem('workouts');
    location.reload();
}


};

const app=new App();


