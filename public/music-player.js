// Initialize WaveSurfer
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
  { title: 'On Me', src: 'audio/murder1.mp3' },
];
let currentTrackIndex = 0;

// Function to load a track by index and auto-play when ready
function loadTrack(index) {
  if (index < 0 || index >= tracks.length) {
    console.warn('Invalid track index:', index);
    return;
  }
  currentTrackIndex = index;
  const track = tracks[index];
  document.getElementById('nowPlaying').innerText = `Now Playing: ${track.title}`;
  console.log('Loading track:', track.src);
  wavesurfer.load(track.src);

  // When the track is ready, play it automatically
  wavesurfer.once('ready', () => {
    console.log('Track ready:', track.src);
    wavesurfer.play();
  });
}

// Play/Pause button
document.getElementById('playPauseBtn').addEventListener('click', () => {
  console.log('Play/Pause button clicked');
  wavesurfer.playPause();
});

// Next button
document.getElementById('nextBtn').addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  console.log('Next button clicked, new track index:', currentTrackIndex);
  loadTrack(currentTrackIndex);
});

// Previous button
document.getElementById('prevBtn').addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  console.log('Previous button clicked, new track index:', currentTrackIndex);
  loadTrack(currentTrackIndex);
});

// Track list click handler using closest() to ensure the entire <li> is captured
document.getElementById('trackList').addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (li) {
    const trackSrc = li.getAttribute('data-src');
    const index = tracks.findIndex((track) => track.src === trackSrc);
    if (index !== -1) {
      console.log('Track list item clicked, track index:', index);
      loadTrack(index);
    } else {
      console.warn('Track source not found in list:', trackSrc);
    }
  }
});

// Quick Pick: randomly select a track when clicked
document.querySelector('.quick-pick-menu a').addEventListener('click', (e) => {
  e.preventDefault();
  const randomIndex = Math.floor(Math.random() * tracks.length);
  console.log('Quick Pick selected, random track index:', randomIndex);
  loadTrack(randomIndex);
});

// Auto-advance to the next track when the current one ends
wavesurfer.on('finish', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  console.log('Track finished, auto-advancing to track index:', currentTrackIndex);
  loadTrack(currentTrackIndex);
});

// Audioprocess: example to process audio data
wavesurfer.on('audioprocess', () => {
  // Check if the backend and its analyser are available
  if (!wavesurfer.backend || !wavesurfer.backend.analyser) {
    console.debug('Backend or analyser not ready in audioprocess event.');
    return;
  }
  
  const analyser = wavesurfer.backend.analyser;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  // Calculate average amplitude
  const sum = dataArray.reduce((acc, value) => acc + value, 0);
  const average = sum / bufferLength;
  console.log("Average amplitude:", average);

  // Scale visual effect (if an element with id "pulse" exists)
  const scale = 1 + (average / 255) * 20;
  const pulseEl = document.getElementById("pulse");
  if (pulseEl) {
    pulseEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
    const glowIntensity = 10 + (average / 255) * 20;
    pulseEl.style.boxShadow = `0 0 ${glowIntensity}px ${glowIntensity / 2}px rgba(187, 134, 252, 0.7)`;
  }
});

// Load the first track on page load
loadTrack(currentTrackIndex);
