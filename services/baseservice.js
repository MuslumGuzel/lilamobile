import Config from "../config";
import AsyncStorage from '@react-native-community/async-storage';


class BaseServices {
	callPostService = async (parameters) => {
		var token = "";
		var refreshToken = "";
		await AsyncStorage.getItem("token").then(result => {
			token = result;
		});
		console.log(token);

		await AsyncStorage.getItem("refreshToken").then(result => {
			refreshToken = result;
		});
		console.log(refreshToken);

		var result = {
			isSuccess: false,
			data: null
		};
		await fetch(
			parameters.url,
			{
				method: parameters.methodType,
				mode: "cors", // no-cors, cors, *same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, same-origin, *omit
				headers: {
					"Authorization": token,
					"Content-Type": "application/json; charset=utf-8",
				},
				redirect: "follow", // manual, *follow, error
				referrer: "no-referrer", // no-referrer, *client
				body: JSON.stringify(parameters.params)
			})
			.then(res => {
				let test = {
					resultValue: "Veriler alınamadı"
				};

				switch (res.status) {
					case 200:
						result = {
							isSuccess: true,
							data: res.json()
						};
						break;
					case 400:
						result = {
							isSuccess: true,
							data: res.json()
						};
						break;
					case 401:
						let params = {
							token: token,
							refreshToken: refreshToken
						};

						result = this.sessionRefreshToken(params, parameters);
						break;
					default:
						result = {
							isSuccess: true,
							data: res.json()
						};
				}
			})
			.catch(err => {
				result = {
					isSuccess: false,
					data: "Beklenmeyen bir hata oluştu. Lütfen internet bağlantınızı kontrol edin veya bir süre sonra tekrar deneyin."
				};
			});
		return result;
	};
	callLoginService = async (parameters) => {
		var result;
		await fetch(
			parameters.url,
			{
				method: parameters.methodType,
				mode: "cors", // no-cors, cors, *same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, same-origin, *omit
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
				redirect: "follow", // manual, *follow, error
				referrer: "no-referrer", // no-referrer, *client
				body: JSON.stringify(parameters.params)
			})
			.then(res => res.json())
			.then(data => {
				result = data;

				AsyncStorage.multiSet([
					["token", result.resultValue.token],
					["refreshToken", result.resultValue.refreshToken]
				]).catch(err => {
					console.log(err);
				});
			}).catch(err => {
				result = err;
			});
		return result;
	};
	sessionRefreshToken = async (parameters, originalParameters) => {
		const url = Config.api.url + Config.api.Controller.Authentication.name + Config.api.Controller.Authentication.methods.Refresh;

		let baseServiceParameters = {
			url: url,
			params: {
				token: parameters.token,
				refreshToken: parameters.refreshToken
			},
			methodType: 'POST'
		};

		var resultRefresh = await this.callLoginService(baseServiceParameters);

		originalParameters.token = resultRefresh.resultValue.token;
		originalParameters.refreshToken = resultRefresh.resultValue.refreshToken;

		var result = await this.callPostService(originalParameters);

		return result;
	};
}

export default BaseServices;