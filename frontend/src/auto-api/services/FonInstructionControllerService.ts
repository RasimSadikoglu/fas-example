/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFonInstructionRequest } from '../models/CreateFonInstructionRequest';
import type { FonInstructionDto } from '../models/FonInstructionDto';
import type { FonInstructionFilterParameters } from '../models/FonInstructionFilterParameters';
import type { UpdateFonInstructionRequest } from '../models/UpdateFonInstructionRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FonInstructionControllerService {

    /**
     * @param requestBody 
     * @returns string OK
     * @throws ApiError
     */
    public static updateFonInstruction(
requestBody: UpdateFonInstructionRequest,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/fon-instruction/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns FonInstructionDto OK
     * @throws ApiError
     */
    public static getInstructionList(
requestBody: FonInstructionFilterParameters,
): CancelablePromise<Array<FonInstructionDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fon-instruction/list',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns string OK
     * @throws ApiError
     */
    public static createFonInstruction(
requestBody: CreateFonInstructionRequest,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fon-instruction/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param instructionId 
     * @returns any OK
     * @throws ApiError
     */
    public static deleteInstruction(
instructionId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/fon-instruction/delete',
            query: {
                'instructionId': instructionId,
            },
        });
    }

}
