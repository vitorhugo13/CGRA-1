attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
varying vec2 vTextureCoord;
uniform sampler2D waterMap;


void main() {

	vec4 color = texture2D(waterMap, aTextureCoord + vec2(timeFactor * 0.003, timeFactor * 0.015)); 

	float z = 0.06 * ((color.g + color.r + color.b) / 3.5) + 0.03 * sin(0.01 * timeFactor + aTextureCoord[0] + aTextureCoord[1]);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + vec3(0, 0, z), 1.0);

	vTextureCoord = aTextureCoord;
}

