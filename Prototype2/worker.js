// function needed for simulation purpose
function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}



onmessage = function(param) {
  
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js");
  loadPyodide({indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/"}).then((pyodide) => {
    pyodide.loadPackage(['numpy', 'scipy']).then(() => {
        //wait(10000); // wait for 10 seconds to get output
        // customed js namespace, send it to python
        let my_js_namespace = { mu : param.data[0], sigma: param.data[1] };
        pyodide.registerJsModule("my_js_namespace", my_js_namespace);
        pyodide.runPython(`
          from my_js_namespace import mu, sigma
          import numpy as np
          import scipy.stats as stats
          import js
          import json

          
          x = np.linspace(mu - 3*sigma, mu + 3*sigma, 100).tolist()
          y = stats.norm.pdf(x, mu, sigma).tolist()
          for pair in zip(x,y):
            js.postMessage(json.dumps(list(pair)))
        `)

      

  })
})




}
