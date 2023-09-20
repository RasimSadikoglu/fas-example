import { createContext } from 'react';
import {
    AuthControllerService,
    LoginRequest,
    UserControllerService,
    UserPermissionControllerService,
} from '../auto-api';
import { Authority } from '../common/permission';
import { toastDanger } from '../components/dynamic-toast';

export type UserAuthModel = {
    token?: string;
    userCode?: string;
    authorities: Authority[];
};

export class UserAuthController {
    public static initialModel(): UserAuthModel {
        return {
            authorities: [],
        };
    }

    private _model = UserAuthController.initialModel();
    public get model(): UserAuthModel {
        return this._model;
    }

    public async initialize(): Promise<void> {
        const cookieToken = localStorage.getItem('jwt-token');
        if (!cookieToken) return;

        try {
            const userDetail = await AuthControllerService.loginWithToken();

            this.model.token = cookieToken;
            this.model.userCode = userDetail.userCode;
            this.model.authorities = userDetail.authorities;
        } catch (error) {
            toastDanger('Your session has ended!');
            await this.logout();
        }
    }

    public async login(request: LoginRequest): Promise<void> {
        const token = await UserControllerService.login(request);
        localStorage.setItem('jwt-token', token);

        this.model.token = token;
        this.model.userCode = request.userCode;

        const permissions =
            await UserPermissionControllerService.getUserPermissions(
                request.userCode!
            );
        this.model.authorities = permissions;
    }

    public async logout(): Promise<void> {
        localStorage.clear();

        this._model = UserAuthController.initialModel();
    }

    public async checkLogin(): Promise<boolean> {
        // TODO: api request
        return !!this.model.token;
    }

    public get token(): string | undefined {
        return this.model.token;
    }

    public get userCode(): string {
        return this.model.userCode!;
    }

    public isUserHasAuthority(authority: Authority): boolean {
        return this.model.authorities.includes(authority);
    }
}

export const UserAuthContext = createContext(new UserAuthController());
