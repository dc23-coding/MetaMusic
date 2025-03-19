// Initialize WaveSurfer
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#bb86fc',
    progressColor: '#03dac6',
    backgroundColor: '#000',
    height: 150,
    barWidth: 2,
    responsive: true,
  });
  
  // Track list
  const tracks = [
    { title: 'We Gone Ball', src: 'audio/We-Gone-Ball.mp3' },
    { title: 'Why Not', src: 'audio/Why-Not.mp3' },
    { title: 'Really Wanna See', src: 'audio/Really-Wanna-See.mp3' },
    { title: 'Kick Back and Chill', src: 'audio/Kick-Back-and-Chill.mp3' },
  ];
  let currentTrackIndex = 0;
  
  // Function to load a track by index
  function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[index];
    document.getElementById('nowPlaying').innerText = `Now Playing: ${track.title}`;
    wavesurfer.load(track.src);
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
   // wavesurfer.on('ready', () => {
   // wavesurfer.play(); 
  //});
  
  // Auto-advance to the next track when the current one ends
  wavesurfer.on('finish', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
  });
  
  // Load the first track on page load
  loadTrack(currentTrackIndex);
  