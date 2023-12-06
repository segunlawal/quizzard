export { default } from 'next-auth/middleware';

export const config = { matcher: ['/dashboard'] };

// export const config = { matcher: ['/((?!public|register|api|login).*)'] };
