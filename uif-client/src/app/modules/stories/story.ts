export interface Story {
    id: string;
    title: string;
    text: string;
    image: string;
    isPublished: boolean;
    facebookProfile: string;
    instagramProfile: string;
    instagramEmbedCode?: string;
}

export type StoryDisplayMode = 'storyList' | 'storyCarousel' | 'storyTitle' | 'storySingle';