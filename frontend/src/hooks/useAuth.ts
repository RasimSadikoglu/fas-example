import { useContext } from 'react';
import { UserAuthContext } from '../tools/auth-context-provider';

export default function useAuth() {
    return useContext(UserAuthContext);
}
