const DEFAULT_OPTIONS = met => ({ method: met, credentials: 'include', headers: { 'Content-Type': 'application/json' } });

const produceInit = (body, met) => ({ ...DEFAULT_OPTIONS(met), body: JSON.stringify(body), json: true });

const request = (url, init) => fetch(url, init)
    .then(async resp => {
            const jsonResponse = await resp.json()
            console.log(resp)
            if (resp.ok) {
                return jsonResponse
            }
            console.log(jsonResponse)
            //const error = new Error(jsonResponse.error)
            const error = Promise.reject({
                status: jsonResponse.error.status,
                body: jsonResponse.error.body
            })
            error.status = resp.status
            console.log(error.status)
            if (error.status === 403) {
                window.location.assign('/')
            }
            console.log(error.status)
            return error
    })


const getRequest = url => request(url, DEFAULT_OPTIONS('GET'));
const makeRequest = (url, body, met) => request(url, produceInit(body, met));

export const requests = { request, getRequest, makeRequest, DEFAULT_OPTIONS };
