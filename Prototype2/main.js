var myWorker;

main = function()
 {
    // get input values
    mu = parseInt(document.getElementById('mu').value)
    sigma = parseInt(document.getElementById('sigma').value)


    // post data to worker
    myWorker = new Worker("worker.js");
    myWorker.postMessage([mu, sigma]);
    
    // recieve result
    var cnt = 0;
    myWorker.onmessage = function(e) {
        pair = JSON.parse(e.data)
        console.log('Message received from worker');
        cnt ++;
        if (cnt === 1) {
            Plotly.newPlot('graph', 
            [{x:[pair[0]],
            y:[pair[1]],
            mode:'markers'}]
        );

        } else {
            var update = {
                x:  [[pair[0]]],
                y: [[pair[1]]],
                }

            Plotly.extendTraces('graph', 
            update, [0])

        }
        
    } 
 }

terminate = function() {
    myWorker.terminate();
}



