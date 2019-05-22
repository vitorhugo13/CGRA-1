#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;

uniform sampler2D terrainMap;
uniform sampler2D terrainTex;
uniform sampler2D terrainAltimetry;

void main() {

	vec4 color = texture2D(terrainMap, vTextureCoord);
    vec4 text_color = texture2D(terrainTex,vTextureCoord);
    vec4 new_colour = 0.55*texture2D(terrainAltimetry, vec2(0,-color.r))+ text_color;

	gl_FragColor = new_colour;
}