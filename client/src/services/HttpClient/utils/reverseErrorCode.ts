const BaseErrors = ['business', 'application', 'infrastructure'];
const ErrorCodeSeparator: '.' = '.' as const;
// eslint-disable-next-line import/prefer-default-export
export const reverseErrorCode = (errorCode: string): string => {
    const errorCodeInArrayFormat = errorCode.split(ErrorCodeSeparator);
    const isDirectOrder = BaseErrors.includes(errorCodeInArrayFormat[0]);
    return isDirectOrder
        ? errorCodeInArrayFormat.reverse().join(ErrorCodeSeparator)
        : errorCodeInArrayFormat.join(ErrorCodeSeparator);
};