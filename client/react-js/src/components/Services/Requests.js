

const DEFAULT_OPTIONS = met => ({method: met, credentials: 'include', headers: {'Content-Type': 'application/json'}});

const produceInit = (body, met) => ({...DEFAULT_OPTIONS(met), body: JSON.stringify(body), json: true});

const request = (url, init) =>  fetch(url, init)
.then(async resp => {
    const jsonResponse = await resp.json()
    console.log(resp.status)
    if (resp.ok) {
        return jsonResponse
    }
    const error = new Error(jsonResponse.err)
    error.status = resp.status
    if(error.status==403){
        window.location.assign('/')
    }
    console.log(error.status)
    throw error
})
    

const getRequest = url => request(url, DEFAULT_OPTIONS('GET'));
const makeRequest = (url, body, met) => request(url, produceInit(body, met));

export const requests = {request,getRequest,makeRequest,DEFAULT_OPTIONS};
