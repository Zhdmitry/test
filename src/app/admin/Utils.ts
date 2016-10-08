export function getDemos(apiService): Promise<any> {
    let promise = new Promise(function (resolve, reject) {
        apiService.getClear('demos')
            .map(r => r.json())
            .subscribe(res => {
                resolve(res.data);
            },
            error => {
                reject(error);
            });
    })
    return promise;
}


