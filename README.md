# Lorenz System Visualizer

[Github Pages](https://yigesmx.github.io/lorenz-system/)

This is an modified interactive visualizer of [Lorenz system](https://en.wikipedia.org/wiki/Lorenz_system). 

This project is based on [skeeto/lorenz-webgl](https://github.com/skeeto/lorenz-webgl), thanks to the author for the great work.

I fixed some problems and add some features to the original project:

- Improved the control panel and made it eazier to:
  - Modify the display-related parameters.
  - Manage the solutions/samples.
  - Modify the parameters of the lorenz system.
- Add some functions:
  - Display
    - Toggle Perspective/Orthographic projection.
    - Project on X-Y, Y-Z, X-Z plane.
    - Quick change view point: view from X, -Y, Z axis.
    - Toggle and show Ticker-Timer: If toggled on, when the solutions project on a plane, the time axis will be displayed on the normal direction.
    - Reset View.
    - Toggle Axes: The axis will be displayed at the length of rho.
    - Modify step size (simulation percision).
    - Modify steps of simulation per frame (speed).
    - Modify the Ticker-Timer's speed (scale of the time axis).
  - Solutions
    - Specify the number of solutions to add.
    - Add solutions at a specific point.
  - Notes & Presets 
    - Quick view sets.
    - A **detailed analysis** of the parameter space of lorenz system.
    - More presets when exploring parameter space to reveal the complex and gorgeous evolution of lorenz system. (A *Nonlinear Dynamics and Chaos* course assignment.)
  - Params
    - Some feature needed in the assignment.
- Fixed some problems:
  - Wrong binding of the param 'rho', etc.

## run

```bash
npm install
npx vite # using vite
```

或

```bash
npm install
npm start # using electron
```