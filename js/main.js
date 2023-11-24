var lorenz = null;
var controls = null;

window.addEventListener('load', function() {
    var canvas = document.querySelector('#lorenz');
    lorenz = Lorenz.run(canvas);
    flush_params(lorenz);
    controls = new Controls(lorenz);

    window.addEventListener('keypress', function(e) {
        if (e.which === 'q'.charCodeAt(0)) {
            var h = document.querySelector('#control-panel');
            h.style.display = h.style.display == 'none' ? 'block' : 'none';
        }
    });
    window.addEventListener('touchstart', function self(e) {
        var h = document.querySelector('#control-panel');
        h.style.display = 'none';
    });

    window.addEventListener('keypress', function(e) {
        if (e.which === 'e'.charCodeAt(0)) {
            var h = document.querySelector('#presets-panel');
            h.style.display = h.style.display == 'none' ? 'block' : 'none';
        }
    });
    window.addEventListener('touchstart', function self(e) {
        var h = document.querySelector('#presets-panel');
        h.style.display = 'none';
    });

    var stats = document.querySelector('#stats');
    function update_stats() {
        var fps = lorenz.fps;
        var count = lorenz.solutions.length.toLocaleString();
        stats.textContent = count + ' @ ' + fps + ' FPS';
    }
    window.setInterval(update_stats, 1000);
    controls.listeners.push(update_stats);

    var option = document.querySelector('#option');
    option.addEventListener('input', function() {
        // console.log(option.value);
        var num_of_sample_to_add = document.querySelector('#sample-num-input').value;
        var x = document.querySelector('#sample-coord-input-x').value;
        var y = document.querySelector('#sample-coord-input-y').value;
        var z = document.querySelector('#sample-coord-input-z').value;
        //转为float数组
        var coord = [parseFloat(x), parseFloat(y), parseFloat(z)];
        console.log(num_of_sample_to_add);
        if(option.value === 'reset-params'){ // Controls
            var default_params = lorenz.get_default_params();
            controls.set_sigma(default_params.sigma);
            controls.set_beta(default_params.beta);
            controls.set_rho(default_params.rho);

            flush_params(lorenz);
        }else if(option.value === 'clear'){// Sample

            controls.clear();

        }else if(option.value === 'random-with-perturbation'){

            controls.add();
            for (var i = 1; i <= num_of_sample_to_add - 1; i++)
                controls.clone();

        }else if(option.value === 'scatter'){

            for (var i = 1; i <= num_of_sample_to_add; i++)
                controls.add();

        }else if(option.value === 'coord-with-perturbation'){

            controls.add(coord);
            for (var i = 1; i <= num_of_sample_to_add - 1; i++)
                controls.clone();

        }else if(option.value === 'proj-non'){ // Display

            lorenz.display.proj_mode = 0;

        }else if(option.value === 'proj-x-y'){

            lorenz.display.proj_mode = 1;
            lorenz.display.rotation = [0, Math.PI, -Math.PI*(1/2)];

        }else if(option.value === 'proj-x-z'){

            lorenz.display.proj_mode = 2;
            lorenz.display.rotation = [Math.PI*(1/2), Math.PI, -Math.PI*(1)];

        }else if(option.value === 'proj-y-z'){

            lorenz.display.proj_mode = 3;
            lorenz.display.rotation = [Math.PI*(1/2), Math.PI, -Math.PI*(1/2)];

        }else if(option.value === 'reset-view'){

            var default_display = lorenz.get_default_display();
            lorenz.display.scale = default_display.scale;
            lorenz.display.rotation = default_display.rotation;
            lorenz.display.rotationd = default_display.rotationd;
            lorenz.display.translation = default_display.translation;

        }else if(option.value === 'toggle-axes'){

            lorenz.display.draw_axes = !lorenz.display.draw_axes;

        }else if (option.value === 'gentle-rotation') {

            lorenz.display.rotationd[0] = 0;
            lorenz.display.rotationd[1] = 0;
            lorenz.display.rotationd[2] = 0.008;
            lorenz.display.damping = false;

        }else if(option.value === 'view-from-x'){

            lorenz.display.rotation = [Math.PI*(1/2), Math.PI, -Math.PI*(1/2)];
            
        }else if(option.value === 'view-from-y'){
            
            lorenz.display.rotation = [Math.PI*(1/2), Math.PI, -Math.PI*(1)];
            
        }else if(option.value === 'view-from-z'){
            
            lorenz.display.rotation = [0, Math.PI, -Math.PI*(1/2)];

        }else if (option.value === 'chaos') { // Presets
            controls.clear();
            controls.add();
            for (var i = 1; i <= 32-1; i++)
                controls.clone();
            var default_params = lorenz.get_default_params();
            controls.set_sigma(default_params.sigma);
            controls.set_beta(default_params.beta);
            controls.set_rho(default_params.rho);

            flush_params(lorenz);
        }else if (option.value === 'bendy') {
            controls.clear()
            for (var i = 1; i < 32; i++)
                controls.add();

            controls.set_sigma(17.24);
            controls.set_beta(1.1);
            controls.set_rho(217);

            lorenz.display.scale = 1 / 65;

            flush_params(lorenz);
        }
    });
});



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

function flush_params(lorenz) {
    setTimeout(function() {
        setValueTriggerInput('length-input', Math.round(Math.log2(lorenz.length)));
    }, 0);

    setTimeout(function() {
        setValueTriggerInput('sigma-input', lorenz.params.sigma);
    }, 40);

    setTimeout(function() {
        setValueTriggerInput('beta-input', lorenz.params.beta);
    }, 80);

    setTimeout(function() {
        setValueTriggerInput('rho-input', lorenz.params.rho);
    }, 120);
}