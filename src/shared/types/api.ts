/** 서버의 모든 응답은 이 형태로 감싸져서 옵니다. 실제 값은 `data`에 들어 있습니다. */
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
