import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { AmbientLight, MathUtils } from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(60)

renderer.render(scene, camera)

// geometry

const geometry = new THREE.TorusGeometry(10, 1, 8, 50)
const material = new THREE.MeshStandardMaterial({ color: 0xffd700 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

// lighting

const pointLight = new THREE.PointLight(0xffffff, 0.9, 100)
pointLight.position.set(0, 20, 0)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(pointLight, ambientLight)

// these helpers add a mesh to the light and a grid to the x axis

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addRings() {
  const geometry = new THREE.IcosahedronGeometry(3, 0)
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
  const ring = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(80))

  ring.position.set(x, y, z)
  ring.rotation.set(x, y, z)
  scene.add(ring)
}

Array(5).fill().forEach(addRings)

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.005
  torus.rotation.y += 0.005
  torus.rotation.z += 0.001

  controls.update

  renderer.render(scene, camera)
}
animate()
