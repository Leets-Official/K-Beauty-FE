interface ApiResponse<TData> {
  status: number;
  message: string;
  data: TData;
}

export type { ApiResponse };
