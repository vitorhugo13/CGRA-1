#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;

uniform sampler2D waterTex;

void main() {

	vec4 color = texture2D(waterTex, vTextureCoord + vec2(timeFactor * 0.003, timeFactor * 0.015));
	
	gl_FragColor = color;
}