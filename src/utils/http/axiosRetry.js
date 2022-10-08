/**
 *  请求重试机制
 */
export class AxiosRetry {
  retry(AxiosInstance, error) {
    // @ts-ignore
    const { config } = error.response
    const { waitTime, count } = config?.requestOptions?.retryRequest
    config.__retryCount = config.__retryCount || 0
    if (config.__retryCount >= count) {
      return Promise.reject(error)
    }
    config.__retryCount += 1
    return this.delay(waitTime).then(() => AxiosInstance(config))
  }

  /**
   * 延迟
   */
  delay(waitTime) {
    return new Promise((resolve) => setTimeout(resolve, waitTime))
  }
}
