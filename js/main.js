var lorenz = null;
var controls = null;

window.addEventListener('load', function() {
    var canvas = document.querySelector('#lorenz');
    lorenz = Lorenz.run(canvas);
    changeParam('length-input', lorenz.params.length);
    changeParam('sigma-input', lorenz.params.sigma);
    changeParam('beta-input', lorenz.params.beta);
    changeParam('rho-input', lorenz.params.rho);
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

    var preset = document.querySelector('#preset');
    preset.addEventListener('input', function() {
    // var preset = document.getElementById('preset');
    // preset.addEventListener('input', function() {
        console.log(preset.value);
        if (preset.value === 'chaos') {
            controls.clear();
            controls.add();
            for (var i = 0; i < 31; i++)
                controls.clone();
        } else if (preset.value === 'gentle') {
            while (lorenz.solutions.length < 32)
                controls.add();
            lorenz.display.rotationd[0] = 0;
            lorenz.display.rotationd[1] = 0;
            lorenz.display.rotationd[2] = 0.007;
            lorenz.display.damping = false;
        } else if (preset.value === 'bendy') {
            while (lorenz.solutions.length < 32)
                controls.add();
            controls.set_sigma(17.24);
            controls.set_beta(1.1);
            controls.set_rho(217);
            lorenz.display.scale = 1 / 65;
        }
    });
});

function changePreset(option) {
    var preset = document.getElementById('preset');
    preset.value = option;

    // 创建并触发一个新的 'input' 事件
    var event = new Event('input', { bubbles: true });
    preset.dispatchEvent(event);
}

function changeParam(id, value) {
    var param = document.getElementById(id);
    param.value = value;

    // 创建并触发一个新的 'input' 事件
    var event = new Event('input', { bubbles: true });
    param.dispatchEvent(event);
}