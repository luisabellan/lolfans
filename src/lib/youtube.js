import { google, youtube_v3 } from "googleapis";

// Your YouTube Data API key here
const apiKey = process.env.YOUTUBE_API_KEY;

// Create a new YouTube client with provided API key
const youtube = google.youtube({ version: "v3", auth: apiKey });

/**
 * The getPlaylistItems function takes the channelId parameter
 * which is the ID of the YouTube channel whose videos you want to fetch.
 * It returns a list of video items.
 *
 * @param channelId string
 * @returns Promise<youtube_v3.Schema$PlaylistItem[]>
 */

export async function getPlaylistItems(
  channelId: string
): Promise<youtube_v3.Schema$PlaylistItem[]> {
  const res = await youtube.playlistItems.list({
    part: "snippet",
    playlistId: channelId,
    maxResults: 20 // Maximum number of videos to fetch (change as desired)
  });

  return res.data.items!;
}
