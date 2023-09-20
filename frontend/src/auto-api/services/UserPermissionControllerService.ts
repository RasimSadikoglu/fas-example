/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserPermissionControllerService {

    /**
     * @param userCode 
     * @returns string OK
     * @throws ApiError
     */
    public static getUserPermissions(
userCode: string,
): CancelablePromise<Array<'FON_LIST' | 'FON_EDIT'>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user-permission',
            query: {
                'userCode': userCode,
            },
        });
    }

    /**
     * @param userCode 
     * @param permission 
     * @returns boolean OK
     * @throws ApiError
     */
    public static checkUserHasPermission(
userCode: string,
permission: 'FON_LIST' | 'FON_EDIT',
): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user-permission/check',
            query: {
                'userCode': userCode,
                'permission': permission,
            },
        });
    }

}
