var lorenz = null;
var controls = null;

document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
      delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError : false
    });
});

window.addEventListener('load', function() {
    var canvas = document.querySelector('#lorenz');
    lorenz = Lorenz.run(canvas);
    flush_param_inputs(lorenz);
    controls = new Controls(lorenz);

    //toggle panels
    window.addEventListener('keypress', function(e) {
        if (e.which === 'j'.charCodeAt(0)) {
            var h = document.querySelector('#control-panel');
            h.style.display = h.style.display == 'none' ? 'flex' : 'none';
        }
    });
    window.addEventListener('touchstart', function self(e) {
        var h = document.querySelector('#control-panel');
        h.style.display = 'none';
    });

    window.addEventListener('keypress', function(e) {
        if (e.which === 'k'.charCodeAt(0)) {
            var h = document.querySelector('#presets-panel');
            h.style.display = h.style.display == 'none' ? 'flex' : 'none';
        }
    });
    window.addEventListener('touchstart', function self(e) {
        var h = document.querySelector('#params-panel');
        h.style.display = 'none';
    });

    window.addEventListener('keypress', function(e) {
        if (e.which === 'l'.charCodeAt(0)) {
            var h = document.querySelector('#params-panel');
            h.style.display = h.style.display == 'none' ? 'flex' : 'none';
        }
    });
    window.addEventListener('touchstart', function self(e) {
        var h = document.querySelector('#presets-panel');
        h.style.display = 'none';
    });

    update_stats = (function() {
        var stats = document.querySelector('#stats');
        
        return function() {
            var fps = lorenz.fps;
            var count = lorenz.solutions.length.toLocaleString();
            var paused = lorenz.params.paused === true ? '⏸':'▶';
            stats.textContent = count + ' solutions @ ' + fps + ' FPS' + ' ' + paused;
        }
    })();
    update_timer = (function() {
        var timer_label = document.querySelector('#timer-label');
         return function() {
            var timer = lorenz.display.timer;
            timer_label.textContent = timer.toFixed(3);
        }
    })();
    update_fix_p = (function() {
        var fix_p_xy_label = document.querySelector('#fix-p-xy-label');
        var fix_p_z_label = document.querySelector('#fix-p-z-label');
         return function() {
            if(lorenz.params.rho < 1){
                fix_p_xy_label.textContent = 'NaN';
                fix_p_z_label.textContent = 'NaN';
                return;
            }
            var xy = Math.sqrt(lorenz.params.beta * (lorenz.params.rho - 1));
            var z = lorenz.params.rho - 1;
            fix_p_xy_label.textContent = xy.toFixed(5);
            fix_p_z_label.textContent = z.toFixed(5);
        }
    })();

    window.setInterval(update_stats, 1000);
    window.setInterval(update_timer, 10);
    window.setInterval(update_fix_p, 500);
    controls.listeners.push(update_stats);

    var option = document.querySelector('#option');
    option.addEventListener('input', function() {
        // console.log(option.value);

        if(option.value === 'reset-params'){ // Params
            
            controls.use_lorenz();
            controls.reset_params();

        }if(option.value === 'disturbance-amplitude-input'){

            var disturbance_amplitude = parseFloat(document.querySelector('#'+option.value).value);
            lorenz.params.rho_disturb_A = disturbance_amplitude;

        }if(option.value === 'disturbance-frequency-input'){

            var disturbance_frequency = parseFloat(document.querySelector('#'+option.value).value);
            lorenz.params.rho_disturb_w = disturbance_frequency;

        }else if(option.value === 'clear'){// Solutions

            controls.clear();

        }else if(option.value === 'random-with-perturbation'){
            
            var num_of_sample_to_add = document.querySelector('#sample-num-input').value;
            controls.add();
            for (var i = 1; i <= num_of_sample_to_add - 1; i++)
                controls.clone();

        }else if(option.value === 'scatter'){
            
            var num_of_sample_to_add = document.querySelector('#sample-num-input').value;
            for (var i = 1; i <= num_of_sample_to_add; i++)
                controls.add();

        }else if(option.value === 'coord-with-perturbation'){
            
            var num_of_sample_to_add = document.querySelector('#sample-num-input').value;
            var x = document.querySelector('#sample-coord-input-x').value;
            var y = document.querySelector('#sample-coord-input-y').value;
            var z = document.querySelector('#sample-coord-input-z').value;
            var coord = [parseFloat(x), parseFloat(y), parseFloat(z)];

            controls.add(coord);
            for (var i = 1; i <= num_of_sample_to_add - 1; i++)
                controls.clone();

        }else if(option.value === 'projection'){ // Display

            controls.toggle_projection();

        }else if(option.value === 'proj-non'){

            controls.proj_none();

        }else if(option.value === 'proj-x-y'){

            controls.proj_on_xy();

        }else if(option.value === 'proj-x-z'){

            controls.proj_on_xz();

        }else if(option.value === 'proj-y-z'){

            controls.proj_on_yz();

        }else if(option.value === 'view-from-x'){

            controls.view_from_x();
            
        }else if(option.value === 'view-from-y'){
            
            controls.view_from_y();
            
        }else if(option.value === 'view-from-z'){
            
            controls.view_from_z();

        }else if(option.value === 'reset-view'){

            controls.reset_view();

        }else if(option.value === 'toggle-axis'){

            controls.toggle_axis();

        }else if(option.value === 'toggle-heads'){

            controls.toggle_heads();

        }else if(option.value === 'toggle-ticker-timer'){
            
            controls.toggle_ticker_timer();

        }else if (option.value === 'gentle-rotation') {

            controls.rotate(0.008);

        }else if (option.value === 'toggle-rotation-damping') {

            controls.toggle_rotation_damping();

        }else if (option.value === 'step-size-input') {
            
            var step_size = parseFloat(document.querySelector('#'+option.value).value);
            lorenz.params.step_size = step_size;

        }else if (option.value === 'steps-per-frame-input') {
            
            var steps_per_frame = parseInt(document.querySelector('#'+option.value).value);
            lorenz.params.steps_per_frame = steps_per_frame;

        }else if (option.value === 'ticker-speed-input') {

            var ticker_speed = parseFloat(document.querySelector('#'+option.value).value)/10.0;
            lorenz.display.ticker_speed = ticker_speed;

        }else if (option.value === 'preset-3d-view') { // Presets

            controls.reset_view();
            controls.persp();
            controls.proj_none();

        }else if (option.value === 'preset-xt-view') {

            controls.reset_view();
            controls.ortho();
            controls.proj_on_xz();
            controls.view_from_z(1);

            controls.disable_ticker_timer();
            controls.enable_ticker_timer();

        }else if (option.value === 'preset-yt-view') {

            controls.reset_view();
            controls.ortho();
            controls.proj_on_yz();
            controls.view_from_z(0);

            controls.disable_ticker_timer();
            controls.enable_ticker_timer();

        }else if (option.value === 'new-sys-scatter') {

            controls.reset_params();
            flush_param_inputs(lorenz);

            controls.use_new_sys();
            lorenz.display.scale = 1 / 100;
            controls.reset_view();
            controls.persp();
            controls.disable_ticker_timer();

            controls.clear();

            for (var i = 1; i <= 64; i++)
                controls.add(); 

            controls.rotate(0.004);
        }else if (option.value === 'new-sys-preset') {

            controls.reset_params();
            flush_param_inputs(lorenz);

            controls.use_new_sys();
            lorenz.display.scale = 1 / 50;
            controls.reset_view();
            controls.persp();
            controls.disable_ticker_timer();

            controls.clear();

            controls.add([5, 20, 20]);
            controls.add([10, 20, 10]);

            controls.rotate(0.005);
        }else if (option.value === 'rossler-scatter') {

            controls.reset_params();
            controls.set_rho(10);
            flush_param_inputs(lorenz);

            controls.use_rossler();
            lorenz.display.scale = 1 / 50;
            controls.reset_view();
            controls.persp();
            controls.disable_ticker_timer();

            controls.clear();

            for (var i = 1; i <= 64; i++)
                controls.add();

            controls.rotate(0.005);
        }
    });
});

function presetParams(sigma, beta, rho, method, preset_samples){
    controls.use_lorenz();
    lorenz.display.scale = 1 / rho;
    // controls.reset_view();
    controls.persp();
    controls.disable_ticker_timer();

    // 均保留六位小数
    sigma = parseFloat(sigma.toFixed(6));
    beta = parseFloat(beta.toFixed(6));
    rho = parseFloat(rho.toFixed(6));

    controls.reset_params();
    controls.set_sigma(sigma);
    controls.set_beta(beta);
    controls.set_rho(rho);
    flush_param_inputs(lorenz);

    controls.clear();
    if(method === 'chaos'){
        controls.add();
        for (var i = 1; i <= 32-1; i++)
            controls.clone();
    }else if (method === 'chaos-preset') {
        var len = preset_samples.length;
        for (var i = 0; i < len; i++) {
            controls.add(preset_samples[i]);
            for (var i = 1; i <= 32-1; i++)
                controls.clone();
        }
    }else if (method === 'scatter') {
        for (var i = 1; i <= 32; i++)
            controls.add();
    }else if (method === 'preset-disturb'){
        lorenz.params.rho_disturb_A = 1.5;
        lorenz.params.rho_disturb_w = 0.1;
        flush_param_inputs(lorenz);

        var len = preset_samples.length;
        for (var i = 0; i < len; i++) {
            controls.add(preset_samples[i]);
        }
    }else if (method === 'single') {
        controls.add();
    }else if (method === 'preset') {
        var len = preset_samples.length;
        for (var i = 0; i < len; i++) {
            controls.add(preset_samples[i]);
        }
    }
}

var setValueTriggerInput = (function() {
    var gap = 1;
    var lastCall = 0;

    return function(param_id, value) {
        var now = Date.now();
        if (now - lastCall >= gap) {
            lastCall = now;

            var param_ele = document.getElementById(param_id);
            param_ele.value = value;

            // 创建并触发一个新的 'input' 事件
            var event = new Event('input', { bubbles: true });
            param_ele.dispatchEvent(event);
        }
    }
})();

function flush_param_inputs(lorenz) {
    document.getElementById('length-input').value = Math.round(Math.log2(lorenz.length));
    document.getElementById('sigma-input').value = lorenz.params.sigma;
    document.getElementById('beta-input').value = lorenz.params.beta;
    document.getElementById('rho-input').value = lorenz.params.rho;
    document.getElementById('disturbance-amplitude-input').value = lorenz.params.rho_disturb_A;
    document.getElementById('disturbance-frequency-input').value = lorenz.params.rho_disturb_w;
}