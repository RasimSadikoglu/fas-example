/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserAuthDetail } from '../models/UserAuthDetail';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthControllerService {

    /**
     * @returns UserAuthDetail OK
     * @throws ApiError
     */
    public static loginWithToken(): CancelablePromise<UserAuthDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth',
        });
    }

}
