if(document.getElementById('ta_t')) document.getElementById('ta_t').addEventListener('keyup', () => { document.getElementById('counter_t').innerHTML = document.getElementById('ta_t').value.length + '文字'; });

var arg = new Object;
var pair = location.search.substring(1).split('&');
for (var i = 0; pair[i]; i++) {
    var kv = pair[i].split('=');
    arg[kv[0]] = kv[1];
}

if (arg.text) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let shadowCanvas = document.createElement('canvas');
    let shadowCtx = shadowCanvas.getContext('2d');

    let img = new Image();
    img.src = "/images/sarahah.jpg?" + new Date().getTime();

    let text = decodeURIComponent(arg.text).replace(/\+/g," ");
    shadowCtx.text = text

    shadowCtx.font = '48px sans-selif';

    let width = 950;
    let size = 80;
    let column = [''];
    let line = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);

        if (shadowCtx.measureText(column[line] + char).width > width) {
            line++;
            column[line] = '';
        }
        column[line] += char;
    }

    canvas.setAttribute('height', 400 + 80 * (line + 1));

    draw(column);

    function draw(column) {
        ctx.font = "300 48px sans-serif";
        ctx.textAlign = "center";

        ctx.fillStyle = "#1BBAB2";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawRect({
            ctx: ctx,
            x: 40,
            y: 40,
            width: (canvas.width - 40 * 2),
            height: (canvas.height - 40 * 2),
            radius: 20,
            color: "white"
        });

        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        for (var j = 0; j < column.length; j++) {
            ctx.fillText(column[j], 600, 170 + size * j);
        }

        img.onload = () => {
            ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height - (img.height + 80));
            setImg();

        }

        function setImg() {
            let imgSrc = canvas.toDataURL();
            document.getElementById('img_s').setAttribute('src', imgSrc);
            document.getElementById('base64_t').setAttribute('value', imgSrc);
        }

        function drawRect(param) {
            var x = param.x; ``
            var y = param.y;
            var width = param.width;
            var height = param.height;
            var radius = param.radius || 0;
            var color = param.color;

            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, 0, false);
            ctx.lineTo(x + width, y + height - radius);
            ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5, false);
            ctx.lineTo(x + radius, y + height);
            ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI, false);
            ctx.lineTo(x, y + radius);
            ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
}