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
    async GetList(): Promise<GetListResponse> {
        return Promise.resolve(getFakeGetListResponse());
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(getFakeGetListResponse());
        //     }, 1000);
        // });
    }

    AddYoutubeVideo(videoId: string): Promise<AddYoutubeVideoResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFakeAddYoutubeVideoResponse(videoId));
            }, 1000);
        });
    }

    PreviewYoutubeVideo(videoId: string): Promise<PreviewYoutubeVideoResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFakePreviewYoutubeVideoResponse(videoId));
            }, 1000);
        });
    }

    // @ts-ignore
    Like(linkId: string): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
}

export default LinkService;
