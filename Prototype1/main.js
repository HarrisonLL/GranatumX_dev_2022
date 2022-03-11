function generate_data(){
    var arrayLength = 30
    x1 = []
    x2 = []
    for(var i = 0; i < arrayLength; i++) {
      var xx1 = Math.round(Math.random()*100) + 1
      x1[i] = xx1
      var xx2 = Math.round(Math.random()*100) + 1
      x2[i] = xx2
    }
    return [x1, x2]
}

chunk1 = generate_data();
chunk2 = generate_data();
chunk3 = generate_data();
var myWorker;

main = function()
 {
    myWorker = new Worker("worker.js");
    // post data to worker
    myWorker.postMessage([chunk1, chunk2, chunk3]);
    
    // recieve result
    myWorker.onmessage = function(e) {
        lst_ = JSON.parse(e.data)
        console.log('Message received from worker');
        
    
        new_set1 = {
            x: lst_[0][0],
            y: lst_[0][1],
            mode: 'markers',
                marker : {
                    'color': 'red',
                    'symbol': 'x' },
          }
        new_set2 = {
        x: lst_[1][0],
        y: lst_[1][1],
        mode: 'markers',
            marker : {
                'color': 'yellow',
                'symbol': 'x' },
        }
        new_set3 = {
        x: lst_[2][0],
        y: lst_[2][1],
        mode: 'markers',
            marker : {
                'color': 'blue',
                'symbol': 'x' },
        }

        console.log(new_set1)
        Plotly.newPlot('graph', 
            [new_set1, new_set2, new_set3]
        );
    
    } 



 }

terminate = function() {
    myWorker.terminate();
}

