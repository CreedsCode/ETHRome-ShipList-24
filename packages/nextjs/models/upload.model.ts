import {UploadTask} from 'firebase/storage';
import {FileUploadStatus} from '../const';
import { MEDIA_TYPE } from './media.model';


export enum UPLOAD_TYPE {
    CAMPAIGN_IMAGE = 'CAMPAIGN_IMAGE',
    IMAGE_MOVIE = 'IMAGE_MOVIE',
    PROFILE_PICTURE = 'PROFILE_PICTURE',
}

export interface IUpload {
    alt: string | null;
    creatorId: string;
    extension: string;
    errors: string[];
    fileName: string;
    id: string;
    mediaType: MEDIA_TYPE;
    uploadTask: UploadTask;
    uploadPath: string;
    url: string | null;
    status: FileUploadStatus;
    updatedAt: number;
}
