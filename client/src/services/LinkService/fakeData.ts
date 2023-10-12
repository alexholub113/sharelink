import {
    AddYoutubeVideoResponse,
    GetListResponse,
    PreviewYoutubeVideoResponse
} from './interfaces/ILinkService.ts';

export const getFakeGetListResponse = (): GetListResponse => ({
    tags: [{
        title: '.NET',
        count: 242
    }, {
        title: 'react',
        count: 5443
    }, {
        title: 'c#',
        count: 543
    }, {
        title: 'typescript',
        count: 44
    }, {
        title: 'dynamic programming',
        count: 12
    }, {
        title: 'clean architecture',
        count: 32
    }, {
        title: 'tailwind css',
        count: 5
    }, {
        title: 'aws',
        count: 2
    }, {
        title: 'aws lambda',
        count: 5
    }, {
        title: 'ruby',
        count: 512
    }, {
        title: 'java',
        count: 5122
    }, {
        title: 'mongodb',
        count: 51
    }, {
        title: 'postgres',
        count: 512
    }, {
        title: 'ms sql',
        count: 5
    }, {
        title: 'my sql',
        count: 4
    }, {
        title: 'best practices',
        count: 312
    }, {
        title: 'architecture',
        count: 5
    }],
    items: [{
        id: '1',
        youtube: {
            id: '4YBS1uXanDE',
            title: 'They Dropped THIS And Thought Nobody Would Notice',
            publishedAt: '2018-01-01T00:00:00',
        },
        liked: false,
        likes: 53123,
        user: 'user1',
        type: 0,
        createdAt: '2021-01-01T00:00:00',
        tags: ['tag1', 'tag2']
    }, {
        id: '2',
        youtube: {
            id: 'aHKSaP4Qr8U',
            title: '57 секунд — Русский трейлер (2023)',
            publishedAt: '2018-01-01T00:00:00',
        },
        liked: true,
        likes: 2,
        user: 'user2',
        type: 0,
        createdAt: '2021-01-01T00:00:00',
        tags: ['tag1']
    }]
});

export const getFakePreviewYoutubeVideoResponse = (videoId: string): PreviewYoutubeVideoResponse => ({
    id: videoId,
    title: 'Preview video title',
    publishedAt: '2018-01-01T00:00:00',
    tags: ['typescript', 'react', 'mobx']
});

export const getFakeAddYoutubeVideoResponse = (videoId: string): AddYoutubeVideoResponse => ({
    link: {
        id: '432',
        youtube: {
            id: videoId,
            title: 'Some new video title',
            publishedAt: '2018-01-01T00:00:00',
        },
        liked: false,
        likes: 0,
        user: 'user2',
        type: 0,
        createdAt: '2021-01-01T00:00:00',
        tags: ['.net', 'c#', 'asp.net']
    }
});
