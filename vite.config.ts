import { defineConfig, loadEnv } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import babel from 'vite-plugin-babel';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // prefix를 ''로 두면 VITE_ 없는 변수도 읽습니다. 클라이언트 번들에는 주입되지 않으므로
  // 백엔드 주소가 브라우저에 노출되지 않고, 운영에서는 Vercel Function이 같은 값을 사용합니다.
  const { BACKEND_ORIGIN } = loadEnv(mode, process.cwd(), '');

  const proxy = BACKEND_ORIGIN
    ? { '/api': { target: BACKEND_ORIGIN, changeOrigin: true } }
    : undefined;

  return {
    plugins: [
      reactRouter(),
      babel({
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        babelConfig: {
          presets: ['@babel/preset-typescript'],
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
      tailwindcss(),
      svgr(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: { proxy },
    preview: { proxy },
  };
});
