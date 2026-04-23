const buttonAudio = new Audio("/sounds/effect/effect-button-6.wav");
buttonAudio.preload = "auto";

export const useClickSound = () => {
  const playSound = () => {
    // 1. Pega a preferência do usuário (padrão é 'true' se for a primeira vez)
    const soundEnabled = localStorage.getItem("app_sound_enabled") !== "false";

    if (soundEnabled) {
      const soundClone = buttonAudio.cloneNode();
      soundClone.volume = 0.5;
      
      const playPromise = soundClone.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // O próprio navegador silencia se o sistema estiver em modo 
          // de economia de energia ou restrição severa.
          console.log("Áudio bloqueado pelo sistema operacional.");
        });
      }
    }
  };

  return playSound;
};