self.addEventListener('message', function (e) {
    
    var xmlHttp = new XMLHttpRequest();
    if(e.data.m_type=="get")
    {
        xmlHttp.open("get", e.data.m_url, false);
        xmlHttp.send();
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            self.postMessage(xmlHttp.responseText);
        }
    }
    else{
        xmlHttp.open("post", e.data.m_url, false);
        xmlHttp.send(e.data.m_msg);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            self.postMessage(xmlHttp.responseText);
        }
    }
}, false);
