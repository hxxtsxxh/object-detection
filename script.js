const img = document.getElementById('img');
const button = document.getElementById('submit_button');
const input = document.getElementById('image_url');
const result = document.getElementById('prediction');

let model;

button.onclick = () => {
    const url = input.value;
    img.src = url;
    result.innerText = "Loading...";
}

img.onload = () => {
    doPrediction();
}

function doPrediction() {
    if( model ) {
        model.detect(img).then(predictions => {
            showPrediction(predictions);
        });
    } else {
        cocoSsd.load().then(_model => {
            model = _model;
            model.detect(img).then(predictions => {
                showPrediction(predictions);
            });
        });
    }
}

function showPrediction(predictions) {
    result.innerText = "This might be a " + predictions[0].class;
}
