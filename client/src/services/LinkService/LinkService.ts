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
import {getListFakeData} from './FakeData.ts';

class LinkService implements ILinkService {

    private readonly baseUrl = `${import.meta.env.VITE_SHARELINK_API_BASE_URL}/api/v1/links`;

    constructor(private readonly httpClient: HttpClient) {
    }

    async getList(request: GetListRequest): Promise<GetListResponse> {
        if (import.meta.env.VITE_MOCK_API === 'true') {
            return getListFakeData;
        }

        const query = new URLSearchParams();
        if (request.pageNumber !== undefined) query.append("pageNumber", request.pageNumber.toString());
        if (request.pageSize !== undefined) query.append("pageSize", request.pageSize.toString());
        if (request.tags) request.tags.forEach(tag => query.append("tags", tag));
        if (request.title) query.append("title", request.title);
        if (request.saved !== undefined) query.append("saved", request.saved.toString());
        if (request.liked !== undefined) query.append("liked", request.liked.toString());
        if (request.owned !== undefined) query.append("owned", request.owned.toString());

        const response = await this.httpClient.get<GetListResponse>(`${this.baseUrl}/list?${query.toString()}`);

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
        await this.httpClient.post<{}, {}>(`${this.baseUrl}/like/${request.linkId}`);
    }

    async dislike(request: DislikeLinkRequest): Promise<void> {
        await this.httpClient.post<{}, {}>(`${this.baseUrl}/dislike/${request.linkId}`);
    }

    async save(request: SaveLinkRequest): Promise<void> {
        await this.httpClient.post<{}, {}>(`${this.baseUrl}/save/${request.linkId}`);
    }

    async delete(request: DeleteLinkRequest): Promise<void> {
        await this.httpClient.delete<{}>(`${this.baseUrl}/${request.linkId}`);
    }

    async update(request: UpdateLinkRequest): Promise<void> {
        await this.httpClient.put<UpdateLinkRequest, {}>(`${this.baseUrl}/update`, { ...request });
    }
}

export default LinkService;