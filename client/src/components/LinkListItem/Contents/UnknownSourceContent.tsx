import UnknownSource from '../../../models/UnknownSource.ts';

const getDomainName = (url: string): string => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch (e) {
        return '';
    }
}

const UnknownSourceContent = ({ url }: UnknownSource) => (
    <a href={url} target="_blank" rel="noreferrer">
        <div className="w-full relative flex items-center justify-center text-zinc-500 text-center">
            <svg className="aspect-video p-6 pb-16" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
            </svg>
            <span className="absolute bottom-2 text-sm font-semibold px-2 break-all">{getDomainName(url)}</span>
        </div>
    </a>
);

export default UnknownSourceContent;