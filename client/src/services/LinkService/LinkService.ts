import ILinkService, {
    AddLinkResponse,
    GetListResponse
} from './interfaces/ILinkService.ts';
import {
    getFakeAddYoutubeVideoResponse,
    getFakeGetListResponse,
    getFakePreviewYoutubeVideoResponse
} from './fakeData.ts';

class LinkService implements ILinkService {
    async getList(): Promise<GetListResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFakeGetListResponse());
            }, 1000);
        });
    }

    addLink(url: string): Promise<AddLinkResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFakeAddYoutubeVideoResponse(url));
            }, 1000);
        });
    }

    
    // @ts-ignore
    previewLink(url: string): Promise<PreviewLink> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFakePreviewYoutubeVideoResponse());
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

    // @ts-ignore
    remove(linkId: string): Promise<void> {
        return Promise.resolve();
    }
}

export default LinkService;
