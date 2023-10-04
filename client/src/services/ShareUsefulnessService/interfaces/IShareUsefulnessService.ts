import Link from './Link.ts';

export type GetListResponse = {
    items: Link[];
}

interface IShareUsefulnessService {
    GetList(): Promise<GetListResponse>;
}

export default IShareUsefulnessService;
