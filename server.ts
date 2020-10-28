import express, { static as exp_satic, Request, Response, NextFunction } from 'express';
import http from 'http';
import argv from 'argv';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import Connection from 'mysql'
var connection = Connection.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mydb'
})

const argv_options = argv.option(
    [
        {
            name: 'port',
            short: 'p',
            type: 'int',
            description: 'Defines http server port',
            example: 'server --port=8090'
        }
    ]
).run().options;

const http_port = 8089;

const app = express();
const server = http.createServer(app);

//.createConnection

// routing...
app.use('/', exp_satic(path.join(__dirname, '/../../examples'), { index: "codeeditor2.html" }));
app.use('/build', exp_satic(path.join(__dirname, '/../../build')));
app.use('/node_modules', exp_satic(path.join(__dirname, '/../../node_modules')));

// app.use('/',express.static(__dirname + "/../../examples", { index: "codeeditor2.html" }));
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.text());

// GET method route 
app.get('/getfilearry', function (req, res) {

    console.log("查看 目录");
    let arrays;
    fs.readdir("./examples", function (err: any, files: Array<any>) {
        if (err) {
            return console.error(err);
        }
        // files.forEach(function (file) {
        //     console.log(file);
        // });
        arrays = files;
        var products2: any = {};
        products2['name'] = arrays;
        let jsoonut = JSON.stringify(products2);
        res.send(jsoonut);
    });
});
app.get('/', function (req, res) {
    res.send('GET request to homepage');
})
// POST method route
app.post('/creatfile', function (req, res) {
    //console.log(req.body);
    let ms = JSON.parse(req.body);
    console.log("准备写入文件", ms.name);
    fs.writeFile("./examples/" + ms.name, ms.msg, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("--------我是分割线-------------")
        console.log("读取写入的数据！");
        fs.readFile("./examples/" + ms.name, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取文件数据: " + ms.name + "//成功");
        });
    });
    res.send('POST request to the homepage');
});

app.get('/oktest', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../server', "ok55.html"));
    //res.redirect('./server/ok.html');
});
app.engine('ntl', function (filePath, options: any, callback) { // define the template engine
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(err, content.toString())
        // this is an extremely simple template engine
        var rendered = content.toString()
            .replace('#title#', '<title>' + options.title + '</title>')
            .replace('#message#', '<h1>' + options.message + '</h1>')
        return callback(null, rendered)
    })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine

app.get('/test', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
    connection.connect();
    connection.query('select * from mydb.newtable ', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
    connection.end();
})
app.set('views', './server') // specify the views directory
app.set('view engine', 'ntl') // register the template engine
// start...
server.listen(http_port, () => {
    console.log(`listening on port ${http_port}...`);
});
