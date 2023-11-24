precision mediump float;
uniform int projection;

mat4 ortho(float left, float right, float bottom, float top, float near, float far) {
    mat4 trans = mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0, 1.0, 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
    return trans*mat4(
        vec4(2.0 / (right - left), 0.0, 0.0, 0.0),
        vec4(0.0, 2.0 / (top - bottom), 0.0, 0.0),
        vec4(0.0, 0.0, -2.0 / (far - near), 0.0),
        vec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0)
    );
}

float ortho_scale = 15.0;

mat4 view_frustum(
    float angle_of_view,
    float aspect_ratio,
    float z_near,
    float z_far
) {
    if(projection == 0){
        //perspective
        return mat4(
            vec4(1.0/tan(angle_of_view),           0.0, 0.0, 0.0),
            vec4(0.0, aspect_ratio/tan(angle_of_view),  0.0, 0.0),
            vec4(0.0, 0.0,    (z_far+z_near)/(z_far-z_near), 1.0),
            vec4(0.0, 0.0, -2.0*z_far*z_near/(z_far-z_near), 0.0)
        );
    }else{
        //ortho 正交投影
        float scale = 20.0;
        float bottom = -abs(scale * tan(angle_of_view));
        float top = abs(scale * tan(angle_of_view));
        float left = -scale * tan(angle_of_view) * aspect_ratio;
        float right = scale * tan(angle_of_view) * aspect_ratio;

        return ortho(left, right, bottom, top, -200.0, 200.0);  
    }
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

vec3 project_to_plane(vec3 v, int mode, float timer, float fade)
{
    if (mode == 0) {
        return v;
    } else if (mode == 1) {
        return vec3(v.x, v.y, timer*(1.0-fade));
    } else if (mode == 2) {
        return vec3(v.x, timer*(1.0-fade), v.z);
    } else if (mode == 3) {
        return vec3(timer*(1.0-fade), v.y, v.z);
    }
}