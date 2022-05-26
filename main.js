
//import * as THREE from 'three';

var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
        camera.position.z = 5;
        
        var renderer = new THREE.WebGLRenderer({antialias: true});
        // renderer.setClearColorHex( 0x000000, 1 );
        renderer.setClearColor("#000000");
        renderer.setSize(window.innerWidth,window.innerHeight);

        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth,window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;

            camera.updateProjectionMatrix();
        })

        document.body.appendChild(renderer.domElement);


        const geometry = new THREE.IcosahedronGeometry(3, 1);
const material = new THREE.MeshStandardMaterial({color: 0xFF5555});
const icos     = new THREE.Mesh(geometry, material);

scene.add(icos);


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)
const ambientLight = new THREE.AmbientLight(0xffffff)
const lightHelper = new THREE.PointLightHelper(pointLight)


const controls = new THREE.OrbitControls(camera, renderer.domElement);



const imgTexture = new THREE.TextureLoader().load('enceladus.jpg');
const nrmTexture = new THREE.TextureLoader().load('normal.jpg');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(10, 30, 30),
  // new THREE.MeshStandardMaterial({color: 0xFF5555})
  new THREE.MeshStandardMaterial({
    map: imgTexture//,
    //normalMap: nrmTexture
  })
);

planet.position.set(-10,-10,40);

scene.add(pointLight, lightHelper, planet)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1,20,20);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff })
  const star = new THREE.Mesh(geometry, material);

  //const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  const rg = 90;
  const x = Math.random() * rg - (rg/2);
  const y = Math.random() * rg - (rg/2);
  const z = Math.random() * rg - (rg/2);

  star.position.set(x,y,z);
  scene.add(star);
}

for (let x = 0; x < 2000; x++ ) {
  addStar();
}

function animate() {
  requestAnimationFrame(animate);
  icos.rotation.x -= .01;
  icos.rotation.y -= .005;
  icos.rotation.z += .005;

  controls.update();

  renderer.render( scene, camera);
}

// function moveCamera() {
// const t = document.body.getBoundingClientRect().top -5;
// planet.rotation.x += .17;
// planet.rotation.y += .17;
// planet.rotation.z += .17;
// camera.position.z = t * -.01
// camera.position.x = t * -.0005;

// }

// document.body.onscroll = moveCamera

animate()

{/* <script src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js"></script>
<script src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/102/three.js"></script> */}