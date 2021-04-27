import { expressMiddlewareAdapter } from '@/main/adapters';
import { makeAuthMiddleware } from '@/main/factories';

export const auth = expressMiddlewareAdapter(makeAuthMiddleware());
