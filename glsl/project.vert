precision mediump float;

mat4 view_frustum(
    float angle_of_view,
    float aspect_ratio,
    float z_near,
    float z_far
) {
    return mat4(
        vec4(1.0/tan(angle_of_view),           0.0, 0.0, 0.0),
        vec4(0.0, aspect_ratio/tan(angle_of_view),  0.0, 0.0),
        vec4(0.0, 0.0,    (z_far+z_near)/(z_far-z_near), 1.0),
        vec4(0.0, 0.0, -2.0*z_far*z_near/(z_far-z_near), 0.0)
    );
}

mat4 view_scale(float x, float y, float z)
{
    return mat4(
        vec4(x,   0.0, 0.0, 0.0),
        vec4(0.0, -y,   0.0, 0.0), //!!!
        vec4(0.0, 0.0, z,   0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}

mat4 translate(float x, float y, float z)
{
    return mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0, 1.0, 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(x,   y,   z,   1.0)
    );
}

mat4 rotate_x(float t)
{
    float st = sin(t);
    float ct = cos(t);
    return mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0,  ct,  st, 0.0),
        vec4(0.0, -st,  ct, 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}


mat4 rotate_y(float t)
{
    float st = sin(t);
    float ct = cos(t);
    return mat4(
        vec4( ct, 0.0,  st, 0.0),
        vec4(0.0, 1.0, 0.0, 0.0),
        vec4(-st, 0.0,  ct, 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}

mat4 rotate_z(float t)
{
    float st = sin(t);
    float ct = cos(t);
    return mat4(
        vec4( ct,  st, 0.0, 0.0),
        vec4(-st,  ct, 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}

vec3 project_to_plane(vec3 v, int mode)
{
    if (mode == 0) {
        return v;
    } else if (mode == 1) {
        return vec3(v.x, v.y, 0.0);
    } else if (mode == 2) {
        return vec3(v.x, 0.0, v.z);
    } else if (mode == 3) {
        return vec3(0.0, v.y, v.z);
    }
}