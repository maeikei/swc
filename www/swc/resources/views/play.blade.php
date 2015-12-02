<!DOCTYPE html>
<html>
    <head>
        <title>Security Wifi Camera</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                  <video width="640" height="360" autoplay>
                    <source src="/swc/videos/wv.ss.{{$file}}.mov">
                      Your browser does not support the video tag.
                  </video>
            </div>
        </div>
    </body>
</html>

