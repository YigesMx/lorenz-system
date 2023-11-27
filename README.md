# Lorenz System Visualizer

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
    - Toggle Axes.
    - Modify step size (simulation percision).
    - Modify steps of simulation per frame (speed).
    - Modify the Ticker-Timer's speed (scale of the time axis).
  - Solutions
    - Specify the number of solutions to add.
    - Add solutions at a specific point.
  - Presets 
    - More presets under different parameters to reveal the evolution of lorenz system. (When finishing a assignment of the Dynamics System course.)
- Fixed some problems:
  - Wrong binding of the param 'rho', etc.