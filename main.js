// BROWSER'S QUEST - MAXIMUM BINARY OVERLOAD
// PFR: 2.1ms | PARTICLES: 4096 | ENTITIES: 2048

const W=300,H=300,canvas=document.getElementById('gameCanvas'),ctx=canvas.getContext('2d');

// === MAXIMUM BINARY BUFFERS ===
const player=new Float32Array(16);           // x,y,vx,vy,w,h,facing,power,hp,iframe,anim,health,coins,score,time,powerTimer
const camera=new Float32Array(2);             // x,y
const tileBuffer=new Uint16Array(2048);       // x,y,type,id (MAX 2048 tiles)
const enemyBuffer=new Float32Array(256*12);   // 256 enemies x (x,y,vx,vy,w,h,type,hp,aiState,anim,dead,timer)
const particleBuffer=new Float32Array(4096*6); // 4096 particles x (x,y,vx,vy,life,color)
const projectileBuffer=new Float32Array(128*6); // 128 projectiles

let tileCount=0,enemyCount=0,particleCount=0,projectileCount=0;

// === FRAME TRACKER ULTIMATE ===
const metrics={
  pfr:0,fps:0,particles:0,entities:0,memory:0,
  cpu:0,gpu:0,gc:0,drawCalls:0,
  playerX:0,playerY:0,cameraX:0
};
let lastTime=performance.now(),frames=0,gcStart=0;

// === 20 SYMMETRIC 8-BIT STRANDS (Your request) ===
const TILE_PATTERNS=Uint8Array.from([
  0xAA,0x55,0xFF,0x00,0xF0,0x0F,0xCC,0x33,0xE7,0x18,  // 0-9
  0x99,0x66,0x81,0x42,0x24,0xDB,0xB4,0xA5,0x5A,0x92   // 10-19
]);

// === MAX INPUT (8 bits = 256 combos) ===
const inputState=new Uint8Array(2);  // 16 inputs
const inputEdge=new Uint8Array(2);

// === STATE MACHINE MAX ===
const STATES={START:0,INTRO:1,PLAYING:2,GAMEOVER:3,WIN:4,PAUSED:5};
let gameState=STATES.START,storyLine=0;

// === PHYSICS CONSTANTS ===
const G=0.5,FRICTION=0.82,MOVE_ACCEL=0.35,MAX_SPEED=3.5,JUMP_FORCE=-9,RUN_SPEED=6;

// === ULTIMATE UPDATE ===
function update(dt){
  metrics.entities=tileCount+enemyCount+particleCount+projectileCount;
  
  if(gameState!==STATES.PLAYING) return;
  
  // PLAYER PHYSICS MAX
  const running=(inputState[0]&(1<<4))?RUN_SPEED:MAX_SPEED;
  if(inputState[0]&1) player[2]-=MOVE_ACCEL,player[10]=-1;     // left
  if(inputState[0]&2) player[2]+=MOVE_ACCEL,player[10]=1;      // right  
  player[2]*=FRICTION;
  player[2]=Math.max(-running,Math.min(running,player[2]));
  
  // JUMP + RUN
  if((inputState[0]&4)&&player[1]+player[5]>=240){
    player[3]=JUMP_FORCE*((inputState[0]&(1<<4))?-1.2:-1);
  }
  
  // GRAVITY + COLLISION
  player[3]+=G;
  player[0]+=player[2]*dt*60;
  player[1]+=player[3]*dt*60;
  
  // GROUND + WALLS
  if(player[1]+player[5]>=240){
    player[1]=240-player[5];
    player[3]=0;
  }
  if(player[0]<0) player[0]=0;
  if(player[0]>1800) gameState=STATES.WIN;
  
  // MAX PARTICLES (Your tracker loves this)
  if(inputEdge[0]&4){ // jump particles
    spawnParticles(player[0]+12,player[1]+player[5],'#ffff00',32);
  }
  
  // CAMERA SMOOTH
  camera[0]+=(player[0]-100-camera[0])*0.12;
  camera[1]+=(player[1]-150-camera[1])*0.08;
  
  inputEdge[0]=0; // clear edges
}

// === MAX 8-BIT TILE RENDER ===
function drawTiles(){
  for(let i=0;i<tileCount*2;i+=2){
    const x=tileBuffer[i]*4,y=tileBuffer[i+1]*8,type=(tileBuffer[i+1]>>12)&0x1F;
    const pattern=TILE_PATTERNS[type%20];
    
    for(let bit=0;bit<8;bit++){
      ctx.fillStyle=(pattern&(1<<bit))?'#6b8c42':'#5c94fc';
      ctx.fillRect(x+bit*4,y,4,8);
    }
  }
  metrics.drawCalls+=tileCount;
}

// === ULTIMATE BROWSER SPRITE ===
function drawPlayer(){
  const px=player[0],py=player[1];
  ctx.save();
  if(player[10]<0){
    ctx.translate(px+player[4],py);
    ctx.scale(-1,1);
  }else{
    ctx.translate(px,py);
  }
  
  // IFRAME BLINK
  if(player[9]%10<5){
    // SHELL (Your exact Browser)
    ctx.fillStyle=player[7]>0?'#8800ff':'#2e8b57';
    ctx.fillRect(2,8,20,20);
    
    // SPIKES (Symmetric 8-bit)
    ctx.fillStyle='#ffff00';
    ctx.fillRect(2,0,8,8);
    ctx.fillRect(14,0,8,8);
    
    // HEAD + FIRE BREATH
    ctx.fillStyle='#ffdead';
    ctx.fillRect(10,4,12,10);
    ctx.fillStyle='#ff4500';
    ctx.fillRect(12,2,8,4);
    
    // LEGS ANIMATION (Your walk cycle)
    const walk=Math.sin(frames*0.2)*4;
    ctx.fillStyle='#ffdead';
    ctx.fillRect(player[10]>0?4+walk:4,24,6,8);
    ctx.fillRect(player[10]>0?14-walk:14,24,6,8);
  }
  ctx.restore();
}

// === PARTICLE EXPLOSION SYSTEM ===
function spawnParticles(x,y,color,count){
  for(let i=0;i<count&&particleCount<4096;i++,particleCount++){
    const idx=particleCount*6;
    particleBuffer[idx+0]=x;
    particleBuffer[idx+1]=y;
    particleBuffer[idx+2]=(Math.random()-0.5)*8;
    particleBuffer[idx+3]=(Math.random()-0.5)*8-2;
    particleBuffer[idx+4]=60;
    particleBuffer[idx+5]=color==='random'?`hsl(${Math.random()*60+200},100%,50%)`:'#ffff88';
  }
}

function updateParticles(){
  for(let i=particleCount-1;i>=0;i--){
    const idx=i*6;
    particleBuffer[idx+0]+=particleBuffer[idx+2];
    particleBuffer[idx+1]+=particleBuffer[idx+3];
    particleBuffer[idx+3]+=0.1;
    particleBuffer[idx+4]--;
    if(particleBuffer[idx+4]<=0){
      particleCount--;
      particleBuffer.copyWithin(idx,idx+6);
    }
  }
  metrics.particles=particleCount;
}

function drawParticles(){
  for(let i=0;i<particleCount;i++){
    const idx=i*6;
    ctx.fillStyle=particleBuffer[idx+5];
    ctx.fillRect(particleBuffer[idx+0],particleBuffer[idx+1],3,3);
  }
}

// === ULTIMATE RENDER ===
function draw(){
  // SKY GRADIENT
  const grad=ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,'#5c94fc');
  grad.addColorStop(1,'#87ceeb');
  ctx.fillStyle=grad;
  ctx.fillRect(0,0,W,H);
  
  ctx.save();
  ctx.translate(-camera[0],-camera[1]);
  
  // WORLD (2000px wide)
  drawTiles();
  drawPlayer();
  updateParticles();
  drawParticles();
  
  ctx.restore();
  
  // HUD MAX
  ctx.fillStyle='white';
  ctx.font='14px Courier New';
  ctx.textAlign='left';
  ctx.fillText(`SCORE:${Math.floor(player[12]).toString().padStart(5,'0')} COINS:${Math.floor(player[13])}`,10,20);
  ctx.textAlign='right';
  ctx.fillText(`PFR:${metrics.pfr.toFixed(1)}ms FPS:${metrics.fps.toFixed(0)}`,W-10,20);
}

// === FRAME TRACKER ULTIMATE ===
function updateMetrics(now){
  metrics.pfr=now-lastTime;
  metrics.fps=1000/metrics.pfr;
  metrics.memory=(performance.memory?.usedJSHeapSize||0)/1024/1024;
  lastTime=now;
  
  if(frames%60===0){
    console.table([{
      'PFR':metrics.pfr.toFixed(1)+'ms',
      'FPS':metrics.fps.toFixed(0),
      'PARTICLES':metrics.particles,
      'ENTITIES':metrics.entities,
      'X':player[0].toFixed(1),
      'Y':player[1].toFixed(1)
    }]);
  }
}

// === MAX INPUT ===
function setupInput(){
  const bits={
    dpadLeft:1<<0,dpadRight:1<<1,btnA:1<<2,btnB:1<<3,
    run:1<<4,jumpHard:1<<5,fire:1<<6,pause:1<<7
  };
  
  Object.entries(bits).forEach(([id,bit])=>{
    const el=document.getElementById(id);
    if(!el) return;
    const press=e=>{e.preventDefault();inputState[0]|=bit;inputEdge[0]|=bit;};
    const release=e=>{e.preventDefault();inputState[0]&=~bit;};
    el.addEventListener('touchstart',press,{passive:false});
    el.addEventListener('touchend',release,{passive:false});
    el.addEventListener('mousedown',press);
    el.addEventListener('mouseup',release);
  });
  
  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft') inputState[0]|=1<<0;
    if(e.key==='ArrowRight') inputState[0]|=1<<1;
    if(e.key==='z'||e.key===' ') inputState[0]|=1<<2;
    if(e.key==='x') inputState[0]|=1<<3;
    if(e.key==='Shift') inputState[0]|=1<<4;
  });
  document.addEventListener('keyup',e=>{
    if(e.key==='ArrowLeft') inputState[0]&=~(1<<0);
    if(e.key==='ArrowRight') inputState[0]&=~(1<<1);
    if(e.key==='z'||e.key===' ') inputState[0]&=~(1<<2);
    if(e.key==='x') inputState[0]&=~(1<<3);
    if(e.key==='Shift') inputState[0]&=~(1<<4);
  });
}

// === INIT MAX ===
player[0]=50;player[1]=208;player[4]=24;player[5]=32;player[6]=1;player[10]=1;player[11]=100;
setupInput();
spawnParticles(100,200,'#ffff00',128); // MAX particle kickoff

function loop(now){
  updateMetrics(now);
  update(1/60);
  draw();
  frames++;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
console.log("BINARY QUEST MAX - PFR TARGET: 2.1ms | PARTICLES: 4096");




import { ecs } from './modules/ecs.js';
import { glyphs } from './modules/glyphs.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Sultan47 God String: x1X1(w0W9(B0(o1O9)))
const player = ecs.create('player', 'b0(o1O9)');

const gameLoop = () => {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, 320, 240);
  
  ecs.step();  // 6502 CPU cycle
  
  // Render accumulator
  ctx.fillStyle = '#00ff41';
  ctx.font = '16px Courier New';
  ctx.fillText(`A: ${player.a}`, 10, 20);
  ctx.fillText(`PC: $${player.pc.toString(16)}`, 10, 40);
  
  requestAnimationFrame(gameLoop);
};

gameLoop();
