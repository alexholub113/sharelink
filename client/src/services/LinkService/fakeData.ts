import {AddLinkResponse, GetListResponse} from './interfaces/ILinkService.ts';
import PreviewLink from './interfaces/PreviewLink.ts';
import LinkType from './interfaces/LinkType.ts';

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
        title: 'They Dropped THIS And Thought Nobody Would Noticedasdasdasdasdasdadad  sdasdadas',
        youtube: {
            id: '4YBS1uXanDE',
        },
        liked: false,
        likes: 3123,
        saved: false,
        user: 'user1',
        type: 0,
        createdAt: '2021-01-01T00:00:00',
        tags: ['clean architecture', 'python', 'java', 'typescript', 'aws']
    }, {
        id: '2',
        title: '57 секунд — Русский трейлер (2023)',
        youtube: {
            id: 'aHKSaP4Qr8U',
        },
        liked: true,
        likes: 213,
        saved: true,
        user: 'user2',
        type: 0,
        createdAt: '2021-01-01T00:00:00',
        tags: ['tag1']
    }, {
        id: '3',
        title: 'They Dropped THIS And Thought Nobody Would Notice',
        youtube: {
            id: '4YBS1uXanDE',
        },
        liked: false,
        likes: 53123,
        saved: false,
        user: 'user1',
        type: 0,
        createdAt: '2021-01-01T00:00:00',
        tags: ['react', 'c#', 'asp.net']
    }, {
        id: '4',
        title: '57 секунд — Русский трейлер (2023)',
        youtube: {
            id: 'TRNSyg43c4E',
        },
        liked: true,
        likes: 2,
        saved: true,
        user: 'user2',
        type: 0,
        createdAt: '2021-01-01T00:00:00',
        tags: ['tag1']
    }]
});

export const getFakePreviewYoutubeVideoResponse = (): PreviewLink => ({
    title: 'Preview video title',
    type: LinkType.youtube,
    tags: ['typescript', 'react', 'mobx'],
    youtube: {
        id: '9WBD4NVODVs',
    }
});

export const getFakeAddYoutubeVideoResponse = (videoId: string): AddLinkResponse => ({
    link: {
        id: '432',
        title: 'Some new video title',
        youtube: {
            id: videoId,
        },
        liked: false,
        likes: 0,
        saved: false,
        user: 'user2',
        type: 0,
        createdAt: '2021-01-01T00:00:00',
        tags: ['.net', 'c#', 'asp.net']
    }
});
