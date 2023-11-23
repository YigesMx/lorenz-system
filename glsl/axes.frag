precision mediump float;

uniform vec3 color;

varying vec3 frag_point;
varying float size;

bool is_int(float f){
    return (f - float(int(f)))<0.1;
}

void main() {
    gl_FragColor = vec4(color, 1);

    // gl_LineWidth = size;

    if (is_int(frag_point.x) && is_int(frag_point.y) && is_int(frag_point.z)){
        gl_FragColor = vec4(1, 1, 1, 1);
    }
}
