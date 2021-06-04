//https://teachablemachine.withgoogle.com/models/aTxCdggpy/
//phone
//https://teachablemachine.withgoogle.com/models/s6QqnNQ_i/
//watch link

/* Webcam.set - is a function of webcam.js to see the properties for the live
view of the webcam.
○ width - set the width you want for the webcam view, you can give
any value as per your choice. Here we have given 350 (means
350px).
○ height - set the height you want for the webcam view, you can give
any value as per your choice. Here we have given 300 (means
300px).
○ image_format - We have given png.
○ png_quality - means the quality of the live view of a webcam. */

  Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

  camera = document.getElementById("camera");
/*   This time we haven’t triggered the webcam inside a function, we have just
  written it, so as a result as soon as the page is loaded the webcam will get
  triggered, and you will get a popup asking for the permission.
 */
Webcam.attach( '#camera' );
/* In the take_snapshot() call a function inside Webcam.snap(), and pass data_uri inside it. And we
will use this data_uri to display the image. */
      
function take_snapshot()
{
/*   Now let’s update the div which we had made for the purpose of holding the image
  in index.html , with this data_uri which has the image captured.
 */
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });

    /* We are giving id to the img tag, so that later we can take this image from this
    img tag and use it for comparing it with the model.
    ● Now in src of the img tag we will pass data_uri . So that this image gets
    updated with the selfie taken and gets displayed. */
}

  console.log('ml5 version:', ml5.version);
  /* imageClassifier is a predefined function of ml5.js that is used to
  trigger the ml5.js image classification function. 
  First we pass-
  ■ model is the model which we created in the teachable
machine.
■ json - JavaScript Object Notation is an open standard
file format that is used to hold data in an object format.
Do you remember while doing API classes like the
weather app we had viewed the JSON file in Json
Viewer .
■ So we are adding this at the end of the link because we
just want to access the model created in a teachable
machine and nothing else from the model which has
been created.
Second we pass modelLoaded() function-
If we don’t pass this function, then ml5 image classification won’t start.
  */

//classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/v_sl95BzE/model.json',modelLoaded);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/aTxCdggpy/model.json',modelLoaded);
  function modelLoaded() {
    console.log('Model Loaded!');
  }
     /**
      The purpose of the check() function is to get the captured image, pass it to ml5.js and do
a comparison, and call the result function.
 */ 
  function check()
  {
    /**
     *  captured_image, this id we had given to the img tag which was holding
the captured image in the previous class, so using this id we are getting the
captured image and storing it inside a variable.

     */
    img = document.getElementById('captured_image');
    /**classifier is the variable that holds the model which we had imported
in the starting of ml5.js coding in the previous class.
 */
    classifier.classify(img, gotResult);
  }
/**This gotResult function which holds the result of the comparison, has two parameters
inside it one is error and second is results.
 */

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    /**
     * always the first result is the most accurate one, so we will
fetch the first result label and confidence and print it on the HTML page.
It means we want the 0 index which is inside the results, so we will
write results[0].
○ We want the label which is inside the 0 index, so we will write
results[0].label.
Also we want the confidence which is inside the 0 index, so we will write
results[0].confidence.
in the result, and we only want three digits after
decimal, so will use a predefined JS function toFixed() which will help us to reduce the
numbers after the decimal.
     */
    document.getElementById("result_object_name").innerHTML = results[0].label;
    document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
  }
}
