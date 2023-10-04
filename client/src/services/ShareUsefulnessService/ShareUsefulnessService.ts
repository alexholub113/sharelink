import IShareUsefulnessService from './interfaces/IShareUsefulnessService.ts';

class ShareUsefulnessService implements IShareUsefulnessService {
    async GetList() {
        return Promise.resolve({
            items: [{
                id: '1',
                url: 'https://www.youtube.com/watch?v=1',
                title: 'Video 1',
                type: 0,
            }, {
                id: '2',
                url: 'https://www.youtube.com/watch?v=2',
                title: 'Video 2',
                type: 0,
            }]
        });
        // const response = await fetch('https://localhost:5001/api/ShareUsefulness');
        // const data = await response.json();
        // return data;
    }
}

export default ShareUsefulnessService;
