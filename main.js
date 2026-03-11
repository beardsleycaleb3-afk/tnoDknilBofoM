const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  render.renderWorld();  // Glyph worlds
  ecs.update();
  combat.render(ctx);
  requestAnimationFrame(gameLoop);
};
