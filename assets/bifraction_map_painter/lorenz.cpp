#include<cstdio>
#include<cmath>
#include<algorithm>
#include<vector>
const double eps = 1e-3;
using namespace std;

inline double rand_num(double l, double r){ // l~r 的随机数
    return l + (r - l) * rand() / RAND_MAX;
}

// 四阶龙格-库塔方法
double lorenz(double &x, double &y, double &z, const double &sigma, const double &beta, const double &rho, const double &dt) {

    auto dx = [&](double x, double y, double z) { return sigma * (y - x); };
    auto dy = [&](double x, double y, double z) { return x * (rho - z) - y; };
    auto dz = [&](double x, double y, double z) { return x * y - beta * z; };

    double k1dx = dx(x, y, z);
    double k1dy = dy(x, y, z);
    double k1dz = dz(x, y, z);

    double k2x = x + k1dx * dt / 2;
    double k2y = y + k1dy * dt / 2;
    double k2z = z + k1dz * dt / 2;

    double k2dx = dx(k2x, k2y, k2z);
    double k2dy = dy(k2x, k2y, k2z);
    double k2dz = dz(k2x, k2y, k2z);

    double k3x = x + k2dx * dt / 2;
    double k3y = y + k2dy * dt / 2;
    double k3z = z + k2dz * dt / 2;

    double k3dx = dx(k3x, k3y, k3z);
    double k3dy = dy(k3x, k3y, k3z);
    double k3dz = dz(k3x, k3y, k3z);

    double k4x = x + k3dx * dt;
    double k4y = y + k3dy * dt;
    double k4z = z + k3dz * dt;

    double k4dx = dx(k4x, k4y, k4z);
    double k4dy = dy(k4x, k4y, k4z);
    double k4dz = dz(k4x, k4y, k4z);

    x = x + (k1dx + 2*k2dx + 2*k3dx + k4dx) * dt / 6;
    y = y + (k1dy + 2*k2dy + 2*k3dy + k4dy) * dt / 6;
    z = z + (k1dz + 2*k2dz + 2*k3dz + k4dz) * dt / 6;

    return k1dz;
};

int main(){
    srand(time(0));

    double sigma = 10;
    double beta = 8.0/3;
    printf("sigma = %.3lf, beta = %.3lf\n", sigma, beta);
    double rho_range[] = {0, 330};
    double rho_step = 0.1;
    int rho_num = round(1.0 * (rho_range[1] - rho_range[0]) / rho_step) + 1;

    double dt = 0.005;
    double time_start = 25;
    double time_limit = 150;

    int num_init = 2;

    vector<vector<double>> data;
    int col_limit = 10000;
    int mac_col = 0;
    for(double rho=rho_range[0]; rho<=rho_range[1]+eps; rho+=rho_step){
        data.push_back(vector<double>());

        data.back().push_back(rho);
        int col_cnt = 1;

        for(int j=0; j<num_init; j++){
            double x = rand_num(-200,200);
            double y = rand_num(-200,200);
            double z = rand_num(-10,400);

            for(double k=0; k<=time_limit; k+=dt){
                double dz = lorenz(x, y, z, sigma, beta, rho, dt);
                if(k >= time_start && abs(dz) < 0.5){
                    data.back().push_back(z);
                    col_cnt++;
                }
                if(col_cnt >= col_limit){
                    break;
                }
            }
        }
        mac_col = max(mac_col, col_cnt);
    }

    freopen("data_0_330.csv", "w", stdout);

    for(int i=0; i<data.size(); i++){
        for(int j=0; j<data[i].size(); j++){
            printf("%.3lf,", data[i][j]);
        }
        for(int j=data[i].size(); j<mac_col; j++){
            printf("-1,");
        }
        printf("\n");
    }

    return 0;
}