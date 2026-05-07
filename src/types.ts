export interface MediaLink {
  title: string;
  url: string;
  type: 'embed' | 'external';
}

export interface TimelineData {
  id: number;
  era: number;
  year: number;
  artist: string;
  title: string;
  coverArt: string;
  mediaLinks: MediaLink[];
  annotation: string;
}
