import { ResponseInterceptor } from './ResponseInterceptor';
import Events from '../../../constants/events';
import FetchHttpResponseError from '../errors/FetchHttpResponseError.ts';

export default class BrowserUnauthorizedResponseInterceptor implements ResponseInterceptor {
    public rejected = (error: Error) => {
        if (error instanceof FetchHttpResponseError && error.status === 401) {
            window.dispatchEvent(new Event(Events.UnauthorizedResponseReceived));
            return Promise.resolve({ handled: true });
        }
        return Promise.resolve({ handled: false });
    };
}