// Youtube Integration Configuration
const YOUTUBE_API_KEY = 'AIzaSyAQCHmt9TQ5rF8KrXY9RNxVUtV5GcNYBZc';
const CHANNEL_ID = 'UCVjw_BzPhmBpTvEeH3i5OGw';

// API Endpoints
const YouTube_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// YouTube API Functions
class YouTubeAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    // Fetch latest videos from channel 
    async getChannelVideos(channelId, maxResults = 6) {
        try {
            // First get upload playlist ID
            const channelResponse = await fetch(
                `${YouTube_API_BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${this.apiKey}`
            );
            const channelData = await channelResponse.json();
            const uploadPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

            // Then get videos from playlist
            const videosResponse = await fetch(
                `${YouTube_API_BASE_URL}/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${uploadPlaylistId}&key=${this.apiKey}`
            );
            const videosData = await videosResponse.json();
            return videosData.items;
        } catch (error) {
            console.error(`Error fetching YouTube videos:`, error);
            return [];
        }
    }

    // Get channel statistics
    async getChannelStats(channelId) {
        try {
            const data = await fetch(
                `${$YOUTUBE_API_BASE_URL}/channels?part=statistics&id=${channelId}&key=${this.apiKey}`
            );
            const data = await response.json();
            return data.items[0].statistics;
        } catch (error) {
            console.error('Error fetching channel stats:', error);
            return null;
        }
    }
} // This is the closing bracket for the class