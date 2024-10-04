export enum MEDIA_TYPE {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO',
    DOCUMENT = 'DOCUMENT',
    THREE_D = 'THREE_D'
}

export interface MediaItem {
    type: MEDIA_TYPE
    url: string;
    title?: string;
    description?: string;
    thumbnailUrl?: string;
    createdAt: Date;
}
