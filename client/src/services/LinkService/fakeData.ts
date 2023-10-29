import {
    AddLinkResponse,
    GetListResponse,
    PreviewLinkResponse
} from './interfaces/ILinkService.ts';
import PreviewLink from './interfaces/PreviewLink.ts';
import LinkType from './interfaces/LinkType.ts';

export const getFakeGetListResponse = (): GetListResponse => ({
    tags: [{
        name: '.NET',
        count: 242
    }, {
        name: 'react',
        count: 5443
    }, {
        name: 'c#',
        count: 543
    }, {
        name: 'typescript',
        count: 44
    }, {
        name: 'dynamic programming',
        count: 12
    }, {
        name: 'clean architecture',
        count: 32
    }, {
        name: 'tailwind css',
        count: 5
    }, {
        name: 'aws',
        count: 2
    }, {
        name: 'aws lambda',
        count: 5
    }, {
        name: 'ruby',
        count: 512
    }, {
        name: 'java',
        count: 5122
    }, {
        name: 'mongodb',
        count: 51
    }, {
        name: 'postgres',
        count: 512
    }, {
        name: 'ms sql',
        count: 5
    }, {
        name: 'my sql',
        count: 4
    }, {
        name: 'best practices',
        count: 312
    }, {
        name: 'architecture',
        count: 5
    }],
    items: [{
        id: '1',
        title: 'They Dropped THIS And Thought Nobody Would Noticedasdasdasdasdasdadad  sdasdadas',
        youtube: {
            videoId: '4YBS1uXanDE',
        },
        liked: false,
        likes: 3123,
        saved: false,
        user: 'user1',
        type: LinkType.Youtube,
        createdAt: '2021-01-01T00:00:00',
        tags: ['clean architecture', 'python', 'java', 'typescript', 'aws']
    }, {
        id: '2',
        title: '57 секунд — Русский трейлер (2023)',
        youtube: {
            videoId: 'aHKSaP4Qr8U',
        },
        liked: true,
        likes: 213,
        saved: true,
        user: 'user2',
        type: LinkType.Youtube,
        createdAt: '2021-01-01T00:00:00',
        tags: ['tag1']
    }, {
        id: '3',
        title: 'They Dropped THIS And Thought Nobody Would Notice',
        youtube: {
            videoId: '4YBS1uXanDE',
        },
        liked: false,
        likes: 53123,
        saved: false,
        user: 'user1',
        type: LinkType.Youtube,
        createdAt: '2021-01-01T00:00:00',
        tags: ['react', 'c#', 'asp.net']
    }, {
        id: '4',
        title: '57 секунд — Русский трейлер (2023)',
        youtube: {
            videoId: 'TRNSyg43c4E',
        },
        liked: true,
        likes: 2,
        saved: true,
        user: 'user2',
        type: LinkType.Youtube,
        createdAt: '2021-01-01T00:00:00',
        tags: ['tag1']
    }]
});

export const getFakePreviewYoutubeVideoResponse = (): PreviewLinkResponse => ({
    success: true,
    data: {
        title: 'Preview video title',
        type: LinkType.Youtube,
        tags: ['typescript', 'react', 'mobx'],
        youtube: {
            videoId: '9WBD4NVODVs',
        }
    }
});

export const getFakeAddYoutubeVideoResponse = (previewLink: PreviewLink): AddLinkResponse => ({
    success: true,
    data: {
        ...previewLink,
        id: '432',
        liked: false,
        likes: 0,
        saved: false,
        user: 'user2',
        createdAt: '2021-01-01T00:00:00',
    }
});