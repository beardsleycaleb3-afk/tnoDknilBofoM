const init = async () => {
  if (save.load()) console.log('Save loaded');
  PGE.run();
  gameLoop();
};

// Game loop + auto-save
setInterval(save.serialize, 300000); // 5min autosave
