exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',//direct connect
  specs: ['assignment2.js'],
  
  capabilities:{
	  
	  'browserName':'chrome'
  }
  
  
  };