
window.addEventListener("keydown",checkKeyPress, false);
export let MoveUp = 0;
export let MoveDown = 0;
export let MoveLeft = 0;
export let MoveRight = 0;


export let RotX = 0;
export let RotY = 0;
export let RotZ = 0;

const playerSize = 1/5;
const rotRad = Math.PI / 40;


export let CamRotY = 0;



function checkKeyPress(key){
    //Cube Movement
    if (key.keyCode == "37" && RotZ <= Math.PI ){ //LEFT ARROW
        MoveLeft += -playerSize / 10;
        RotZ += rotRad;
        
       
    }
    if (key.keyCode == "39" && RotZ >= -Math.PI){ //RIGHT ARROW
        MoveRight += playerSize / 10;
        RotZ += -rotRad;
       
        
    }
    
    if (key.keyCode == "38" && RotX >= -Math.PI){ //UP ARROW
        MoveUp += -playerSize / 10;
        RotX += -rotRad;
       
    }
    
    if (key.keyCode == "40" && RotX <= Math.PI){ //DOWN ARROW
        MoveDown += playerSize / 10 ;
        RotX += rotRad;
       
    }
    
    //Camera Movement
    if (key.keyCode == "65") //A
    {
        CamRotY += 0.01;
    }
    if (key.keyCode == "68") //D
    {
        CamRotY -= 0.01;
    }
    
    

    


    
};