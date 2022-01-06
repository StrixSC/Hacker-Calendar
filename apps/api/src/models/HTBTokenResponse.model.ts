export default interface HTBTokenResponse {
    message: {
        access_token: string;
        refresh_token: string;
        is2FAEnabled: boolean;
    }
}