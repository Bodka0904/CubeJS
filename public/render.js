 // Vertex shader program
 
 export const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;
// Fragment shader program
export const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;


export function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
    // Create the shader program
  
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
  
    return shaderProgram;
  }
  
  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
  
    // Send the source to the shader object
  
    gl.shaderSource(shader, source);
  
    // Compile the shader program
  
    gl.compileShader(shader);
  
    // See if it compiled successfully
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  };

  export const defaultCubeSize = 1;
  export const defaultPlaneSize = defaultCubeSize * 5;


  export function initBuffers(gl,size) {

    //Plane Buffer Data
    const planeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,planeBuffer);

    var planePos = [
      -defaultPlaneSize * size, -1 * size,  defaultPlaneSize * size,
       defaultPlaneSize * size, -1 * size,  defaultPlaneSize * size,
      -defaultPlaneSize * size, -1 * size, -defaultPlaneSize * size,
       defaultPlaneSize * size, -1 * size, -defaultPlaneSize * size,
    ];
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array(planePos),
      gl.STATIC_DRAW);

    //Position Buffer Data
    const positionBuffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    var positions = [
      // Front face
      -defaultCubeSize * size, -defaultCubeSize * size,  defaultCubeSize * size,
      defaultCubeSize * size, -defaultCubeSize * size,  defaultCubeSize * size,
       defaultCubeSize * size,  defaultCubeSize * size,  defaultCubeSize * size,
      -defaultCubeSize * size,  defaultCubeSize * size,  defaultCubeSize * size,
  
      // Back face
      -defaultCubeSize * size, -defaultCubeSize * size, -defaultCubeSize * size,
      -defaultCubeSize * size,  defaultCubeSize * size, -defaultCubeSize * size,
       defaultCubeSize * size,  defaultCubeSize * size, -defaultCubeSize * size,
       defaultCubeSize * size, -defaultCubeSize * size, -defaultCubeSize * size,
  
      // Top face
      -defaultCubeSize * size,  defaultCubeSize * size, -defaultCubeSize * size,
      -defaultCubeSize * size,  defaultCubeSize * size,  defaultCubeSize * size,
       defaultCubeSize * size,  defaultCubeSize * size,  defaultCubeSize * size,
      defaultCubeSize * size,  defaultCubeSize * size, -defaultCubeSize * size,
  
      // Bottom face
      -defaultCubeSize * size, -defaultCubeSize * size, -defaultCubeSize * size,
       defaultCubeSize * size, -defaultCubeSize * size, -defaultCubeSize * size,
       defaultCubeSize * size, -defaultCubeSize * size,  defaultCubeSize * size,
      -defaultCubeSize * size, -defaultCubeSize * size,  defaultCubeSize * size,
  
      // Right face
       defaultCubeSize * size, -defaultCubeSize * size, -defaultCubeSize * size,
       defaultCubeSize * size,  defaultCubeSize * size, -defaultCubeSize * size,
      defaultCubeSize * size,  defaultCubeSize * size,  defaultCubeSize * size,
      defaultCubeSize * size, -defaultCubeSize * size,  defaultCubeSize * size,
  
      // Left face
      -defaultCubeSize * size, -defaultCubeSize * size, -defaultCubeSize * size,
      -defaultCubeSize * size, -defaultCubeSize * size,  defaultCubeSize * size,
      -defaultCubeSize * size,  defaultCubeSize * size,  defaultCubeSize * size,
      -defaultCubeSize * size,  defaultCubeSize * size, -defaultCubeSize * size,  

    ];
  
    
    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(positions),
                  gl.STATIC_DRAW);
    

      
    
    //Color Buffer Data
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    const faceColors = [
      [1.0,  1.0,  1.0,  1.0],    
      [1.0,  0.0,  0.0,  1.0],    
      [0.0,  1.0,  0.0,  1.0],    
      [0.0,  0.0,  1.0,  1.0],
      [1.0,  1.0,  0.0,  1.0],
      [1.0,  0.0,  1.0,  1.0]   
    ];
    let colors = [];
    for (var j = 0; j < faceColors.length; ++j)
    {
      const c = faceColors[j];
      colors = colors.concat(c,c,c,c);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
     
    
    //Index Buffer Data
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  

    const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
    ];

    

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);


    //RETURN BUFFERS
    return {
        plane: planeBuffer,
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
    };
};

export const defaultPosition = [0,0,-6];

export function drawScene(gl, programInfo, buffers,[translateX,translateY,translateZ],radiansX,radiansY,radiansZ,CamRotY) {
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
    
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    

//Camera
const fieldOfView = 45 * Math.PI / 180;   
const aspect = 1;
const zNear = 0.1;
const zFar = 100.0;
const projectionMatrix = mat4.create();



mat4.perspective(projectionMatrix,
                 fieldOfView,
                 aspect,
                 zNear,
                 zFar);



mat4.translate(projectionMatrix,projectionMatrix,[Math.sin(CamRotY) * 6,-1.5,-6 + Math.cos(CamRotY) * 6]);

mat4.rotate(projectionMatrix,projectionMatrix,CamRotY,[0,1,0]);




///////////////////////////////////PLANE/////////////////////////////////////////////////
      
//Transform
const modelViewMatrix1 = mat4.create();
var transform2 = defaultPosition;



mat4.translate(modelViewMatrix1,     
               modelViewMatrix1,     
               transform2);
mat4.rotate(modelViewMatrix1,  
              modelViewMatrix1, 
              0,   
              [0,0,1]);   
mat4.rotate(modelViewMatrix1,  
              modelViewMatrix1, 
              0,   
              [0,1,0]);
mat4.rotate(modelViewMatrix1,  
              modelViewMatrix1, 
              0,   
              [1,0,0]);
    {
      const numComponents = 3;  
      const type = gl.FLOAT;    
      const normalize = false;  
      const stride = 0;                            
      const offset = 0;         


      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.plane);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    };
    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix1);
    
    {
      const offset = 0;
      const count = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, count);
    }
  
         
  ///////////////////////////////////////////CUBE/////////////////////////////////////////////////////    
      
    //Position Buffer
    {
      const numComponents = 3;  // pull out 3 values per iteration
      const type = gl.FLOAT;    
      const normalize = false;  
      const stride = 0;         // how many bytes to get from one set of values to the next
                                
      const offset = 0;         // how many bytes inside the buffer to start from


      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }
    //Color Buffer
    {
      const numComponents = 4;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexColor,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexColor);
    }

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);


    
    //Transform
    const modelViewMatrix2 = mat4.create();
    let transform = [defaultPosition[0] + translateX, defaultPosition[1] +translateY, defaultPosition[2] + translateZ];
    
    
    
  
    mat4.translate(modelViewMatrix2,     
                   modelViewMatrix2,     
                   transform);
    mat4.rotate(modelViewMatrix2,  
                  modelViewMatrix2, 
                  radiansZ,   
                  [0,0,1]);   
    mat4.rotate(modelViewMatrix2,  
                  modelViewMatrix2, 
                  radiansY,   
                  [0,1,0]);
    mat4.rotate(modelViewMatrix2,  
                  modelViewMatrix2, 
                 radiansX,   
                  [1,0,0]);

  
    // Tell WebGL to use our program when drawing
  
    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix2);
    
  
      {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
      }
  }


  