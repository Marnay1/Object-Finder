status= "";
objects= [];
function preload(){

}
function setup(){
    canvas= createCanvas(400, 400);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0, 0, 400, 400);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){

            confidence= floor(objects[i].confidence * 100);
            label= objects[i].label;
            fill("red");
            text(label + " " + confidence + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
            if(object_name == label){
                //video_holds_webcamLiveView.stop();
                document.getElementById("detected").innerHTML= object_name + " Is Found";
                sound= Window.speechSynthesis;
                utterThis= new SpeechSynthesisUtterance(object_name + " Is Found");
                sound.speak(utterThis);
            } else{
                status= object_name + " Not Found";

            }
        }
    }
}
function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
    object_name= document.getElementById("Object_Name").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    status= true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects= results;
}