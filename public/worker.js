
let s = 0, m = 0, h = 0, d = 0, ms = 0;
let ts = 0, th = 0, tm = 0, td = 0, ml = 0;
let t, z;


function iniciaTudo() {
    t = setInterval(function() {
        if (ms < 990) {
            ms += 10;
        } else {
            ms = 0;
            if (s <= 58) {
                s++;
            } else {
                s = 0;
                m++;
            };
        
            if (m > 59) {
                m = 0;
                h++;
            };
        
            if (h > 23) {
                h = 0;
                d++;
            };
        }

    }, 10);
    
    z = setInterval(function() {
        if (ml < 990) {
            ml += 10;
        } else {
            ml = 0;
            if (ts <= 58) {
                ts++;
            } else {
                ts = 0;
                tm++;
            }
            
            if (tm > 59) {
                tm = 0;
                th++;
            }
            
            if (th > 23) {
                th = 0;
                td++;
            }
        }
        postMessage([s, m, h, d, ts, th, tm, td]);
    }, 10);
}

self.onmessage = function(message) {
    if (message.data[0] === 'start') {
        s = message.data[1];
        m = message.data[2];
        h = message.data[3];
        d = message.data[4];
        ts = message.data[5];
        tm = message.data[6];
        th = message.data[7];
        td = message.data[8];
        clearInterval(t);
        clearInterval(z);
        iniciaTudo();
    }
    if (message.data === 'pause') {
        clearInterval(t);
        clearInterval(z);
    }
    if (message.data === 'reset') {
        clearInterval(t);
        clearInterval(z);
        s = 0;
        m = 0;
        h = 0;
        d = 0;
    }
    if (message.data === 'deleting') {
        clearInterval(t);
        clearInterval(z);
        ts = 0;
        tm = 0;
        th = 0;
        td = 0;
    }
}