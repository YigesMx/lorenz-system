<style>
body {
    background-color: rgb(223, 228, 234) !important;
    color: rgb(47, 53, 66) !important;
    font-size: 110% !important;
}

strong {
    color:rgb(7, 153, 146)!important;
}

img {
    width: 60%;
    border-radius: 5px;
    opacity: 1;
}

.img-block {
    text-align: center;
    opacity: 1;
}

.simulation-block {
    background-color: rgb(206, 214, 224);
    border-radius: 5px;
    margin: 1%;
    padding: 1%;
}
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous"></script>

<div style="text-align:center;">
<h1> Exploring Parameter Space </h1>
</div>

<p style="text-align: right;">A <em>Nonlinear Dynamics and Chaos</em> Course Assignment</p>
<p style="text-align: right;">21421019 Yiges.M.x.</p>
  
## 1. 混沌 与 Lorenz Equation

### 1.1 混沌的一种定义

- 确定性非周期性
- 对初值的敏感依赖性
- 长期行为的不可预测性
- 紧致性：一个紧致系统的每一条轨道都有极限集

### 1.2 Lorenz 方程的定义
<details>
  <summary>
    Lorentz 方程来源
  </summary>
  <p>
    Lorenz 方程是基于纳维－斯托克斯方程 (Navier-Stokes equations)、连续性方程和热传导方程简化得出，最初的形式为：
    $$
    \begin{aligned}
    \frac { \partial \vec v }{\partial t} + \left( \vec v \nabla \right) \vec v &=
    -\frac {\nabla p}{\rho} + \nu \nabla ^2 \vec v + \vec g \\
    {\frac {\partial \rho }{\partial t}}+\nabla \cdot \left(\rho {\vec {v}}\right) &= 0 \\
    {\frac {\partial T}{\partial t}}+\nabla \cdot \left(T{\vec {v}}\right) &= \chi \nabla ^{2}T \\
    \end{aligned}
    $$
    其中，$\vec v$ 为流速，$\rho$ 为流体密度，$T$ 为流体温度。$T_0$ 为上限温度，$p$ 为压强，$\vec g$ 为重力加速度，$\nu$ 为运动粘度系数，$\chi$ 为热扩散系数，$\gamma$ 为热膨胀系数。简化后获得下方的 Lorenz 方程。
    <h5>from <a href="https://zh.wikipedia.org/wiki/%E6%B4%9B%E4%BC%A6%E8%8C%A8%E5%90%B8%E5%BC%95%E5%AD%90">wikipedia</a></h5>
  </p>
</details>

Lorenz 方程由 Lorenz 在研究大气对流时提出，用于描述大气中的对流运动。

$$
\begin{aligned}
  {x}' &= \sigma \left(y-x\right) \\
  {y}' &= \rho x - y - xz \\
  {z}' &= xy - \beta z\\
\end{aligned}
$$

式中，参数 $\sigma \gt 0,\rho \gt 0,\beta \gt 0$，$\sigma$ 为 Prandtl 数，$\rho$ 为 Rayleigh 数，$\beta$ 为几何参数（在对流问题中与卷的纵横比有关）。

 
在参数空间中，Lorenz 方程的解的性质随参数的变化而变化。三个参数中，$\sigma$ 和 $\beta$ 主要由系统本身决定，一般而言为常数。$\rho$ 可以理解为外界环境对系统的影响（输入）与系统耗散（泄漏/摩擦等）。


为了简化问题，我们首先选择在前两个参数固定时，改变 $\rho$ 来研究系统的性质。特别的参考各个文献，可以固定 $\sigma = 10$，$\beta = \frac{8}{3}$，来讨论 $\rho$ 的影响。相对于其他参数，这已经是一个简单的情形了，尽管通过接下来的分析我们依然可以发现它已经十分的复杂。


而对于其他参数，我也将在下面的分析后，再展示一些特殊的现象。这些现象与性质都可以体现出 Lorenz 系统有序与混沌之美的统一。

## 2. $\sigma = 10, \beta = \frac{8}{3}$

### 2.0 Illustration

首先我们通过前人或通过数值或通过解析的方式得到的分岔图，来大致了解固定 $\sigma = 10, \beta = \frac{8}{3}$ 时， $\rho$ 的影响。

首先是书中讨论参数空间时给到的一张图片：

<div class="img-block">
  <img src="./assets/bifraction_diagram_book.png" alt="bifraction_diagram_book">
</div>

这张图片简单地给出了当 $0 \leq \rho \leq 28$ 时系统所发生的一些“简单的分岔”与系统所处于的整体状态，也是我们下面首先分析的参数范围。


然而对于更广的参数范围，我们可以通过数值的方法来得到更广的参数范围的“类分岔图”，例如下面这张图片：

<div class="img-block">
  <img src="./assets/bifraction_diagram_rho_0_330.png" alt="bifraction_diagram_rho_0_330">
</div>

我绘制出这张图片的第一反应是：一张非常瑰丽的图像，在混乱中带点规律，给人一种惊奇的感觉。它在很多范围内呈现混乱无序的状态，又在另一些区域内呈现令人惊讶的有序。而它何时有序，何时无序，似乎又是个“随机”的过程（尽管方程是“确定”的）。

这张图片使用 <a href="https://www.wolfram.com/">Wolfram Language</a> 绘制（代码见仓库），方式是对于每个 $\rho$ 采样多个点进行模拟，在足够长的时间内对解到达 $z$ 方向上的极值点进行记录，即 $z'=0$ 时将其 $z$ 值记录下来，最后将这些点绘制在对应 $\rho$ 上方。

所以这张图并不是严格意义上的“分岔图”，而是通过蒙特卡洛方法进行采样，在足够长时间后对系统的“渐进最终状态”的一个记录。
 
（如果先阅读后面的讨论，或结合起来看下面这些内容，可能会帮助理解）

若这些初值的解最终收敛到极限环上，那么图形会与对应 $\rho = r$ 形成可数个交点。注意这里一个极限环在这个图上“至少”会形成两个交点，因为我们只记录了 $z$ 方向上的极值点，而一个简单的环在 $z$ 方向上的极值点有两个，所以至少会形成两个交点（若环有倍周期特性或奇怪的形状，则会形成更多的交点，其中倍周期情形产生的多个极值点这也可以在下面倍周期的相关讨论里面看到直观的解释，奇怪形状产生的多极值点可以参考 $\rho \approx 100.0$ 那一个倍周期区间的模拟）。

若这些解收敛到不动点上，那么图形会与对应 $\rho = r$ 形成一个交点。

若这些解不收敛，或进行了周期很大的运动，则会形成一些散布在 $z$ 方向上的点，在图中呈现一些灰色的混乱区域。

由此可以看出这个类“分岔图”首先不能展示一些排斥子，或不能直观展示。其次，周期很大的解也不是非常清楚，例如倍周期分岔多次后的图形就很接近混沌了，当然当这条界限模糊时也说明系统已经进入到了某种程度上的混沌。最后，这个图也不能很好地区分各个极限环和不动点，重叠的极值点只会展示一个，因为其在维度上进行了很大程度的压缩（三维到一维）。但是这个图可以很好地展示出系统的整体行为，以及在不同的参数下系统的行为的变化。

下面我们也将细致讨论这张图中的绝大部分区域。

### 2.1 $\rho \lt 1 $

当 $\rho \lt 1 $ 时，经过课本中 9.2 的讨论，即通过对线性化系统的讨论和 Lyapunov 函数的构造，可以证明系统有全局稳定的不动点 $(0,0,0)$。

<div class="simulation-block">
  <p>
    例如，以下是对 $\rho = 0.5$ 的仿真结果：
    <br/>
    <button id="preset-rho05-scatter" onclick="presetParams(10, 8/3, 0.5,'scatter');">&rho; = 0.5</button>
  </p>
</div>
    
### 2.2 $\rho = 1$

当 $\rho = 1$ 时，系统发生叉式分岔，但原点处依然稳定。

在所有的 $\rho > 1$ 后，出现两个新的不动点，记为 $ C^+$ 和 $C^-$：
$$
\begin{aligned}
  x^* = y^* &= \pm \sqrt{\beta(\rho - 1)} \\
  z^* &= \rho - 1
\end{aligned}
$$
并且此后原点变为一个不稳定的不动点。

### 2.3 $1 \lt \rho \lt 13.926$

当 $1 \lt \rho \lt 13.926$ 时，$C^+$ 和 $C^-$ 为稳定的不动点，原点为不稳定的不动点。并且 $C^+$ 和 $C^-$ 之间的距离随 $\rho$ 的增大而增大。

<div class="simulation-block">
  <p>
    例如，以下是对 $\rho = 10$ 的仿真结果，也可以自行调整 $\rho$ 的值观察此区间内解的变化：
    <br/>
    <button id="preset-rho10-scatter" onclick="presetParams(10, 8/3, 10,'scatter');">&rho; = 10</button>
  </p>
</div>

### 2.4 $\rho = 13.926$

当 $\rho = 13.926$ 时，系统发生同宿分岔，$\rho = 13.926^+$ 时，系统产生两个鞍环，由书中 9.2 节所述，这是只有在大于等于三维的动力系统中会出现的一种不稳定极限环。

这里对这个同宿分岔的展示可以参考以下图片，该图片来源于这个<a href="https://www.youtube.com/watch?v=-wjsjGQuFjY">视频</a>。这个视频着重讲解了这一个参数节点。

<div class="img-block">
  <img src="./assets/homoclinic_bifurcation.png" alt="homoclinic_bifurcation", style="width: 70%;">
</div>

### 2.5 $13.926 \lt \rho \lt \rho_H = 24.74 $

当 $13.926 \lt \rho \lt r_H = 24.74 $ 时，两个鞍环快速向 $C^+$ 和 $C^-$ 靠近。


#### 2.5.1 $13.926 \lt \rho \lt r_H = 24.06 $

当 $13.926 \lt \rho \lt r_H = 24.06 $ 时，一个解除了直接、稳定地收敛到 $C^+$ 或 $C^-$ 外，还有可能会在两个鞍环之间来回震荡，并在可能相当长的时间后最终都会收敛到 $C^+$ 或 $C^-$。这也被称为<strong>“暂态混沌”</strong>，按书中所述，这种情况也被称为“亚稳态混沌”或“预湍流”。

根据书中所述，在 $ \rho = 13.926 $ 时，产生了非常复杂的不变集，这个集是一簇无限多个鞍环和非周期轨道组成的，他不是吸引子，也无法直接观察，所有其附近的解都对初值条件极其敏感。但解在这个集合附近杂乱无章地运动一段时间后依然会落到 $C^+$ 或 $C^-$。

这种情况下，一方面，按照 9.3 或前面给出的定义，动力系统并不是“混沌”的，因为其足够长期的行为并不是非周期的。另一方面，此时的动力系统依然表现出了对初始条件的极度敏感，即对一个初值条件加以轻微的扰动，他就可能从收敛到 $C^+$ 变为收敛到 $C^-$，或反之。

<div class="simulation-block">
  <p>
    例如，以下是对 $\rho = 21$ 的全局仿真结果（书中例9.5.1）：
    <br/>
    <button id="preset-rho21-scatter" onclick="presetParams(10, 8/3, 21,'scatter');">&rho; = 21</button>
  </p>
  <p>
    当然不是所有轨道都会出现暂态混沌，参考习题 9.5.6，我们找出 $\rho = 21$ 时，出现暂态混沌的三个初始条件，和不会出现暂态混沌的三个初始条件，分别作模拟：
  </p>
  <p>
    <button id="preset-rho21-1" onclick="presetParams(10, 8/3, 21,'preset',[[1,1,20],[30,30,20],[30,30,10]]);">暂态混沌</button>
    <br/>选取了三个点：
    <br/>(1, 1, 20): 离 z 轴比较近，暂态混沌时间最久；
    <br/>(30, 30, 20): 离 z 轴比较远，暂态混沌时间较短；
    <br/>(30, 30, 10): 也离 z 轴比较远，暂态混沌时间很短。
  </p>
  <p>
    <button id="preset-rho21-2" onclick="presetParams(10, 8/3, 21,'preset',[[7,7,21],[5,5,20],[20,20,20]]);">非暂态混沌</button>
    <br/>选取了三个点：
    <br/>(7, 7, 21): 离 $C^+$ 非常近；
    <br/>(5, 5, 20): 也离 $C^+$ 非常近；
    <br/>(20, 20, 20): 虽然离 $C^+$ 远，但任然没有瞬态混沌，可见初值的敏感依赖性是非常严重的。
  </p>
  <p>
    如下给出预测初始条件能否导致暂态混沌的经验规则：
    <br/>- 如果离 $C^+$ 和 $C^-$ 的距离接近（比如在两个极限环内），那么大概率不会发生瞬态混沌。
    <br/>- 若距离 $C^+$ 和 $C^-$ 的距离远则有可能发生瞬态混沌，也可能不会发生
    （此时也对初值有比较强的敏感依赖性，这决定了一切都有可能，例如对
    <button id="preset-rho21-2" onclick="presetParams(10, 8/3, 21,'chaos-preset',[[30,30,100]]);">(30, 30, 100)</button>
    的初值加以扰动，就会有解分别收敛到 $C^+$ 和 $C^-$ 且暂态混沌时间长短差异很大，可以通过 x-t 或 y-t 对比）
    <br/>- 如果离 z 轴很近，则非常容易发生瞬态混沌（如(0.1, 0.1, 20)等）。
  </p>
</div>

#### 2.5.2 $24.06 \lt \rho \lt r_H = 24.74 $

当 $\rho$ 非常接近 $13.926$ 时，鞍环较大，很难出现暂态混沌，系统比较容易收敛。而当 $\rho$ 较大时，书中讲到，[Yorke and Yorke, 1979] 最终证明了，在 $\rho$ 增大来到 $\gt 24.06$ 时，一个解在前面所提到的不变集附近游荡的时间就会变成 $\infty$，不变集变为一个<strong>“奇怪吸引子”</strong>。

书中 9.3 节对这个奇怪吸引子做了分析（虽然是对 $\rho = 28$ 分析讲解，但是是有普适性的）。这个吸引子不是不动的、稳定的，但其体积为 $0$，满足分析的体积收缩性质。此外，看起来它由两个曲面聚合而成，但由解的唯一性理论，这并不会发生。事实上，这是由无穷多离散的“曲面”组成的，有无穷大的面积而体积为 $0$ 的点集。这个奇怪吸引子也被称为<strong>“分形”</strong>，经分析它的纬度为 $D \approx 2.05$，这也在书的后续章节进行了讨论。

所以在 $24.06 \lt \rho \lt 24.74$ 时，系统有两种吸引子：一种是不动点 $C^+$ 和 $C^-$，另一个是奇怪吸引子。

此时一个解要么被吸引到 $C^+$ 和 $C^-$，要么被吸引到奇怪吸引子。

若解被吸引到奇怪吸引子，那么其轨道将会在奇怪吸引子附近无限长时间游荡，为紧致的，且轨道是非周期的，按照 9.3 或前面的定义，这是一种混沌的状态。

若解被吸引到 $C^+$ 或 $C^-$，虽然可能先会进入暂态混沌的形式，即在离不变集一段距离内游荡一段时间后收敛，但最终状态是稳定的，长期行为是确定的。

综上，虽然有的解是稳定的，即整个系统不满足混沌的定义，但系统会进入到近似混沌的状态。

<div class="simulation-block">
  <p>
    下面是对 $\rho = 24.3$ 的局部仿真结果: （可以通过更改左侧“steps per frame”参数加速模拟，更直观看到效果）
    <button id="preset-rho243-local" onclick="
      presetParams(10, 8/3, 24.3,'preset',[[5.5,5.5,23.3],[5.6,5.6,23.3],[5.7,5.7,23.3],[5.8,5.8,23.3],[5.9,5.9,23.3]]);">
      &rho; = 24.3
    </button>
  </p>
  <p>在这个参数下，两个不动点坐标近似为：
    $$
    \begin{aligned}
      C^+ &= (\ 7.88247,\ 7.88247, 23.30)\\
      C^- &= (-7.88247, -7.88247, 23.30)
    \end{aligned}
    $$
    这个仿真选择了 $5$ 个初始条件：
    $$
    \begin{aligned}
      s_1 &= (5.5, 5.5, 23.30)\\
      s_2 &= (5.6, 5.6, 23.30)\\
      s_3 &= (5.7, 5.7, 23.30)\\
      s_4 &= (5.8, 5.8, 23.30)\\
      s_5 &= (5.9, 5.9, 23.30)
    \end{aligned}
    $$
    可以看到，$s_1$ 和 $s_2$ 缓慢离开极限环向外，被奇怪吸引子吸引，最终进入混沌的状态，在奇怪吸引子附近呈现复杂无规律的运动。并且注意这不是暂态混沌，是无限长时间在奇怪吸引子附近游荡，不会被 $C^+$ 或 $C^-$ 吸引。而 $s_3$ 很靠近极限环，但其还是缓慢离开极限环向内，最终和 $s_4$ 以及 $s_5$ 都被 $C^+$ 吸引并收敛。
  </p>
  <p>
    下面是对 $\rho = 24.3$ 的全局仿真结果: 
    <br/>
    <button id="preset-rho243-scatter" onclick="presetParams(10, 8/3, 24.3,'scatter');">&rho; = 24.3</button>
  </p>
  <p>
    可以注意到一些解逐步向内离开极限环，最终都被 $C^+$ 或 $C^-$ 吸引。而另一些点则在奇怪吸引子附近混沌地游荡，它们最终都不会被 $C^+$ 或 $C^-$ 吸引。
  </p>
</div>

### 2.5.3 不动点和奇怪吸引子之间的滞后性

参考习题 9.5.4：假设我们稍微增加或减少 $\rho$ 的值，特别的令 $\rho = 24.4 + \sin\left( \omega t \right)$，其中 $\omega$ 是一个很小的常数，比吸引子的通常轨道的近似角频率要小。我们可以发现一个介于平衡点和混沌态之间的令人吃惊的滞后。

书中 9.5 节对此也做了如下描述：这意味着一个足够大的扰动能够使一个稳定运动的水车变成一个永久的混沌水车。

当然这个分析涉及到 $\rho \gt \rho_H$ 的情况，这在之后会进行讨论，这里简要说明当 $\rho$ 少量超过这个界限时，系统仅存在一个奇怪吸引子，系统为全局混沌的。

<div class="simulation-block">
  <p>
    例如，以下是对 $\rho = 24.4 + 1.5 \cdot\sin\left( \omega t \right)$ 的全局随机仿真结果：
    <br/>
    <button id="preset-rho2404-scatter-disturb" onclick="presetParams(10, 8/3, 24.4,'scatter-disturb');controls.enable_ticker_timer();">&rho; = 24.4 + 1.5sin(wt)</button>
  </p>
</div>
 
从模拟结果来看，可以发现这个“滞后”是指：虽然某些时刻系统处于有稳定不动点的状态，但在后面某个时刻由于对于 $\rho$ 的扰动使得稳定不动点变为不稳定的，导致一些解在不动点周围游荡，在被吸引和排斥之间不断变化。甚至如果扰动较大，这些解会被奇怪吸引子吸引从而使得解进入永久的混沌无序的状态。


### 2.6 $\rho = \rho_H = 24.74 $

当 $\rho = \rho_H$ 时，两个鞍环与 $C^+$ 和 $C^-$ 合并，系统发生亚临界 Hopf 分岔，此时 $C^+$ 和 $C^-$ 变为不稳定不动点。

### 2.7 $24.74 \lt \rho \lt 313 $

后 $C^+$ 和 $C^-$ 变为不稳定不动点，所有靠近的解都将被排斥到较远的吸引子。但我们知道，这个系统有体积收缩的性质，所以他不能被排斥到无穷远，而是会被排斥到一个有限的区域内。但从前面给出的书上的小范围分岔图上来看，我们看不到任何稳定轨道或不动点等吸引子的迹象。所以在这个范围一定有奇特的现象发生。现在我们知道，这一切都是一个或若干奇怪吸引子的作用（当然还有例外的情况，在一些参数下这个奇怪吸引子会发生戏剧性的变化，变为普通的极限环，后面会提到）。

#### 2.7.1 $24.74 \lt \rho \leq 28 $

课本 9.4 节，介绍了 Lorenz 及一些学者的工作。这些工作对略微大于 $24.74$ 的情况排除了稳定极限环，并且证明了 Lorenz 方程事实上存在奇怪吸引子，并不是数值模拟造成的“错觉”。

结论是，在 $\rho \gt \rho_H = 24.74 $ 后的一段 $\rho$ 范围内，系统只有一个奇怪吸引子，系统呈现全局的混沌状态：所有的解都会被奇怪吸引子吸引，在附近不规则、无周期地游荡。

<div class="simulation-block">
  <p>
    例如，以下是对 $\rho = 28$ 的全局随机仿真结果：
    <br/>
    <button id="preset-rho28-scatter" onclick="presetParams(10, 8/3, 28,'scatter');">&rho; = 28</button>
  </p>
  <p>
    这也是书中例 9.3 讨论的部分，这部分除了展示这种混沌特性外，还证明了相邻轨道的指数速度分离，并给出了混沌和奇怪吸引子的一种定义。其中的一些内容也在前面提及奇怪吸引子时有所涉及。
  </p>
  <p>
    我们也可以通过选择一系列初始非常接近的点（或者说对一个初值进行微小扰动），来直观感受“对初值的敏感依赖性”以及混沌的美：
    <br/>
    <button id="preset-rho28-chaos" onclick="presetParams(10, 8/3, 28,'chaos');">&rho; = 28</button>
  </p>
</div>

#### 2.7.2 $28 \lt \rho \lt 313 $

这个范围的变得更为复杂，书中 9.5.2 提到，对于这个范围的绝大多数 $\rho$ 值，都发现了混沌现象，但也有周期行为的小窗口穿插进来。书中提到，最大的三个有周期行为的窗口是：

$$
\begin{aligned}
  99.524 &\lt \rho \lt 100.795 \\
  145 &\lt \rho \lt 166 \\
  214 &\lt \rho \lt 313
\end{aligned}
$$

当然，也能从开头给出的数值模拟得到的近似“分岔图”看到这些穿插的奇怪的有序区域。

下面将结合书中习题，选取一些区间或值进行一些模拟分析：

<div class="simulation-block">
  <p>
    首先，参考习题 9.5.1 和 9.5.3，对 $145 \lt \rho \lt 166$ 及附近的值进行仿真分析和大致分类。我们从 $\rho$ 由大到小的变化来详细看看这一过程：
  </p>
  <p>
    当 $ \rho > 166.07 $ （略微）时，没有极限环，系统进入一种“阵发性”混沌的状态，系统会在看似有稳定周期解一段时间后突然陷入短暂的混乱状态又恢复近似的周期解（看似在一个极限环的附近），并不断重复。
  </p>
  <p>
    以下是对 $ \rho = 166.3 $ 的仿真：（可以使用 x-t view 或 y-t view，并且以下所有模拟建议适当增加 simulation speed 来快速查看系统的更长期的行为）
    <br/>
    <button id="preset-rho16607-single" onclick="presetParams(10, 8/3, 166.3,'single');">&rho; = 166.3</button>
  </p>
  <p>
    接下来，我们探索 $145 \lt \rho \lt 166$ 左右的区间，书中称这个区间为一个“倍周期”区间。
  </p>
  <p>
    当 $\rho$ 减小到 $ \rho = 166.07 $ 时，系统产生一个单独的稳定的极限环。
  </p>
  <p>
    以下是对 $ \rho = 166.0 $、 $ \rho = 160.0 $ 和 $ \rho = 155.0 $ 的仿真，可以看到初始时随机生成的大量初始条件最终都会收敛到一个极限环上：
    <br/>
    <button id="preset-rho16600-scatter" onclick="presetParams(10, 8/3, 166,'scatter');">&rho; = 166.0</button>
    <button id="preset-rho16000-scatter" onclick="presetParams(10, 8/3, 160,'scatter');">&rho; = 160.0</button>
    <button id="preset-rho15500-scatter" onclick="presetParams(10, 8/3, 155,'scatter');">&rho; = 155.0</button>
  </p>
  <p>
    当 $ \rho = 154.4 $ 时，这个单独的稳定对称极限环分岔成两个稳定的极限环，注意这里并不是倍周期分岔，仅仅是极限环的分岔。
  </p>
  <p>
    以下是对 $ \rho = 154.0 $ 和 $ \rho = 148.5 $ 的仿真，可以看到初始时随机生成的大量初始条件最终都会收敛到两个极限环上：
    <br/>
    <button id="preset-rho15400-scatter" onclick="presetParams(10, 8/3, 154,'scatter');">&rho; = 154.0</button>
    <button id="preset-rho14850-scatter" onclick="presetParams(10, 8/3, 148.5,'scatter');">&rho; = 148.5</button>
  </p>
  <p>
    经过一些拓扑简化，可以发现其中一个极限环绕另外一个极限环绕行了三次：
  </p>
  <div class="img-block">
    <img src="./assets/rho148.5_topo.gif" alt="rho148.5_topo.gif">
  </div>
  <p>
    当 $ \rho = 148.2 $ 时，这两个单独的极限环各自发生倍周期分岔，每个极限环周期翻倍。从图上看看起来是四个极限环，然而实际上每个极限环是在绕两周后回到原来的点。
  </p>
  <p>
    这里也可以通过如下图片直观理解所谓的“倍周期”分岔：
  </p>
  <div class="img-block">
    <img src="./assets/period_doubling_bifraction.png" alt="period_doubling_bifraction">
  </div>
  <p>
    即类似于这里左侧红色的稳定的极限环在一个参数临界点后忽然变为右侧这样周期翻倍的极限环的过程。也可以参照一维映射中的倍周期分岔的例子进行类比，他们都是一个周期轨道的周期加倍，并会当参数变化时，在一个降维映射中突然留下更多痕迹（例如Logistic Map）。
  </p>
  <p>
    当 $ 145 \lt \rho \lt 148.2 $ 时，随着 $\rho$ 的减小，出现了无限次这样的的周期翻倍的分岔，这也是 $145 \lt \rho \lt 166$ 被称为“倍周期”区间的原因。
  </p>
  <p>
    以下是对 $ \rho = 148.0 $ 和 $ \rho = 147.5 $ 的仿真，可以看到初始时随机生成的大量初始条件最终都会收敛到两个极限环上，且每个极限环实际绕了两圈，虽然看起来像多个独立的极限环。
    <br/>
    <button id="preset-rho14800-scatter" onclick="presetParams(10, 8/3, 148,'scatter');">&rho; = 148.0</button>
    <button id="preset-rho14750-scatter" onclick="presetParams(10, 8/3, 147.5,'scatter');">&rho; = 147.5</button>
  </p>
  <p>
    当 $\rho$ 逐步减小至 $ \rho = 145 $ 时，系统经过了无限次上述“倍周期”分岔。分岔得到的系列极限环最终组合混杂成一个奇怪吸引子，系统呈混沌状态。
  </p>
  <p>
    以下是对 $ \rho = 145.0 $ 的仿真：
    <br/>
    <button id="preset-rho14500-scatter" onclick="presetParams(10, 8/3, 145,'scatter');">&rho; = 145.0</button>
  </p>
  <p>
    正如课堂上所讲，倍周期分岔现象也被认为是奇怪吸引子产生的一种重要方式，也是系统混沌的一种重要外在表现。
  </p>
  <p>
    例如 Rossler 系统走向混沌的过程，也是随着参数连续变化，系统中的一个极限环不断发生倍周期分岔而产生了奇怪吸引子。上面直观理解倍周期分岔的图片的来源，以及倍周期分岔和 Rossler 系统的简单展示都可以见以下这篇<a href="https://www.zhihu.com/question/68229746">文章</a>。
  </p>
  <p>
    通过下面放大开头给出的近似“分岔图”，我们也能一睹在 $\rho$ 逐步减小时，系统是如何发生倍周期分岔的。
  </p>
  <div class="img-block">
    <img src="./assets/bifraction_diagram_rho_140_170.png" alt="bifraction_diagram_rho_140_170">
  </div>
  <p>
    可以看到随着 $\rho$ 逐步减小，混沌的状态戛然而止，并且结合模拟我们可以知道，这是由于系统产生一个有四个不同 $z$ 方向极值（下面简称极值）的关于 $z$ 轴中心对称的极限环。在 $\rho \approx 154.4 $ 时，突然变成了八个不同极值，结合模拟可以知道，这是由于上述极限环发生了分裂，生成了两个极限环，每个极限环都有 $8$ 个不同的极值，但由于两个极限环关于 $z$ 轴中心对称，所以他们一共只有八个不同的极值（也就是说在这个图上重叠了，并且由于这个对称性导致的重叠，后续我们始终只能在图上看见一个极限环的极值）。在 $\rho \approx 148.2 $ 时，极值数量再次翻倍，结合模拟可以发现，这是由于上述两个极限环发生了倍周期分岔，每个极限环周期翻倍，并且极值数量也发生了翻倍，且虽然每个极限环两次绕行的轨道间距很小，但依然造成了不同的极值。此后发生这样的分岔的 $\rho$ 的间距越来越小，并且这些极值迅速产生重叠，并进入混沌的状态。
  </p>
  <p>
    此外也可以发现在 $\rho \lt 145.0$ （略微）的时候，也存在一些很小的周期窗口，例如 $\rho \approx 143.3$，这里发生的事情与此前讨论的 $145 \lt \rho \lt 166$ 如出一辙，可以自行模拟尝试。
  </p>
  <p>
    注：虽然不能通过分岔图直接得出各种分岔的结论，因为前面也提到图上的这种看起来的“分岔”可能是多种原因造成的，并且就算有分岔也不一定会显示在图上，这也是降维过程中一定存在的损失。不过我们依然能从图上窥见上面这些有趣的现象。
  </p>
</div>

<div class="simulation-block">
  <p>
    与 $145 \lt \rho \lt 166$ 类似，我们对 $212 \lt \rho \lt 313$ 及附近的值进行仿真分析和大致分类。但这次我们从 $\rho$ 由小到大的变化来简略地看看这一过程：
  </p>
  <p>
    首先，参考习题 9.5.2 简单看看 ，当 $\rho = 212$ 时，系统所呈现的性质。
  </p>
  <p>
    以下是对 $ \rho = 212.0 $ 的仿真：
    <br/>
    <button id="preset-rho21200-scatter" onclick="presetParams(10, 8/3, 212,'scatter');">&rho; = 212.0</button>
  </p>
  <p>
    可以看到所有解最终都在两个互相穿过的拓扑区域（两个奇怪吸引子？）内进行类似周期的混乱行为，这在书中称为噪声周期性。相比于前面分析的 $145 \lt \rho \lt 166$ 区间中的两个极限环，这里的两个区域更加明显，且容易发现其中一个区域只绕行了另一个区域一次。
  </p>
  <p>
    当 $ \rho = 213.0 $ 左右时，上述两个区域迅速塌缩，系统产生两个稳定对称的极限环（看起来是两组，每组都有非常多极限环，但实际上是两个，只是每个极限环的周期非常大，会在相近的一系列轨道上绕行很多圈回到原来的地方，就和此前 $145 \lt \rho \lt 166$ 讨论的类似）。
  </p>
  <p>
    当 $ \rho = 231.0 $ 左右时，上述两个极限环最终各自自己与自己合并为一个周期最小的极限环，整个系统此时存在两个互相穿过的简单环。
  </p>
  <p>
    以上过程可以通过自行缓慢增加 $\rho$ 的方式来观察（滑动下方的 $\rho$ 旁边的滑动条，或点击/按住输入框旁边的三角形），以下是对中间过程 $ \rho = 224.0 $ 和 $ \rho = 231.0 $ 的仿真：
    <br/>
    <button id="preset-rho21200-scatter" onclick="presetParams(10, 8/3, 224,'scatter');">&rho; = 224.0</button>
    <button id="preset-rho21200-scatter" onclick="presetParams(10, 8/3, 231,'scatter');">&rho; = 231.0</button>
  </p>
  <p>
    接下来随着 $\rho$ 的增加，这两个极限环缓慢靠拢，直到 $\rho = 313$ 时，两个极限环合并为一个极限环。以上整个过程也是极限环的分岔过程。
  </p>
  <p>
    这部分可以直接观察开头给出的近似“分岔图”来理解，这部分在原图中占有较大的区域。
  </p>
  <div class="img-block">
    <img src="./assets/bifraction_diagram_rho_200_320.png" alt="bifraction_diagram_rho_200_320">
  </div>
</div>

<div class="simulation-block">
  <p>
    同样的，通过放大 $99.524 \lt \rho \lt 100.795$ 等这些区域，我们也能得到相似的结论。
  </p>
  <div class="img-block">
    <img src="./assets/bifraction_diagram_rho_90_102.png" alt="bifraction_diagram_rho_90_102">
  </div>
  <p>
    这里也不展开讲解了，这也同样展现了“倍周期分岔是通往混沌的一种重要方式”。值得一提的是这里出现了三的倍数的极值点，通过自行模拟，可以发现这其实是形状更加奇怪的极限环:)。
  </p>
</div>

### 2.8 $\rho \gt 313 $

当 $\rho$ 充分大，特别的，当 $\rho \gt 313 $ 时，动力学系统再次变的简单。

<div class="simulation-block">
  <p>
    以下是参考例题 9.5.2 对 $ \rho = 350.0 $ 的仿真：
    <br/>
    <button id="preset-rho35000-scatter" onclick="presetParams(10, 8/3, 350,'scatter');">&rho; = 350.0</button>
  </p>
</div>

数值实验表明，此时系统有一个全局吸引的极限环。书中提到，Robbins 使用微扰法描述 $\rho$ 较大时的极限环，他的工作的一部分在习题 9.5.5 中给出：

<div class="simulation-block">
  <p>
    习题 9.5.5: 考虑 $\rho \rightarrow \infty$ 时的 Lorenz 系统，利用某种方式取极限，可以使方程中的所有耗散项消失 [Robbins, 1979, Sparrow, 1981]。
  </p>

  <div>
    <p style="text-indent: -1em; padding-left: 1em;">
      (a) 令 $ \epsilon = \rho^{-\frac{1}{2}} $，因此 $\rho \rightarrow \infty$ 时 $ \epsilon \rightarrow 0 $。
      求一个包含 $\epsilon$ 的变量变换，使得当 $\epsilon \rightarrow 0$ 时，洛伦兹方程变为：
      $$
      \begin{aligned}
        {X}' &= Y \\
        {Y}' &= -XZ \\
        {Z}' &= XY
      \end{aligned}
      $$
    </p>
    <p style="padding-left: 2em;">
      解：由于洛伦兹方程中只有二阶项，我们考虑如下二阶的变量变换：
      $$
      \begin{aligned}
        X&=x_0+x\left(a_0+a_1\epsilon + a_2 \left(\epsilon \right)^2 \right) \\ 
        Y&=y_0+y\left(b_0+b_1\epsilon + b_2 \left(\epsilon \right)^2 \right) \\ 
        Z&=z_0+z\left(c_0+c_1\epsilon + c_2 \left(\epsilon \right)^2 \right)
      \end{aligned}
      $$
      依照题意，将变量变换后代入洛仑兹方程中后我们需满足当 $\epsilon \rightarrow 0$ 时，方程有如下形式：
      $$
      \begin{aligned}
        {X}' &= Y \\
        {Y}' &= -XZ \\
        {Z}' &= XY \\
      \end{aligned}
      $$
      于是我们解得
      $$
      \begin{aligned}
        X &= \epsilon x \\
        Y &= \epsilon^2 \sigma y \\
        Z &= \sigma \left( \epsilon^2 z-1\right) \\
        \tau &= \frac{t}{\epsilon} 
      \end{aligned}
      $$
    </p>
  </div>

  <div>
    <p style="text-indent: -1em; padding-left: 1em;">
      (b) 求新系统的两个守恒量（即运动守恒量）
    </p>
    <p style="padding-left: 2em;">
      解：
      $$ 
      \begin{aligned}
        { \left( Y^2+Z^2 \right) }'
        &= 2Y{Y}'+2Z{Z}'\\
        &= 2Y\left(-XZ\right)+2Z\left(XY\right)\\
        &= -2XYZ+2XYZ=0 \\ 
        { \left( X^2-2Z \right) }'
        &= 2X{X}'+2{Z}'\\
        &= 2XY-2XYY\\
        &= 0
      \end{aligned}
      $$
    </p>
  </div>

  <div>
    <p style="text-indent: -1em; padding-left: 1em;">
      (c) 证明新系统是体积不变的。（即根据系统的时间演化，任意一团“相流”的体积是不变的，尽管其形状会发生戏剧性的变化）
    </p>
    <p style="padding-left: 2em;">
      解：新系统写为向量场形式：
      $$
      \vec{F} \left(X,Y,Z\right) = \begin{bmatrix} Y \\ -XZ \\ XY \end{bmatrix} \\
      $$
      我们知道向量场 $\vec{F}$ 的散度:
      $$
      \begin{aligned}
        \nabla \cdot \vec{F} &= \frac{\partial F_X}{\partial X} + \frac{\partial F_Y}{\partial Y} + \frac{\partial F_Z}{\partial Z} \\
        &= 0
      \end{aligned}
      $$
      所以
      $$
      \begin{aligned}
        \dot{V} &= \int_V \nabla \cdot \vec{F} \mathrm{d}x \\
        &= \int_V 0 \mathrm{d}x = 0
      \end{aligned}
      $$ 由此看出系统体积不变。
    </p>
  </div>

  <div>
    <p style="text-indent: -1em; padding-left: 1em;">
      (d) 从物理的角度解释为什么当 $\rho$ 达到一定阈值时，或许能预见 Lorenz 系统会出现一些保守特征。
    </p>
    <p style="padding-left: 2em;">
      解：参数 $\rho$ 为一个比率，没有量纲，分子代表外界驱动能力，分母代表系统内耗散（如水车中的水泄漏和阻尼），当 $\rho$ 趋近于无穷，系统耗散在相对输入的层面上接近于0，系统就可能表现出保守特征。
    </p>
  </div>

  <div>
    <p style="text-indent: -1em; padding-left: 1em;">
      (e) 利用数值方法求解新系统。它有什么长期行为？是否与 $\rho$ 足够大时的 Lorenz 系统的行为一致？
    </p>
    <p style="padding-left: 2em;">
      解：数值模拟：（可以使用任何 Presets 或使用 Params 面板的 Reset Params 切换回 Lorenz 方程）
      <button id="new-sys-scatter" onclick="setValueTriggerInput('option', this.id)"> New System - Scatter </button>
    </p>
    <p style="padding-left: 2em;">
      这是随机初值的模拟结果，可以发现，所有解都有周期行为，并且可以发现系统主要有以下两类解：
      <button id="new-sys-preset" onclick="setValueTriggerInput('option', this.id)"> New System - Selected </button>
    </p>
    <p style="padding-left: 2em;">
      注意到，耗散项消失后，新系统是保守的，也就是系统有无数闭轨，而 Lorenz 系统尽管 $\rho$ 很大，但依然存在耗散，只有一个全局吸引的极限环。但新系统中的鞍状解与 $\rho$ 较大时 Lorenz 系统的唯一极限环很相似，有类似的周期行为。
    </p>
  </div>
</div>

## 3. Summary

总的来说，通过本次作业，我通过数值模拟与少许解析的方式，结合大量资料，对 Lorenz 系统的动力学行为有了更直观的认识与更深入的了解，也对混沌现象有了更深刻的认识。

## 4. Reference

<script>
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
</script>
<script>
//循环页面每一个<p>，在开头加入两个空格
var p = document.getElementsByTagName("p");
for (var i = 0; i < p.length; i++) {
  p[i].innerHTML = "　　" + p[i].innerHTML;
}
</script>