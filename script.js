const items = [
  ["kitchen","Kitchen • Custom Cabinetry","https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=900&q=85"],
  ["kitchen","Kitchen • Modern Oak","https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85"],
  ["kitchen","Kitchen • Contemporary","https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85"],
  ["kitchen","Kitchen • Minimal White","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85"],
  ["kitchen","Kitchen • Warm Wood","https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85"],
  ["wardrobe","Wardrobe • Built-In","https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85"],
  ["wardrobe","Wardrobe • Dressing Room","https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85"],
  ["wardrobe","Wardrobe • Wood Finish","https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=900&q=85"],
  ["wardrobe","Wardrobe • Contemporary","https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=85"],
  ["furniture","Chair • Lounge","https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85"],
  ["furniture","Chair • Accent","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85"],
  ["furniture","Sofa • Modern","https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&w=900&q=85"],
  ["furniture","Coffee Table • Natural","https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=900&q=85"],
  ["furniture","Dining • Contemporary","https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85"],
  ["furniture","Side Table • Minimal","https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85"],
  ["furniture","Armchair • Statement","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85"],
  ["decor","Mirror • Organic Form","https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85"],
  ["decor","Decor • Ceramic Objects","https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85"],
  ["decor","Decor • Wall Art","https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85"],
  ["decor","Decor • Sculptural Detail","https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"],
  ["decor","Decor • Interior Styling","https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"],
  ["office","Office • Executive Desk","https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85"],
  ["office","Office • Workstations","https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85"],
  ["office","Office • Meeting Room","https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85"],
  ["office","Office • Collaborative Space","https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=85"]
];

const gallery = document.getElementById("gallery");
function renderGallery(filter="all"){
  gallery.innerHTML = items.map((item,i)=>`
    <article class="gallery-item ${filter!=="all"&&item[0]!==filter?"hidden":""}">
      <img src="${item[2]}" alt="${item[1]}" loading="${i<6?"eager":"lazy"}">
      <div class="gallery-label">${item[1]}</div>
    </article>`).join("");
}
renderGallery();

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.filter);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav nav");
menuToggle.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll("section>*, .service-card, .project, .process-line>div").forEach(el=>el.classList.add("reveal"));
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

/* Lightweight Three.js showroom scene — designed for GitHub Pages. */
const canvas=document.getElementById("hero3d");
const scene=new THREE.Scene();
scene.background=new THREE.Color(0xf5f3ee);
const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,100);
camera.position.set(5.8,3.6,8.8);

const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;

const ambient=new THREE.HemisphereLight(0xffffff,0x5d695e,2.2);
scene.add(ambient);
const key=new THREE.DirectionalLight(0xffffff,3.5);
key.position.set(4,8,5); key.castShadow=true; scene.add(key);
const fill=new THREE.PointLight(0xb8d5bd,2.5,20);
fill.position.set(-4,3,2); scene.add(fill);

const floor=new THREE.Mesh(
  new THREE.PlaneGeometry(30,30),
  new THREE.MeshStandardMaterial({color:0xdedbd3,roughness:.82,metalness:0})
);
floor.rotation.x=-Math.PI/2; floor.position.y=-1.25; floor.receiveShadow=true; scene.add(floor);

function mat(c,rough=.5,metal=0){return new THREE.MeshStandardMaterial({color:c,roughness:rough,metalness:metal})}
const wood=mat(0x8a5c32,.62), navy=mat(0x203c59,.45), cream=mat(0xe9e4d9,.72), green=mat(0x557c5d,.55), gold=mat(0xb47a18,.3,.65);

const showroom=new THREE.Group(); scene.add(showroom);
function box(w,h,d,m,x,y,z){
 const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);
 mesh.position.set(x,y,z); mesh.castShadow=true; mesh.receiveShadow=true; showroom.add(mesh); return mesh;
}
function cylinder(r,h,m,x,y,z){
 const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,32),m);
 mesh.position.set(x,y,z); mesh.castShadow=true; showroom.add(mesh); return mesh;
}

/* Cabinet */
box(2.9,3.6,.72,wood,0,0.55,0);
box(1.36,3.35,.06,cream,-.72,.55,-.39);
box(1.36,3.35,.06,cream,.72,.55,-.39);
for(let x of [-.72,.72]) cylinder(.035,.035,gold,x,.58,-.46).rotation.z=Math.PI/2;

/* Console / coffee table */
box(2.3,.16,1.25,wood,3.1,-.93,.1);
for(let x of [2.45,3.75]) box(.1,.9,.1,gold,x,-1.35,.1);

/* Accent chair */
const seat=box(1.65,.42,1.35,navy,-3.0,-.55,.15);
box(1.65,1.7,.24,navy,-3.0,.42,.73);
for(let x of [-3.55,-2.45]) box(.12,.75, .12,wood,x,-1.0,.15);

/* Plant */
cylinder(.35,.55,wood,3.9,-.63,-1.0);
for(let i=0;i<5;i++){
 const leaf=new THREE.Mesh(new THREE.SphereGeometry(.25,16,8),green);
 leaf.scale.set(.55,.95,.2); leaf.position.set(3.9+(i-2)*.22,.15+Math.abs(i-2)*.08,-1);
 leaf.rotation.z=(i-2)*.35; leaf.castShadow=true; showroom.add(leaf);
}

/* Decorative discs */
for(let i=0;i<3;i++) cylinder(.16,.07,gold,2.2+i*.38,-.78,.25);

let mx=0,my=0, targetX=0,targetY=0;
addEventListener("pointermove",e=>{
 targetX=(e.clientX/innerWidth-.5)*.8;
 targetY=(e.clientY/innerHeight-.5)*.35;
});
addEventListener("resize",()=>{
 camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
 renderer.setSize(innerWidth,innerHeight);
});
function animate(){
 requestAnimationFrame(animate);
 mx+=(targetX-mx)*.035; my+=(targetY-my)*.035;
 showroom.rotation.y=mx*.42;
 showroom.rotation.x=-my*.18;
 showroom.position.x=innerWidth<700?1.5:1.1;
 showroom.position.y=.05;
 camera.position.x=5.8+mx*.5;
 camera.lookAt(0,.1,0);
 renderer.render(scene,camera);
}
animate();

window.addEventListener("scroll",()=>{
 const y=scrollY;
 showroom.position.y=Math.min(y*.0018,.55);
 showroom.rotation.y += Math.min(y*.000015,.08);
});
