window.addEventListener("DOMContentLoaded", init);

function init() {
    const width = 960;
    const height = 540;

    // レンダラーを作成
    const canvasElement = document.querySelector('#myCanvas');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasElement });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();
    scene.background=new
        THREE.Color(0x87CEEB);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, 700);

    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // 環境光源を作成
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.5;
    scene.add(ambientLight);

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.intensity = 1;
    directionalLight.position.set(1, 3, 1);
    scene.add(directionalLight);

    // 3Dモデルの読み込み
    const objLoader = new THREE.OBJLoader();
    objLoader.load('minami005obj.obj', function (obj) {
        scene.add(obj);
        obj.position.set(-50, -100, 0);
    });

    // アニメーションループ
    function tick() {
        controls.update(); // コントローラーの更新
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
    tick();
}
