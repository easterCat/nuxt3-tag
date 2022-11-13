export const getLexicaImages = async (url: any, method?: any, params?: any) => {
  const {
    data: result,
    pending,
    error,
    refresh,
  } = await useFetch(url, {
    params,
    method,
  });
  watch(result, (newValue) => {});
  if (result.value) {
    return result.value;
  }
};
