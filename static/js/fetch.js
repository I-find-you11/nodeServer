function backRequest(url,date){
    return new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(date)
    });
}


export default {
    svnPost(query){
        return fetch(backRequest('/svnPost',query));
    },
    getSvnDate(query){
        return fetch(backRequest('/svnGetData',query));
    },
    postChangeSvnFn(query){
        return fetch(backRequest('/svnChangeData',query));
    },
    deleteSvn(query){
        return fetch(backRequest('/deleteSvn',query));
    }
}
