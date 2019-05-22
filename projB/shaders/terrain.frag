#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;

uniform sampler2D terrainMap;
uniform sampler2D terrainTex;
uniform sampler2D terrainAltimetry;

void main() {

	vec4 color = texture2D(terrainTex, vTextureCoord);
    float height = texture2D(terrainAltimetry, vTextureCoord).r;
    
    vec2 new_coords = vec2(0,-height);


	gl_FragColor = color;
}