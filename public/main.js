import {initBuffers,initShaderProgram,drawScene,vsSource,fsSource} from './render.js';
import {MoveDown,MoveLeft,MoveRight,MoveUp,RotX,RotY,RotZ,CamRotY} from './control.js';


function main() {
    const canvas = document.querySelector("#glCanvas");
    // Initialize the GL context
    const gl = canvas.getContext("webgl");
  
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
  
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    const playerSize = 1/5;
  
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };

    
    
    var then = 0;
    var buffer = initBuffers(gl,playerSize);
    

    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;
    

      
    drawScene(gl,programInfo,buffer,[MoveLeft+MoveRight,0,MoveUp+MoveDown],RotX,RotY,RotZ,CamRotY);
    

    requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};




main();
 
