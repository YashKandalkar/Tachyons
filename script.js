var play_div = document.getElementById("play_div");
var img_display = document.getElementById("img_display");
var curr_img = document.getElementById("curr_img");
var main = document.getElementById("main");
var PI_ques = document.getElementById('PI_ques');
var HI_ques = document.getElementById('HI_ques');
var title_p = document.createElement("P");
title_p.classList.add("title");
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var speech_res = '';
var name = '';
var started = false;
var topic_selected = '';

recognition.continuous = true;
 
recognition.onresult = function(event) {
	var current = event.resultIndex;
	var transcript = event.results[current][0].transcript;
 
    speech_res = transcript;
    recognition.abort();
    started = !started;
    console.log(speech_res)
    if(name === ''){
    	name = speech_res;
    	curr_img.src = "images/option.png";
    	textToSpeech("Welcome " + name + ", what would you like to learn? Speak first, to learn about personal insurance and second, to learn about health insurance", true);
    	return;
    }
    if(topic_selected == ''){
	    switch(speech_res.toLowerCase().trim()){
	    	case 'first':
	    		curr_img.src = "https://www.getsmarteraboutmoney.ca/wp-content/uploads/2017/05/Planning-Basics_PersonalInsurance_E_Tertiary_1406x1030-703x515.jpg";
	    		title_p.appendChild(document.createTextNode("Personal Insurance"));
	    		main.insertBefore(title_p, main.childNodes[0]);
	    		let PI = "Selected personal insurance. Personal insurance is a collective name for the different types of insurance items you may own,"+
	    			" such as your car insurance or your home and personal posessions, or the activites you carry out,"+
	    			"such as your holiday. It can also cover different variations within this category such as young driver"+
	    			"insurance abd convicted driver insurance, or non-standard home insurance."
		    	textToSpeech(PI, false);
		    	topic_selected = "PI";
		    	break;
		    case 'second':
		    	curr_img.src = "https://bsmedia.business-standard.com/_media/bs/img/article/2019-02/13/full/1550075960-1512.jpg"
	    		title_p.appendChild(document.createTextNode("Health Insurance"));
	    		main.insertBefore(title_p, main.childNodes[0]);
		    	let HI = "Selected health insurance. Health insurance (sometimes called health coverage) pays for some or all of the cost of the health services you receive, like doctors’ visits, hospital stays, and visits to the emergency room. It helps keep your health care costs predictable and affordable"
		    	textToSpeech(HI, false);
		    	topic_selected = "HI";
		    	break;
	    }
	    return;
	}
}

// list of languages is probably not loaded, wait for it
if(window.speechSynthesis.getVoices().length == 0) {
	window.speechSynthesis.addEventListener('voiceschanged', function() {
		textToSpeech();
	});
}

function textToSpeech(text, listen) {
	// get all voices that browser offers
	var available_voices = window.speechSynthesis.getVoices();

	// this will hold an english voice
	var english_voice = '';

	// find voice by language locale "en-US"
	// if not then select the first voice
	for(var i=0; i<available_voices.length; i++) {
		if(available_voices[i].lang === 'en-US') {
			english_voice = available_voices[i];
			break;
		}
	}
	if(english_voice === '')
		english_voice = available_voices[0];

	// new SpeechSynthesisUtterance object
	var utter = new SpeechSynthesisUtterance();
	utter.rate = 1;
	utter.pitch = 0.5;
	utter.text = text;
	utter.voice = english_voice;

	// event after text has been spoken
	utter.onend = function() {
		// Start listening.
		if(!started && listen)
			recognition.start();

		if(topic_selected == "PI"){
			img_display.style.display = "none";
			title_p.innerHTML = "";
			title_p.appendChild(document.createTextNode("Select the correct option"));
			main.insertBefore(title_p, main.childNodes[0]);
			PI_ques.style.display = "block";
		}
		else if(topic_selected == "HI"){
			img_display.style.display = "none";
			title_p.innerHTML = "";
			title_p.appendChild(document.createTextNode("Select the correct option"));
			main.insertBefore(title_p, main.childNodes[0]);
			HI_ques.style.display = "block";
		}
	}

	window.speechSynthesis.speak(utter);
}

play_div.addEventListener("click", function(){
	textToSpeech('Hello! What is your name?', true);
	play_div.style.display = "none";
	img_display.style.display = "block";
});

recognition.onstart = function() { 
	started = !started;
}

recognition.onspeechend = function() {
	
}
