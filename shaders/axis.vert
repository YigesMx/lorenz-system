attribute vec3 point;

uniform float aspect;
uniform float scale;
uniform vec3 rotation;
uniform vec3 translation;
uniform float rho;

// uniform int proj_mode;

varying vec3 frag_point;
varying float size;

void main() {
    // vec3 point = project_to_plane(point, proj_mode);
    float scale = scale * (projection == 0 ? 1.0 : ortho_scale);

    vec4 position = vec4(point.xy, point.z - rho, 1);
    gl_Position = view_frustum(radians(45.0), aspect, 0.0, 10.0)
        * translate(translation.x, translation.y, translation.z)
        * rotate_x(rotation.x)
        * rotate_y(rotation.y)
        * rotate_z(rotation.z)
        * view_scale(scale, scale, scale)
        * position; 
    
    frag_point = point;
    size = 160.0 * scale;
}
