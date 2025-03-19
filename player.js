// Create the WaveSurfer instance with custom options matching your theme
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#bb86fc',      // using --accent color
    progressColor: '#03dac6',   // using --success color
    height: 150,
    barWidth: 2,
    responsive: true,
  });

  // Define your track list (adjust titles and file paths as needed)
  const tracks = [
    { title: 'Track 1', src: 'audio/ball.mp3' },
    { title: 'Track 2', src: 'audio/track2.mp3' },
    { title: 'Track 3', src: 'audio/track3.mp3' }
  ];
  let currentTrackIndex = 0;

  // Function to load a track by its index
  function loadTrack(index) {
    currentTrackIndex = index;
    wavesurfer.load(tracks[index].src);
  }

  // Load the first track when ready
  loadTrack(currentTrackIndex);

  // Control buttons
  document.getElementById('playPauseBtn').addEventListener('click', () => {
    wavesurfer.playPause();
  });
  document.getElementById('nextBtn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    wavesurfer.on('ready', () => wavesurfer.play());
  });
  document.getElementById('prevBtn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    wavesurfer.on('ready', () => wavesurfer.play());
  });

  // Clicking on a track from the list
  document.getElementById('trackList').addEventListener('click', (e) => {
    if (e.target && e.target.matches('li')) {
      const trackSrc = e.target.getAttribute('data-src');
      const index = tracks.findIndex(track => track.src === trackSrc);
      if (index !== -1) {
        loadTrack(index);
        wavesurfer.on('ready', () => wavesurfer.play());
      }
    }
  });

  // Auto-advance when a track finishes
  wavesurfer.on('finish', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    wavesurfer.on('ready', () => wavesurfer.play());
  });