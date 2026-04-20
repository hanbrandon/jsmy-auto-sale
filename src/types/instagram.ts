export interface BeholdPost {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption?: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
  thumbnailUrl?: string;
}

export interface BeholdResponse {
  posts: BeholdPost[];
}
