let url = '/api/static/js/states.json';
const state = {
	data: [],
}

const getters = {
	cityData: state=>state.data,
	provinceMap: state=>{
		const map = new Map();
		state.data.forEach(_=>{map.set(_.zipcode,_.name)});

		return map;
	},
	cityMap: state=>{
		const map = new Map();
		state.data.forEach(_=>{
			if(_.child) {
				_.child.forEach(_=>{map.set(_.zipcode,_.name)});
			}
		})

		return map;
	}
}

const mutations = {
	setCity (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshCity ({commit, rootState, state}) {	
		url = rootState.status ? url.replace(/\/api/, '') : url;	
		rootState.axios
			.get(url)
			.then(response=>{
				const arr = eval(`${response.data}`);
				commit('setCity', arr);
			})
			.catch(error=>{console.log(error)});
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}