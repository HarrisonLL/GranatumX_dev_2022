// function needed for simulation purpose
function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}


onmessage = function(chunks) {
  
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js");
  loadPyodide({indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/"}).then((pyodide) => {
    pyodide.loadPackage(['scikit-learn']).then(() => {  
      chunks.data.forEach((chunk) => {
        wait(10000); // wait for 10 seconds to get output
        // customed js namespace, send it to python
        let my_js_namespace = { x1 : chunk[0], x2: chunk[1] };
        pyodide.registerJsModule("my_js_namespace", my_js_namespace);
        pyodide.runPython(`
          from my_js_namespace import x1, x2
          from sklearn.cluster import KMeans
          import io, base64
          import js
          from js import postMessage
          import json

          X = [[x1[i], x2[i]] for i in range(len(x1))]
          kmeans = KMeans(n_clusters=3)
          kmeans.fit(X)
          centers = kmeans.cluster_centers_
          res1 = [[], []]
          res2 = [[], []]
          res3 = [[], []]
          for i,label in enumerate(kmeans.labels_):
              if label == 0:
                  res1[0].append(X[i][0])
                  res1[1].append(X[i][1])
              elif label == 1:
                  res2[0].append(X[i][0])
                  res2[1].append(X[i][1])
              elif label == 2:
                  res3[0].append(X[i][0])
                  res3[1].append(X[i][1])
         
          postMessage(json.dumps([res1, res2, res3]))
        `)

      
    })
  })
})




}
