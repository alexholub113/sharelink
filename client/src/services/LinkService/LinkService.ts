import ILinkService, {
    AddLinkResponse,
    GetListResponse, PreviewLinkResponse
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

    addLink(url: string): Promise<AddLinkResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFakeAddYoutubeVideoResponse(url));
            }, 1000);
        });
    }

    previewLink(url: string): Promise<PreviewLinkResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFakePreviewYoutubeVideoResponse(url));
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
