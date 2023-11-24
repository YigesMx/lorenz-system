var lorenz = null;
var controls = null;

window.addEventListener('load', function() {
    var canvas = document.querySelector('#lorenz');
    lorenz = Lorenz.run(canvas);
    flush_params(lorenz);
    controls = new Controls(lorenz);

    window.addEventListener('keypress', function(e) {
        if (e.which === '?'.charCodeAt(0)) {
            var h = document.querySelector('#help');
            h.style.display = h.style.display == 'none' ? 'block' : 'none';
        }
    });
    window.addEventListener('touchstart', function self(e) {
        var h = document.querySelector('#help');
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
        if(option.value === 'single-with-perturbation'){

            controls.clear();
            controls.add();
            for (var i = 0; i < 31; i++)
                controls.clone();

        }else if(option.value === 'scatter'){

            controls.clear()
            for (var i = 0; i < 31; i++)
                controls.add();

        }else if(option.value === 'reset-view'){

            lorenz.display = lorenz.get_default_display();

        }else if(option.value === 'toggle-axes'){

            lorenz.display.draw_axes = !lorenz.display.draw_axes;

        }else if (option.value === 'gentle-rotation') {

            lorenz.display.rotationd[0] = 0;
            lorenz.display.rotationd[1] = 0;
            lorenz.display.rotationd[2] = 0.008;
            lorenz.display.damping = false;

        }else if (option.value === 'chaos') {
            controls.clear();
            controls.add();
            for (var i = 0; i < 31; i++)
                controls.clone();
            lorenz.params = lorenz.get_default_params();
            lorenz.display = lorenz.get_default_display();

            flush_params(lorenz);
        }else if (option.value === 'bendy') {
            controls.clear()
            for (var i = 0; i < 31; i++)
                controls.add();

            controls.set_sigma(17.24);
            controls.set_beta(1.1);
            controls.set_rho(217);

            lorenz.display.scale = 1 / 65;

            flush_params(lorenz);
        }
    });
});


var gap = 1;

var setValueTriggerInput = (function() {
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