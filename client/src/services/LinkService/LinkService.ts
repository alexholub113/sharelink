import ILinkService, {
    AddYoutubeVideoResponse,
    GetListResponse, PreviewYoutubeVideoResponse
} from './interfaces/ILinkService.ts';
import {
    getFakeAddYoutubeVideoResponse,
    getFakeGetListResponse,
    getFakePreviewYoutubeVideoResponse
} from './fakeData.ts';

class LinkService implements ILinkService {
    async getList(): Promise<GetListResponse> {
        return Promise.resolve(getFakeGetListResponse());
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(getFakeGetListResponse());
        //     }, 1000);
        // });
    }

    addYoutubeVideo(videoId: string): Promise<AddYoutubeVideoResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFakeAddYoutubeVideoResponse(videoId));
            }, 1000);
        });
    }

    previewYoutubeVideo(videoId: string): Promise<PreviewYoutubeVideoResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFakePreviewYoutubeVideoResponse(videoId));
            }, 1000);
        });
    }

    // @ts-ignore
    like(linkId: string): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    // @ts-ignore
    save(linkId: string): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
}

export default LinkService;
