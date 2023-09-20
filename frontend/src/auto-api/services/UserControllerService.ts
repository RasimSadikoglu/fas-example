/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from '../models/LoginRequest';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserControllerService {

    /**
     * @param requestBody 
     * @returns string OK
     * @throws ApiError
     */
    public static login(
requestBody: LoginRequest,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static createUserWithPermissions(
requestBody: UserDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param userCode 
     * @returns string OK
     * @throws ApiError
     */
    public static getUserName(
userCode: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/username',
            query: {
                'userCode': userCode,
            },
        });
    }

}
