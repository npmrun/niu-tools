export function getNetworkImage(url: string) {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url,
			success: (e) => {
				const p = e.tempFilePath
				if (p.indexOf('json') > -1) {
					reject(p)
					return false
				}
				resolve(p)
			},
			fail: (r) => {
				reject(r)
			}
		})
	})
}