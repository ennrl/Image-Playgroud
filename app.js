window.app = {}
app.file = null;
app.text = null;
app.screen = [1920, 1920/4*3]
const image = document.querySelector("input[type='file']")
image.addEventListener("change", (e)=>{
    const img = new Image;
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
        app.file = img;
        const canvas = document.querySelector("#canva");
        canvas.width = 1920;
        canvas.height = 1920 / img.width * img.height;
        const ctx = canvas.getContext("2d");
        app.ctx = ctx
        setInterval(()=>{__updater(ctx)}, 1000/30)
    }
})

const __download_image = () => {
    var link = document.createElement('a');
    let dt = new Date;
    link.download = 'enrl_ImagePlaygroud_' + dt.getTime() +'.png';
    link.href = document.getElementById('canva').toDataURL()
    link.click();
}

const __updater = (ctx) => {
    const canvas = document.querySelector("#canva");
    // Обновление переменной текста:
    app.text = document.querySelector("textarea").value;
    app.text = app.text.split("\n").reverse()
    let len1 = app.text.length;
    let counter = 0


    // Очистка canvas
    if (app.file != null) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(app.file, 0, 0, canvas.width, canvas.height)
    } else {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    

    // Градиент
    let color = [0, 122, 255];
    let height = canvas.height - 150 - len1*76 - 70 - 45
    for (let y = height; y < canvas.height; y++) {
        let i = y - height;
        let alpha = 1 / (canvas.height - height) * i
        ctx.fillStyle = "rgba(0, 122, 255, " + alpha +")"
        ctx.fillRect(0, y, 1920, 1)
    }

    // Отрисовка текста
    ctx.fillStyle = "white"
    ctx.font = "72px Dela Gothic One"
    
    app.text.forEach(element => {
        let y = canvas.height - 70 - (counter*76);
        counter += 1
        ctx.fillText(element, 100, y, 1920-200)
    });
}


window.addEventListener("DOMContentLoaded", ()=>{
    const canvas = document.querySelector("#canva");
    canvas.width = 1920;
    canvas.height = 1920/4*3;
    const ctx = canvas.getContext("2d");
    app.ctx = ctx
    setInterval(()=>{__updater(ctx)}, 1000/30)
})