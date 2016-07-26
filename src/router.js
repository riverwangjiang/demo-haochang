export default (Router,Vue,TopVue) => {

	let Foo = Vue.extend({
	  template:
	    '<div class="foo fs28">' +
	      '<h1>index</h1>' +
	      '<div> <a v-link="{ path: \'/match/46\'}">比赛正常</a> </div>' +
	      '<div> <a v-link="{ path: \'/match/1\'}">比赛被删除</a> </div>' +
	      '<div> <a v-link="{ path: \'/match/111\'}">比赛不存在</a> </div>' +
	      '<div> <a v-link="{ path: \'/user/10511111\'}">个人正常</a> </div>' +
	      '<div> <a v-link="{ path: \'/user/54\'}">个人禁用</a> </div>' +
	      '<div> <a v-link="{ path: \'/user/88888\'}">个人不存在</a> </div>' +
	      '<div> <a v-link="{ path: \'/playlist/062cf383-6a47-419c-ac2c-39ece060aae9\'}">歌单正常</a> </div>' +
	      '<div> <a v-link="{ path: \'/playlist/009700d8-eb04-43f9-9f2f-3722ccf6f512\'}">歌单删除</a> </div>' +
	      '<div> <a v-link="{ path: \'/playlist/0ff51787-f2b7-44f0-9e64-85ffdfb60993\'}">歌单禁用</a> </div>' +
	      '<div> <a v-link="{ path: \'/ktv/2/1\'}">ktv正常</a> </div>' +
	      '<div> <a v-link="{ path: \'/ktv/2/55\'}">ktv不存在</a> </div>' +
	      '<div> <a v-link="{ path: \'/player/2367380\'}">歌曲正常</a> </div>' +
	      '<div> <a v-link="{ path: \'/player/1\'}">歌曲禁用</a> </div>' +
	      '<div> <a v-link="{ path: \'/player/88888\'}">歌曲不存在</a> </div>' +
	    '</div>'
	})

	Router.map({
		'/':{
			component: Foo
		},
	    '/match/:matchId': {
	        component: reslove => { return require(['./components/Match.vue'],reslove) }
	     },
		'/user/:userId': {
		    component: reslove => { return require(['./components/UserInfo.vue'],reslove) }
		},
		'/playlist/:playlistId': {
		    component: reslove => { return require(['./components/PlayList.vue'],reslove) }
		},
		'/ktv/:userId/:ktvId': {
		    component: reslove => { return require(['./components/Ktv.vue'],reslove) },
		    subRoutes: {
		    	'/': {
				    component: reslove => { return require(['./components/Map.vue'],reslove) }
				}
		    }
		},
		'/player/:songId': {
		    component: reslove => { return require(['./components/Player.vue'],reslove) }
		}
	});

	Router.redirect({
	    '*':"/"
	});

	Router.start(TopVue, '#mainRoute');
}