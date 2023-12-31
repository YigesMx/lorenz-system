attribute vec3 point;
attribute vec3 color;

uniform float aspect;
uniform float scale;
uniform vec3 rotation;
uniform vec3 translation;
uniform float rho;

uniform int proj_mode;

varying vec3 vcolor;

void main() {
    vec3 point = project_to_plane(point, proj_mode, 0.0, 0.0);

    gl_PointSize = 3.5 ;
    float scale = scale * (projection == 0 ? 1.0 : ortho_scale);

    vcolor = color;
    vec4 position = vec4(point.xy, point.z - rho, 1);
    gl_Position = view_frustum(radians(45.0), aspect, 0.0, 10.0)
        * translate(translation.x, translation.y, translation.z)
        * rotate_x(rotation.x)
        * rotate_y(rotation.y)
        * rotate_z(rotation.z)
        * view_scale(scale, scale, scale)
        * position;
}
