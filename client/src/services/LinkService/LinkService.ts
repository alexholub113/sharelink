import ILinkService, {
    AddLinkRequest,
    GetListResponse,
    LikeLinkRequest,
    PreviewLinkRequest,
    PreviewLinkResponse,
    DeleteLinkRequest,
    SaveLinkRequest,
    UpdateLinkRequest, GetListRequest, DislikeLinkRequest
} from './interfaces/ILinkService.ts';
import HttpClient from '../HttpClient/HttpClient.ts';
import Link from '../../models/Link.ts';

class LinkService implements ILinkService {

    private readonly baseUrl = `${import.meta.env.VITE_SHARELINK_API_BASE_URL}/api/links`;

    constructor(private readonly httpClient: HttpClient) {
    }

    async getList(request: GetListRequest): Promise<GetListResponse> {
        const queryParams = new URLSearchParams();
        if (request.pageNumber) {
            queryParams.set('pageNumber', request.pageNumber.toString());
        }
        if (request.pageSize) {
            queryParams.set('pageSize', request.pageSize.toString());
        }
        if (request.tags) {
            queryParams.set('tags', request.tags.join(','));
        }
        if (request.title) {
            queryParams.set('title', request.title);
        }
        if (request.saved) {
            queryParams.set('saved', request.saved.toString());
        }
        if (request.liked) {
            queryParams.set('liked', request.liked.toString());
        }
        if (request.owned) {
            queryParams.set('owned', request.owned.toString());
        }

        const response = await this.httpClient.get<GetListResponse>(`${this.baseUrl}/list?${queryParams.toString()}`);

        return response.data;
    }

    async addLink(request: AddLinkRequest): Promise<Link> {
        const response = await this.httpClient.post<AddLinkRequest, Link>(
            `${this.baseUrl}/create`, { ...request });

        return response.data;
    }

    async previewLink(request: PreviewLinkRequest): Promise<PreviewLinkResponse> {
        const response = await this.httpClient.post<PreviewLinkRequest, PreviewLinkResponse>(
            `${this.baseUrl}/preview`, { ...request });

        return response.data;
    }

    async like(request: LikeLinkRequest): Promise<void> {
        await this.httpClient.post<LikeLinkRequest, {}>(`${this.baseUrl}/like`, { ...request });
    }

    async dislike(request: DislikeLinkRequest): Promise<void> {
        await this.httpClient.post<DislikeLinkRequest, {}>(`${this.baseUrl}/dislike`, { ...request });
    }

    async save(request: SaveLinkRequest): Promise<void> {
        await this.httpClient.post<SaveLinkRequest, {}>(`${this.baseUrl}/save`, { ...request });
    }

    async delete(request: DeleteLinkRequest): Promise<void> {
        await this.httpClient.post<DeleteLinkRequest, {}>(`${this.baseUrl}/delete`, { ...request });
    }

    async update(request: UpdateLinkRequest): Promise<void> {
        await this.httpClient.post<UpdateLinkRequest, {}>(`${this.baseUrl}/update`, { ...request });
    }
}

export default LinkService;