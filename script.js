// background particles
const c=document.getElementById('bg'),ctx=c.getContext('2d');
let w,h,particles=[];
function resize(){w=c.width=innerWidth;h=c.height=innerHeight;}
window.onresize=resize;resize();

for(let i=0;i<120;i++){
 particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*0.6,vy:(Math.random()-.5)*0.6,r:Math.random()*2+1});
}

function draw(){
 ctx.clearRect(0,0,w,h);
 ctx.fillStyle="#00eaff";
 particles.forEach(p=>{
   p.x+=p.vx;p.y+=p.vy;
   if(p.x<0||p.x>w)p.vx*=-1;
   if(p.y<0||p.y>h)p.vy*=-1;
   ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
 });
 requestAnimationFrame(draw);
}
draw();
