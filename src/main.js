// ==================== main.js ==================== //
// Describe: 主函数
// ================================================= //
import * as App from './application';
import * as Global from './global';
import * as Gui from './gui';
import * as Scene from './scene';

async function main () {
    // 场景定义
    const { scene, camera, renderer, controls } = Scene.initScene();

    // 数据初始化
    await App.initModelList().then((modelList) => {
        Global.modelList_set(modelList);
    });

    // 场景初始化
    App.initFloor(scene);
    // 加载第一个模型
    if (Global.modelList_getLength() > 0) {
        let firstModel = Global.modelList_get()[0];
        await App.loadModel(scene, firstModel);
    }

    // GUI初始化
    Gui.initGUI(scene);

    // 动画循环
    function animate () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    main();
});