import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios"

const axiosInstance = axios.create({
    timeout: 5000,
})

class RequstWrapper {
    private defaultAxiosConfig: CreateAxiosDefaults<any> = {}
    private requestInterceptors: (() => void)[] = []
    private responseInterceptors: (() => void)[] = []

    axios: AxiosInstance | null = null

    init(opts?: CreateAxiosDefaults<any>) {
        if (opts === undefined) {
            opts = this.defaultAxiosConfig
        }
        this.axios = axios.create(opts)
        this.requestInterceptors.forEach(cb => cb())
        this.responseInterceptors.forEach(cb => cb())
        this.defaultAxiosConfig = {}
        this.requestInterceptors = []
        this.responseInterceptors = []
        return this
    }

    createAxiosDefaults(config: CreateAxiosDefaults<any>) {
        this.defaultAxiosConfig = {
            ...this.defaultAxiosConfig,
            ...config
        }
        return this
    }
    createRequestInterceptor(fn: (config: AxiosRequestConfig<any>) => any, errFn: (err: any) => any) {
        this.requestInterceptors.push(() => {
            return this.axios!.interceptors.request.use(
                function (config: InternalAxiosRequestConfig) {
                    let _config = fn(config)
                    return _config ? _config : config
                },
                function (error) {
                    let _error = errFn(error)
                    return _error ? _error : Promise.reject(error)
                },
            )
        })
        return this
    }
    createResponseInterceptor(fn: (response: AxiosResponse<any, any>) => any, errFn: (err: any) => any) {
        this.responseInterceptors.push(() => {
            return this.axios!.interceptors.response.use(
                function (response) {
                    let _response = fn(response)
                    return _response ? _response : response
                },
                function (error) {
                    let _error = errFn(error)
                    return _error ? _error : Promise.reject(error)
                },
            )
        })
        return this
    }
}

class _Request {
    private requestWrapper: RequstWrapper | null = null
    private static intance: _Request | null = null
    private onBeforeRequest() {

    }
    private onAfterResponse() {

    }
    static getIntance() {
        if (_Request.intance === null) {
            _Request.intance = new _Request()
        }
        return _Request.intance
    }
    constructor() {

    }

    private get request() {
        return this.requestWrapper!.axios!
    }

    bindWrapper(requestWrapper: RequstWrapper) {
        this.requestWrapper = requestWrapper
    }
}
const RequestClient = _Request.getIntance()

const requestWrapper = new RequstWrapper().createAxiosDefaults({ timeout: 5000 }).init()
RequestClient.bindWrapper(requestWrapper)

export default axiosInstance