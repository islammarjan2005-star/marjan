// Alarm audio manager using Web Audio API
class AlarmAudio {
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Create a gentle, melodic alarm tone
  private playTone(frequency: number, duration: number) {
    const ctx = this.initAudioContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Gentle fade in and out
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  // Play a peaceful, ascending melody
  private playMelody() {
    const notes = [392, 440, 494, 523]; // G4, A4, B4, C5
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.3), i * 300);
    });
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Play immediately
    this.playMelody();

    // Repeat every 2 seconds
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        this.playMelody();
      }
    }, 2000);
  }

  stop() {
    this.isPlaying = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.oscillator) {
      try {
        this.oscillator.stop();
      } catch {
        // Already stopped
      }
      this.oscillator = null;
    }

    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
  }

  // Resume audio context if suspended (required for autoplay policies)
  async resume() {
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}

export const alarmAudio = new AlarmAudio();

// Request notification permission for alarm reminders
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title: string, body: string) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'marjan-alarm',
      requireInteraction: true,
    });
  }
};
