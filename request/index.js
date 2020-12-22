const request = (params) => {
	return new Promise((resolve, reject) => {
		wx.request({
			...params,
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
// const server = 'http://localhost:721'
const server = 'https://www.freetour.top'
export {request,server}
