// Initialize WaveSurfer (Music-Player Changes)
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#87CEEB',
    progressColor: '#FFD700',
    backgroundColor: '#000',
    cursorColor: '#FFD700',
    height: 150,
    barWidth: 2,
    barGap: 2,
    barRadius: 3,
    responsive: true,
  });

  // Track list
  const tracks = [
    { title: 'Kick Back and Chill', src: 'audio/Kick-Back-and-Chill.mp3' },
    { title: 'We Gone Ball', src: 'audio/We-Gone-Ball.mp3' },
    { title: 'Really Wanna See', src: 'audio/Really-Wanna-See.mp3' },
    { title: 'Why Not', src: 'audio/Why-Not.mp3' },
  ];
  let currentTrackIndex = 0;
  
  // Function to load a track by index
  function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[index];
    document.getElementById('nowPlaying').innerText = `Now Playing: ${track.title}`;
    wavesurfer.load(track.src).catch((error) => {
      console.error('Failed to load track:', error);
    });
    console.log('Loading track:', track.src);
  }
  
  // Play/Pause button
  document.getElementById('playPauseBtn').addEventListener('click', () => {
    wavesurfer.playPause();
  });
  
  // Next button
  document.getElementById('nextBtn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
  });
  
  // Previous button
  document.getElementById('prevBtn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
  });
  
  // Track list click handler
  document.getElementById('trackList').addEventListener('click', (e) => {
    if (e.target && e.target.matches('li')) {
      const trackSrc = e.target.getAttribute('data-src');
      const index = tracks.findIndex((track) => track.src === trackSrc);
      if (index !== -1) {
        loadTrack(index);
      }
    }
  });
  
  // Quick Pick: randomly select a track when clicked
  document.querySelector('.quick-pick-menu a').addEventListener('click', (e) => {
    e.preventDefault();
    const randomIndex = Math.floor(Math.random() * tracks.length);
    loadTrack(randomIndex);
  });
  
  // Auto-play when the track is ready
  //  wavesurfer.on('ready', () => {
  //  wavesurfer.play(); 
  //  });
  
  // Auto-advance to the next track when the current one ends
  wavesurfer.on('finish', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
  });
  
  let smoothAverage = 0;
const smoothingFactor = 0.2; // Adjust for smoother transitions
const pulseEl = document.getElementById("pulse");

if (!pulseEl) {
  console.error('Element with ID "pulse" not found.');
} else {
  wavesurfer.on('audioprocess', () => {
    const analyser = wavesurfer.backend.analyser;
    if (analyser) {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      // Calculate average amplitude
      const sum = dataArray.reduce((acc, value) => acc + value, 0);
      const average = sum / bufferLength;

      // Apply smoothing
      smoothAverage = smoothingFactor * average + (1 - smoothingFactor) * smoothAverage;

      // Apply visual effects
      const scale = 1 + (smoothAverage / 255) * 20;
      pulseEl.style.transform = `translate(-50%, -50%) scale(${scale})`;

      // Dynamic glow color and intensity
      const glowIntensity = 10 + (smoothAverage / 255) * 20;
      const glowColor = `rgba(${187 + smoothAverage / 2}, ${134 - smoothAverage / 2}, ${252 - smoothAverage / 2}, 0.7)`;
      pulseEl.style.boxShadow = `0 0 ${glowIntensity}px ${glowIntensity / 2}px ${glowColor}`;
    }
  });
}
  
  
  
  
  // Load the first track on page load
  loadTrack(currentTrackIndex);