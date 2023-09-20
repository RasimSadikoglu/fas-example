/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FonDto } from '../models/FonDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FonControllerService {

    /**
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static insertFonsBulk(
requestBody: Array<FonDto>,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fon/insert-bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param fonCode 
     * @param toMemberCode 
     * @param currency 
     * @returns FonDto OK
     * @throws ApiError
     */
    public static getFon(
fonCode: string,
toMemberCode: string,
currency: string,
): CancelablePromise<FonDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fon',
            query: {
                'fonCode': fonCode,
                'toMemberCode': toMemberCode,
                'currency': currency,
            },
        });
    }

    /**
     * @param fonCode 
     * @returns string OK
     * @throws ApiError
     */
    public static getAvailableToMemberCodes(
fonCode: string,
): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fon/to-member-code',
            query: {
                'fonCode': fonCode,
            },
        });
    }

    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getAllToMemberCodes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fon/to-member-code-all',
        });
    }

    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getAvailableFonCodes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fon/fon-code',
        });
    }

    /**
     * @param fonCode 
     * @param toMemberCode 
     * @returns string OK
     * @throws ApiError
     */
    public static getAvailableCurrencies(
fonCode: string,
toMemberCode: string,
): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fon/currency',
            query: {
                'fonCode': fonCode,
                'toMemberCode': toMemberCode,
            },
        });
    }

}
