require.config({
	  waitSeconds:15,
		baseUrl:'../../js/',
		paths:{
		  'jquery':'jquery',
		  'jquery02':'jquery02',
		  'fastclick':'widget/fastclick',
		  'mobiscroll':'widget/mobiscroll.custom-3.0.0-beta6.min',
		  'mui':'widget/mui.min',
		  'picker':'widget/picker.min',
		  'cookie':'widget/jquery.cookie',
		  'webuploader':'widget/webuploader.min',
		  'megapix':'widget/megapix-image',
		  'common':'common'
		},
	shim:{
		'mobiscroll':{
			deps:['jquery'],
			export:'mobiscroll'
		}
	}
})




