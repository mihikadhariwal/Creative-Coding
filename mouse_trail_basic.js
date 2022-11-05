const canvas=document.getElementById('canvas1');
const cxt=canvas.getContext('2d');
canvas.width= window.innerWidth;//sets the canvas width to the window size, similarly for canvas height
canvas.height=window.innerHeight;
const particlesArray=[];
hue=0;

const mouse={
    x:undefined,
    y:undefined,
}

//storing the current location of the mouse when it is clicked on the canvas in mouse.x makes it global and available to all parts of the program
canvas.addEventListener('click', function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    for(let i=0; i<20; i++)
    particlesArray.push(new Particle());
    
})

canvas.addEventListener('mousemove', function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    for(let i=0; i<20; i++)
    particlesArray.push(new Particle());
    
})


//to generate many such particles, we can use classes and objects properties
//each particle is a single circle, every time we call this class, it will create one new particle object for us
class Particle{
    //we can define properties of our object under the constructor method.
    constructor(){
        this.x=mouse.x; //here we are defining an attribute called x of the object, and we are storing the mouse x coordinate in it
        this.y=mouse.y;
        // this.x=Math.random() * canvas.width; //x position of the particle to be anywhere within the width of the canvas
        // this.y=Math.random() * canvas.height;
        this.size=Math.random() * 16+1; //random size between 1 and 6 px
        this.speedx=Math.random() * 3 - 1.5; //between -1.5 and +1.5
        this.speedy=Math.random() * 3 - 1.5;
    }
    //now we give the object some behaviors
    update(){
        this.x+=this.speedx;
        this.y+=this.speedy;
        if(this.size>0.2)
        this.size-=0.2;
        
    }
    draw(){
        cxt.fillStyle='hsl(' +hue+ ', 100%, 50%)';
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.size, 0, Math.PI *2 ); //math.pi --> 180 degrees
        cxt.fill();
    }
}

//after defining the class, create a function that calls the class many times and creates and object for each call

function handleParticles(){
    for(let i=0; i<particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size<0.3)
        particlesArray.splice(i,1); //used to remove elements of the array, in this case particle objects which are of size less than 0.3. (i,1)--> from position i, remove one array element
    }
}

//this is the animation function. clearRect clears the canvas, requestanimationframe(animate) runs the function in a loop infinitely
function animate(){
    //cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.fillStyle='rgba(0,0,0,0.05)';
    cxt.fillRect(0,0,canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}

animate();

//comment out the animate() function call to use as a paint canvas