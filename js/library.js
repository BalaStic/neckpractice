var global_intro_repeat = 2;
var global_walking_repeat;
var global_frettimeout;
var global_gradescale = 0;
var global_walkcounter = 1;
var global_previous = "";
let global_functions_settimeout = [];
let global_functions_setinterval = [];
var global_notes_andor_grades = "grades_only";
var global_2ndstate = false;
var global_insert_rootnote_2nd = false;
var global_display_done = false;
var global_half_tick = true;
var global_bgchord = 0;
var global_inhibit_bgchord = false;
var tick = new Audio("./metronome.wav");
var lastnote;
var lastfret;
var lastnotecolor;
var lastnotetext = "";
var lastfrettext = "";
var global_RepeatMemorize_cnt = 0;
var global_chordfiles = {
	"C": new Audio("./C.wav"),
	"Am": new Audio("./Am.wav"),
	"Dm": new Audio("./Dm.wav"),
	"Diszm": new Audio("./Diszm_low.wav"),
	"Ebm": new Audio("./Diszm_low.wav"),
	"Em": new Audio("./Em.wav"),
	"Gb": new Audio("./Gb.wav"),
	"G": new Audio("./G.wav"),
	"H": new Audio("./H_2.wav"),
	"F": new Audio("./F.wav"),
	"Fisz": new Audio("./Gb.wav"),
};
var Iba_Lesp = 24;
var C, D, E, F, G, A, H = 0;
var Cp, Dp, Ep, Fp, Gp, Ap, Hp = 0;
var Db, Eb, Gb, Ab, Hb = 0;
var Dbp, Ebp, Gbp, Abp, Bbp = 0;
var Cm, Dm, Em, Fm, Gm, Am, Hm = 0;
var Cmp, Dmp, Emp, Fmp, Gmp, Amp, Hmp = 0;
var Dbm, Ebm, Gbm, Abm, Bbm = 0;
var Dbmp, Gbmp, Abmp, Bbmp = 0;

var Cb = ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'];
var C = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];
var C_G = ['C', 'D', 'E', 'F', 'F#', 'G', 'A', 'H'];
var C_G_D = ['C', 'C#', 'D', 'E', 'F', 'F#', 'G', 'A', 'H'];
var C_G_D_A = ['C', 'C#', 'D', 'E', 'F', 'F#', 'G', 'G#', 'A', 'H'];
var C_G_D_A_E = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'H'];
var C_G_D_A_E_H = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'];

var C_F = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'H'];
var C_F_Bb = ['C', 'D', 'Eb', 'E', 'F', 'G', 'A', 'Bb', 'H'];
var C_F_Bb_Eb = ['C', 'D', 'E', 'Eb', 'F', 'G', 'Ab', 'A', 'Bb', 'H'];
var C_F_Bb_Eb_Ab = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'G', 'Ab', 'A', 'Bb', 'H'];
var C_F_Bb_Eb_Ab_Db = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'H'];

var noteDict = { "C": ['C'], "D": ['D'], "E": ['E'], "F": ['F'], "G": ['G'], "A": ['A'], "H": ['H'] };

var Cp = ['C', 'D', 'E', 'G', 'A'];
var C145 = ['C', 'F', 'G'];
var CCm = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'H'];
var maj_grades = ['1', '2', '3', '4', '5', '6', 'maj7'];
var maj_grades = ['1', '2', '3', '4', '5', '6', 'maj7'];
var empty_grades = [ "", "", "", "", "", "", ""]
var CH = ['C', "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "H"];
var CDb = ['C', "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "H"];
var minU_grades = ['1', '2', 'b3', '4', 'U', '5', 'b6', 'b7'];
var min_grades = ['1', '2', '3b', '4', '5', '6b', '7'];
var minp_grades = ['1', '3b', '4', '5', '7'];
var majp_grades = ['1', '2', '3', '5', '6'];	
var majmin_grades = ['1', 'b2', '2', 'b3', '3',' 4', 'U', '5', 'm6', '6', '7', 'maj7'];
var Cm = ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'];
var CmU = ['C', 'D', 'Eb', 'F', 'Gb', 'G', 'Ab', 'Bb'];
var Db = ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'];
var Dbp = ['Db', 'Eb', 'F', 'Ab', 'Bb'];
var D = ['D', 'E', 'F#', 'G', 'A', 'H', 'C#'];
var Dm = ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'];
var Dmp = ['D', 'F', 'G', 'A', 'C'];
var Disz_only = ['D#'];
var Diszm = ['D#', 'E#', 'F#', 'G#', 'A#', 'H', 'C#'];
var Diszmp = ['D#', 'F#', 'G#', 'A#', 'C#'];
var DmU = ['D', 'E', 'F', 'G', 'Ab', 'A', 'Bb', 'C'];
var DDm = ['D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'H', 'C', 'C#'];
var E = ['E', 'F#', 'G#', 'A', 'H', 'C#', 'D#'];
var Eb = ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'];
var Ep = ['E', 'F#', 'G#', 'H', 'C#'];
var Em = ['E', 'F#', 'G', 'A', 'H', 'C', 'D'];
var EmU = ['E', 'F#', 'G', 'A', 'Bb', 'H', 'C', 'D'];
var Ebm = ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'];
var Ebmp = ['Eb', 'Gb', 'Ab', 'Bb', 'Db'];
var Emp = ['E', 'G', 'A', 'H', 'D'];
var EEm = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#'];
var F = ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'];
var Fp = ['F', 'G', 'A', 'C', 'D'];
var FFm = ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'H', 'C', 'Db', 'D', 'Eb', 'E'];
var Fisz = ['F#', 'G#', 'A#', 'H', 'C#', 'D#', 'E#'];
var Fiszp = ['F#', 'G#', 'A#', 'C#', 'D#'];
var Fiszm = ['F#', 'G#', 'A', 'H', 'C#', 'D', 'E'];
var Fiszmp= ['F#', 'A', 'H', 'C#', 'E'];
var Fm = ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'];
var Gb = ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'];
var Gb_only = ['Gb'];
var Gbp = ['Gb', 'Ab', 'Bb', 'Db', 'Eb'];
var G = ['G', 'A', 'H', 'C', 'D', 'E', 'F#'];
var Gp = ['G', 'A', 'H', 'D', 'E'];
var Gm = ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'];
var Giszm = ['G#', 'A#', 'H', 'C#', 'D#', 'E', 'F#'];
var GGm = ['G', 'Ab', 'A', 'Bb', 'H', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#'];
var A = ['A', 'H', 'C#', 'D', 'E', 'F#', 'G#'];
var Am = ['A', 'H', 'C', 'D', 'E', 'F', 'G'];
var Amp = ['A', 'C', 'D', 'E', 'G'];
var Ab = ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'];
var Abm = ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'];
var GiszGiszm = ['G#', 'A', 'A#', 'H', 'H#', 'C#', 'D', 'D#', 'E', 'E#', 'F#', 'G']
var Bb = ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'];
var H = ['H', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'];
var Hp = ['H', 'C#', 'D#', 'F#', 'G#'];
var Hm = ['H', 'C#', 'D', 'E', 'F#', 'G', 'A'];
var allnotes = ['C', 'D', 'E', 'F', 'G', 'A', 'H', 'C', 'C#', 'D#', 'F#', 'G#', 'A#', 'Cb', 'Db', 'Eb', 'Gb', 'Ab', 'Bb'];
var sharps = ['C#', 'D#', 'F#', 'G#', 'A#'];
var flats = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
var majp_list = [Cp, Dbp, Hp, Ep, Gbp, Fiszp, Gp, Fp];
var	maj_list = [C, Db, H, E, Gb, Fisz, G, F];
var minp_list = [Amp, Ebmp, Emp, Dmp, Diszmp];
var min_list = [Am, Ebm, Em, Dm, Diszm];

var scaleDict = {
	"C": C, "Db": Db, "D": D, "Eb": E, "E": E, "F": F, "Gb": Gb, "G": G, "Ab": Ab, "A": A, "Bb": Bb, "H": H,
	"Cp": Cp, "Dbp": Dbp, "Dp": Dp, "Ebp": Ep, "Ep": Ep, "Fp": Fp, "Gbp": Gbp, "Gp": Gp, "Abp": Abp, "Ap": Ap, "Bbp": Bbp, "Hp": Hp,
	"Cm": Cm, "Dbm": Dbm, "Dm": Dm, "Ebm": Em, "Em": Em, "Fm": Fm, "Gbm": Gbm, "Gm": Gm, "Abm": Abm, "Am": Am, "Bbm": Bbm, "Hm": Hm,
	"Cmp": Cmp, "Dbmp": Dbmp, "Dmp": Dmp, "Ebmp": Ebmp, "Emp": Emp, "Fmp": Fmp, "Gbmp": Gbmp, "Gmp": Gmp, "Abmp": Abmp, "Amp": Amp, "Bbmp": Bbmp, "Hmp": Hmp
};

var tonalDict = {
	"maj_grades": maj_grades, "majp_grades": majp_grades, "min_grades": min_grades, "minp_grades": minp_grades, "majmin_grades": majmin_grades, "minU_grades": minU_grades, "empty_grades": empty_grades, "maj_grades": maj_grades, "majp_grades": majp_grades, "min_grades": min_grades, "minp_grades": minp_grades, "majmin_grades": majmin_grades, "minU_grades": minU_grades, "empty_grades": empty_grades
};

var global_last_memorize_params = {
	bpm: 0,
	duration: 0, 
	scale: 0, 
	gradescale: 0, 
	fret1: 0, 
	fret2: 0, 
	string_from: 0, 
	string_to: 0
}

function calc_to_walkn(notes, repeat = global_walking_repeat, reverse = true) {
    if (reverse) {
		to = global_frettimeout + global_frettimeout * (notes.length - 1) + (notes.length) * global_frettimeout;
	} else {
		to = global_frettimeout + global_frettimeout * (notes.length - 1);
	}
    if (repeat != 0 ) to = to * repeat + (global_intro_repeat ) * global_frettimeout;
	else to = 0;	
    return to;
}

function convertCssPxToInt(cssPxValue) {
    return parseInt(cssPxValue, 10);
}

function displaynotes(scale, gradescale = 0, notes_andor_grades = global_notes_andor_grades) {
	global_gradescale = gradescale;
	drawStrings();
	
	$.each(scale_on_fret2fret(scale, gradescale, 0, 24), function(i, note) { 
		to_display_as_note = note.attr('note');
		if (gradescale != 0) {
				index = scale.indexOf(note.attr('note'));
				if (notes_andor_grades == "notes_and_grades") {
											
					to_display_as_note = note.attr('note') + ' ' + gradescale[index];										
					
				}

				if (notes_andor_grades == "notes_only") to_display_as_note = note.attr('note');

				if (notes_andor_grades == "grades_only") to_display_as_note = gradescale[index];

				if (notes_andor_grades == "columns") to_display_as_note = note.attr('coln');

				note.attr('actual', to_display_as_note);
		}
		switch (note.text()) {
			case "───────": 
			case "──────": 
				note.text("── " + to_display_as_note + " ──");				
				break;
			case "─────": 
				note.text("──" + to_display_as_note + "──");				
				break;
			case "────": 
				note.text("─ " + to_display_as_note + " ─");				
				break;
			default:
				note.text(to_display_as_note);				
				break;
		}

		if ( note.attr('grade') == 1 ) { 
				note.css('color', 'lightgreen');
		}
				
	});
	global_necktoggle = 1;
}


function drawString(string_id) {
	neck_tds_style.forEach((style, index) => {
		const td = document.createElement("td");
		Object.assign(td.style, style);
		if (style.textContent) {
			td.textContent = style.textContent;
		}
		string = document.getElementById(string_id);
		string.appendChild(td);
		if (index == 0) {
			td.setAttribute("is_zerofret", "yes");			
		}
		td.setAttribute("id", "r" + string.getAttribute("row") + "c" + index);
		td.setAttribute("rown", string.getAttribute("row") );
		td.setAttribute("coln", index );
		if ( ( [3,5,7,9,15,17,19,21,24].includes(index)) && string_id=="tr_string_G") {
			td.style.backgroundImage = "url('bundpötty_TOP3.png')";
			td.style.backgroundPosition = "center bottom";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ( ( [3,5,7,9,15,17,19,21,24].includes(index)) && string_id=="tr_string_D") {
			td.style.backgroundImage = "url('bundpötty_BOTTOM3.png')";
			td.style.backgroundPosition = "center top";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ([12].includes(index) && string_id=="tr_string_A") {
			td.style.backgroundImage = "url('bundpötty_TOP3.png')";
			td.style.backgroundPosition = "center bottom";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ([12].includes(index) && string_id=="tr_string_E6") {
			td.style.backgroundImage = "url('bundpötty_BOTTOM3.png')";
			td.style.backgroundPosition = "center top";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ([12].includes(index) && string_id=="tr_string_E1") {
			td.style.backgroundImage = "url('bundpötty_TOP3.png')";
			td.style.backgroundPosition = "center bottom";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ([12].includes(index) && string_id=="tr_string_H") {
			td.style.backgroundImage = "url('bundpötty_BOTTOM3.png')";
			td.style.backgroundPosition = "center top";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		
	});
}

function drawStrings() {
	for (var row=0; row<6; row++)
		for (var col=0; col<25; col++) {
			neck[row][col] = $("#neck tr:eq(" + row + ") td:eq(" + col + ")");
			note = neck[row][col];
			note.text("");
			const width = convertCssPxToInt(note.css("width"));
			if (width > 76) {
				note.text("───────");				
				
			} else if (width <= 76 && width >= 72) {
				note.text("──────");				
			} else if (width <= 71 && width > 54) {
				note.text("─────");				
			} else if (width <= 54) {
				note.text("────");				
			}
			if ( note.attr("is_zerofret") )
				note.text("─");
			note.css('font-size', '18px');
			
		}	
}


function getTextboxlines(textboxid) {
    // Get the textarea element
    const textarea = document.getElementById(textboxid);
    
    // Get the content of the textarea and split it into lines
    const lines = textarea.value.split('\n').map(line => line.trim()); // Trim whitespace from each line
	console.log(lines);
    return lines; // Return the array of lines
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInts(min, max, count) {
	const uniqueNumbers = new Set();

    while (uniqueNumbers.size < count) {
        // Generate a random integer between min and max (inclusive)
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueNumbers.add(randomNum); // Add to set (duplicates will be ignored)
    }

    return Array.from(uniqueNumbers); // Convert the set back to an array
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function get_random_note_between_frets(fret_from, fret_to, strings = [1, 6]) {
	notes = scale_on_fret2fret(allnotes, fret_from, fret_to, strings[0], strings[1]);
	rand1 = Math.floor(Math.random() * notes.length);
	do {
		rand2 = Math.floor(Math.random() * notes.length);
	} while ( rand2 == rand1 )
	
	note1 = notes[rand1];
	note2 = notes[rand2];
	dnote = Array(2);
	dnote[0] = note1;
	dnote[1] = note2;
	return note1;
	
}

function get_random_note_on_2_frets(fret1, fret2, string_from = 1, string_to = 6) {
	notes = scale_on_2_frets(allnotes, fret1, fret2, string_from, string_to);
	rand = Math.floor(Math.random() * notes.length);
	note = notes[rand];
	return note;
}	


function kvintegyenes_displaynote(i) {
	$('#tr_elojegyzes').html(tr_elojegyzes_html);
	$('#tr_elojegyzes > td').css('color', '#DbDbDb');
	$('#tr_hangnem > td').css('color', '#DbDbDb');
	color = 'red';
	if ( i % 2 == 1 ) color = 'blue';
	
	
	$('#tr_hangnem > td:eq(' + (i) + ')').css('color', color);
	$('#tr_elojegyzes > td:eq(' + (i) + ')').css('color', color);
	tmp = $('#tr_elojegyzes > td:eq(' + (i) + ')').text();
	$('#tr_elojegyzes > td').text(" ");
	$('#tr_elojegyzes > td:eq(' + (i) + ')').text(tmp);
	counter++;
	//sum++;
	$("#counter").text(counter);
	metronome_tick();
}

function kvintegyenes_randomnote_scheduler() {
	$('#tr_elojegyzes').html(tr_elojegyzes_html);
	$('#nyitoszoveg').css('color', 'white');
	$('#tr_elojegyzes > td').css('color', '#DbDbDb');
	$('#tr_hangnem > td').css('color', '#DbDbDb');
	$('#tr_fok > td').css('color', 'black');
	$('#tr_fok > td').text(" ");

	for(i=0; i<=25; i++) { 
		mysetTimeout( function(i) 
			{ 
				kvintegyenes_display3note(getRandomInt(4,18)); 
			} , (i)*3000, i); 
	}
}


function kvintpattern_maj(i) {
	$('#tr_elojegyzes').html(tr_elojegyzes_html);
	$('#nyitoszoveg').css('color', 'white');
	$('#tr_elojegyzes > td').css('color', '#DbDbDb');
	$('#tr_hangnem > td').css('color', '#DbDbDb');
	$('#tr_fok > td').css('color', 'black');
	$('#tr_fok > td').text(" ");		
	$('#tr_hangnem > td:eq(' + (i) + ')').css('color', 'black');
	$('#tr_elojegyzes > td:eq(' + (i) + ')').css('color', 'black');
	
	if ( i % 2 == 1 ) color = 'blue';
	else color = 'red';
		
	$('#tr_fok > td:eq(' + (i) + ')').text("1");
	$('#tr_hangnem > td:eq(' + (i) + ')').css('color', color);
	$('#tr_fok > td:eq(' + (i) + ')').css('color', color);
	
	$('#tr_fok > td:eq(' + (i+2) + ')').text("2");
	$('#tr_hangnem > td:eq(' + (i+2) + ')').css('color', color);
	$('#tr_fok > td:eq(' + (i+2) + ')').css('color', color);
	
	$('#tr_fok > td:eq(' + (i+4) + ')').text("3");
	$('#tr_hangnem > td:eq(' + (i+4) + ')').css('color', color);
	$('#tr_fok > td:eq(' + (i+4) + ')').css('color', color);
	
	if ( i % 2 == 0 ) color = 'blue';
	else color = 'red';
		
	$('#tr_fok > td:eq(' + (i+5) + ')').text("maj7");
	$('#tr_hangnem > td:eq(' + (i+5) + ')').css('color', color);
	$('#tr_fok > td:eq(' + (i+5) + ')').css('color', color);
	
	$('#tr_fok > td:eq(' + (i+3) + ')').text("6");
	$('#tr_hangnem > td:eq(' + (i+3) + ')').css('color', color);
	$('#tr_fok > td:eq(' + (i+3) + ')').css('color', color);
	
	$('#tr_fok > td:eq(' + (i+1) + ')').text("5");
	$('#tr_hangnem > td:eq(' + (i+1) + ')').css('color', color);
	$('#tr_fok > td:eq(' + (i+1) + ')').css('color', color);
	
	$('#tr_fok > td:eq(' + (i-1) + ')').text("4");
	$('#tr_hangnem > td:eq(' + (i-1) + ')').css('color', color);
	$('#tr_fok > td:eq(' + (i-1) + ')').css('color', color);
}

function lastnote_displayed(note_){
	let note = note_.attr("note");
	$("table#table_kvintegyenes td").filter(function() {
		return $(this).text().trim() === note;
	}).css({
		color: "black",
		fontWeight: "normal"
	});

	removenote_fullscale(note_);
}


function metronome_tick() {	
	tick.play();	
}

function metropractice(pattern) {
	function b2m(bpm) {
		return (60 / bpm) * 1000 ;
	}

	function newpart(pattern) {
		let part = mysetInterval(metronome_tick, b2m(pattern[0]));
		$("#infobox3").html(pattern[0] + " bpm");
		mysetTimeout(() => {
			clearInterval(part);
			if (pattern.length >= 2) {
				newpart(pattern.slice(2));
			}
		}, pattern[1]*60*1000);
	}
	
	newpart(pattern);
	
	let sum = 0
	for (let i = 1; i < pattern.length; i += 2) {
		sum += pattern[i];
	}	
	timerWatch(sum*60);
}

function play_chord(chordstring) {
	if ( ! global_inhibit_bgchord && chordstring != 0 && global_bgchord != 0) {
		global_chordfiles[chordstring].play();
	}
}

function play_note(note) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const frequencies = {
        'C': 261.63,
        'C#': 277.18,
		'Db': 277.18,
        'D': 293.66,
        'E': 329.63,
        'F': 349.23,
        'F#': 369.99,
		'Gb':369.99,
        'G': 392.00,
        'G#': 415.30,
		'Ab': 415.30,
        'A': 440.00,
        'A#': 466.16,
		'Bb': 466.16,
        'H': 493.88 // H is often used in some regions for B
    };

    const frequency = frequencies[note.attr("note")];
    if (!frequency) {
        console.error('Invalid note');
        return;
    }

    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // You can change the wave type
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Play for 1 second
}

function move_up(tr_id) {
	row = document.getElementById(tr_id);
	tbody = row.parentNode;
    tbody.insertBefore(row, tbody.firstChild);
}

function mysetTimeout(callback, delay) {
    // Log a message to the console
    //console.log(`Setting a timeout for ${delay} milliseconds`);

    // Use the native mysetTimeout to execute the callback after the specified delay
    func = setTimeout(callback, delay);
	global_functions_settimeout.push(func);
	return func;
}

function mysetInterval(callback, interval, ...args) {
    //console.log("DEBUG#1", callback, interval);
	callback.apply(null, args); // Call the original callback function
	func = window.setInterval(function() {
        callback.apply(null, args); // Call the original callback function
    }, interval);
	global_functions_setinterval.push(func);
	return func;
	
}

function odavissza_scheduler(period) {
	$('#tr_elojegyzes').html(tr_elojegyzes_html);
	$('#nyitoszoveg').css('color', 'white');
	$('#tr_elojegyzes > td').css('color', '#DbDbDb');
	$('#tr_hangnem > td').css('color', '#DbDbDb');
	$('#tr_fok > td').css('color', 'black');
	$('#tr_fok > td').text(" ");

	for(i=5; i<=21; i++) { mysetTimeout( function(i) { kvintegyenes_displaynote(i); } , (i-5)*period, i); }
	for(i=21; i>=5; i--) { mysetTimeout( function(i) { kvintegyenes_displaynote(i); }, (38-i)*period, i); }
}

function odavissza_step2_scheduler(period) {
	$('#tr_elojegyzes').html(tr_elojegyzes_html);
	$('#nyitoszoveg').css('color', 'white');
	$('#tr_elojegyzes > td').css('color', '#DbDbDb');
	$('#tr_hangnem > td').css('color', '#DbDbDb');
	$('#tr_fok > td').css('color', 'black');
	$('#tr_fok > td').text(" ");

	for(i=5; i<=22; i+=2) { mysetTimeout( function(i) { kvintegyenes_displaynote(i); } , (i-5)*period/2, i); }
	for(i=21; i>=5; i-=2) { mysetTimeout( function(i) { kvintegyenes_displaynote(i); }, (38-i)*period/2, i); }
	for(i=6; i<=20; i+=2) { mysetTimeout( function(i) { kvintegyenes_displaynote(i); } , (34)*period/2+1000+(i-7)*period/2, i); }
	for(i=20; i>=6; i-=2) { mysetTimeout( function(i) { kvintegyenes_displaynote(i); }, (34)*period/2+1000+(34-i)*period/2, i); }
}

function PrepareKvintPattern() {
	var randomNum = getRandomInt(6, 17);
	kvintpattern_maj(randomNum);
	counter++;

	$("#counter").text(counter);
	$("#sum").text(sum);
	  
}

function shownote_fullscale(note_){
	let note = note_.attr("note");
	let coord = note_.attr("id");
	let r = parseInt(coord.match(/r(\d+)c/)[1]);
	let c = parseInt(coord.match(/c(\d+)/)[1]);
	let position = 0;
	const basePositions = [0, 26, 21, 17, 12, 7, 2]; // Index 0 is unused
	position = basePositions[r] + c;
	$('#table_fullscale tr:nth-child(1) td:nth-child(' + position+ ')').text(note);
	$('#table_fullscale tr:nth-child(1) td:nth-child(' + position+ ')').css("color", "blue");
}
	
function toggler(id) {
	iframes = $('#' + id).find('iframe');
	iframes.each( function(i) {
		if (! $(this).attr("src")) {
			$(this).attr("src", $(this).attr("srcx"));
		}
	});
	iframes.toggle();
}
	
function togglerc(clss) {
	iframes = $('.' + clss).find('iframe');
	iframes.each( function(i) {
		if (! $(this).attr("src")) {
			$(this).attr("src", $(this).attr("srcx"));
		}
	});
	iframes.toggle();
}	

function getRandomNoteAndShow(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, contentCallback, want_rootnote_2nd = global_want_rootnote_2nd) {
    let note = 0;
	do {
        rand = Math.floor(Math.random() * notes.length);		
    } while ( global_previouses.includes(rand) );
	if (rand != undefined) global_previouses.push(rand);
	note = notes[rand];
	const content = contentCallback(note);
    updateFretboard(note, content);
}


function getRandomNoteAndUpdate(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, contentCallback, want_rootnote_2nd = global_want_rootnote_2nd) {
    //notes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);    
	let rand = 0;
	let root_lo;
	let root_hi;
    let note = 0;
	let prev_note = notes[global_previous];
	let prev_grade;
	let prev_coln;
	let prev_rown;
	if ( prev_note != undefined && insert_rootnote_2nd) {
		prev_grade = parseInt(prev_note.attr("grade").replace(/b|maj/g, ''));
		prev_coln = parseInt(prev_note.attr("coln"));
		prev_rown = parseInt(prev_note.attr("rown"));
	}
	if (insert_rootnote_2nd && global_2ndstate) {
		if ( prev_grade ==2 && prev_coln>=4 && prev_rown==6)  {
			root_lo = scale_on_fret2fret([scale[0]], gradescale, prev_coln-4, prev_coln, 6, 6)[0];
			note = root_lo;		
		}
		if ( prev_grade ==3 && prev_coln>=6 && prev_rown==6)  {
			root_lo = scale_on_fret2fret([scale[0]], gradescale, prev_coln-6, prev_coln, 6, 6)[0];
			note = root_lo;		
		}
		if ( prev_grade ==3 && prev_coln==24 && prev_rown==1)  {
			root_lo = scale_on_fret2fret([scale[0]], gradescale, prev_coln-6, prev_coln, 1, 1)[0];
			note = root_lo;		
		}		
		if ( prev_grade ==4 && prev_coln>=8 && prev_rown==6)  {
			root_lo = scale_on_fret2fret([scale[0]], gradescale, prev_coln-8, prev_coln, 6, 6)[0];
			note = root_lo;		
		} 
				
		if ( prev_grade ==5 && prev_coln<=19 && prev_rown==1)  {
			root_hi = scale_on_fret2fret([scale[0]], gradescale, prev_coln, prev_coln+5, 1, 1)[0];
			note = root_hi;		
		}
		if ( prev_grade ==6 && prev_coln<=20 && prev_rown==1)  {
			root_hi = scale_on_fret2fret([scale[0]], gradescale, prev_coln, prev_coln+4, 1, 1)[0];
			note = root_hi;		
		}
		if ( prev_grade ==7 && prev_coln<=22 && prev_rown==1)  {
			root_hi = scale_on_fret2fret([scale[0]], gradescale, prev_coln, prev_coln+2, 1, 1)[0];
			note = root_hi;		
		}
				
		let forwardIndex = global_previous;
		let backwardIndex = global_previous;
		if (note == 0) for (let i = 0; notes[forwardIndex] || notes[backwardIndex]; i++) {
			const forwardIndex = global_previous + i;
			const backwardIndex = global_previous - i;
			if (forwardIndex < notes.length && notes[forwardIndex].attr("note") === scale[0]) {
				rand = forwardIndex;
				break;
			}
			if (backwardIndex >= 0 && notes[backwardIndex].attr("note") === scale[0]) {
				rand = backwardIndex;
				break;
			}
		}		
		global_2ndstate = false;		
	} else do {
        rand = Math.floor(Math.random() * notes.length);
		global_2ndstate = true;

	} while (rand == global_previous || (notes[rand].attr("grade") == 1 && insert_rootnote_2nd == true));
	if (rand != undefined) {
		global_previous = rand;
	} else console.log("rand is undefined!");
	if ( note == 0 ) {
		note = notes[rand];
	}
    content = contentCallback(note);
	
    tmp = "";
	for (i=1; i<7; i++) {
		if (i == note.attr("rown"))
			tmp += "<br>──" + content + "──";
		else
			tmp += "<br>─────";
	}
	$("#infobox2").html(tmp);
	updateFretboard(note, content);
    scale_note_counter++;
    $("#scale_note_counter").text(scale_note_counter + " / 10000");
}

function practice_scale16_C(fret, bpm, repeat) {
	let frets = [0, 0, 0, 3, 3, 5, 5, 5, 8, 8, 8, 10, 10, 10, 12, 12, 12];
	let startindex = [0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2];
	practice_scale16(C, maj_grades, fret, frets, startindex, bpm, repeat);
}


function practice_scale16_C(fret, bpm, repeat) {
	let frets = [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("C");
	practice_scale16(C, maj_grades, fret, frets, startindex, bpm, repeat);	
}


function practice_scale16_Cp(fret, bpm, repeat) {
	let frets = [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("C");
	practice_scale16(Cp, majp_grades, fret, frets, startindex, bpm, repeat);	
}

function practice_scale16_Fp(fret, bpm, repeat) {
	let frets = [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22, 22, 24];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("F");
	practice_scale16(Fp, majp_grades, fret, frets, startindex, bpm, repeat);	
}


function practice_scale16_Gp(fret, bpm, repeat) {
	let frets = [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("G");
	practice_scale16(Gp, majp_grades, fret, frets, startindex, bpm, repeat);	
}


function practice_scale16_Fiszp(fret, bpm, repeat) {
	let frets = [2, 2, 4, 4, 7, 7, 9, 9, 11, 11, 14, 14, 16, 16, 19, 19, 21];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("Gb");
	practice_scale16(Fiszp, majp_grades, fret, frets, startindex, bpm, repeat);	
}

function practice_scale16_Diszmp(fret, bpm, repeat) {
	let frets = [2, 2, 4, 4, 7, 7, 9, 9, 11, 11, 14, 14, 16, 16, 19, 19, 21];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("Diszm");
	practice_scale16(Diszmp, minp_grades, fret, frets, startindex, bpm, repeat);	
}



function practice_scale16_Gbp(fret, bpm, repeat) {
	let frets = [2, 2, 4, 4, 7, 7, 9, 9, 11, 11, 14, 14, 16, 16, 19, 19, 21];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("Gb");
	practice_scale16(Gbp, majp_grades, fret, frets, startindex, bpm, repeat);	
}

function practice_scale16_H(fret, bpm, repeat) {
	let frets = [2, 2, 4, 4, 4, 7, 7, 7, 9, 9, 9, 14, 14, 16, 16, 16, 19, 19, 19, 21, 21, 21];
	let startindex = [0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2];
	
	practice_scale16(H, maj_grades, fret, frets, startindex, bpm, repeat);
}

function practice_scale16_Db(fret, bpm, repeat) {
	let frets = [2, 2, 2, 4, 4, 6, 6, 6, 9, 9, 9, 11, 11, 11, 14, 14, 14, 16, 16, 18, 18, 18, 21, 21, 21];
	let startindex = [0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2];
	
	practice_scale16(Db, maj_grades, fret, frets, startindex, bpm, repeat);
}

function practice_scale16_Am(fret, bpm, repeat) {
	let frets = [0, 0, 0, 3, 3, 5, 5, 5, 8, 8, 8, 10, 10, 10, 12, 12, 12, 15, 15, 17, 17, 17, 20, 20, 20, 22, 22, 22];
	let startindex = [0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2];
	//set_gbgchord("Am");
	practice_scale16(Am, min_grades, fret, frets, startindex, bpm, repeat);
}

function practice_scale16_Amp(fret, bpm, repeat) {
	let frets = [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("Am");

	if ( fret[0] > fret[1]) {
		frets = frets.reverse();
		//startindex = startindex.reverse();
	}
	practice_scale16(Amp, minp_grades, fret, frets, startindex, bpm, repeat);
}

function practice_scale16_Dmp(fret, bpm, repeat) {
	let frets = [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("Dm");

	if ( fret[0] > fret[1]) {
		frets = frets.reverse();
		//startindex = startindex.reverse();
	}
	practice_scale16(Dmp, minp_grades, fret, frets, startindex, bpm, repeat);
}

function practice_scale16_Ebmp(fret, bpm, repeat) {
	//let frets = [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22];
	let frets = [1, 1, 4, 4, 6, 6, 9, 9, 11, 11, 13, 13, 16, 16, 18, 18, 21, 21];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
	set_gbgchord("Ebm");

	if ( fret[0] > fret[1]) {
		frets = frets.reverse();
		//startindex = startindex.reverse();
	}
	practice_scale16(Ebmp, minp_grades, fret, frets, startindex, bpm, repeat);
}


function practice_scale16_Emp(fret, bpm, repeat) {
	let frets = [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("Em");

	if ( fret[0] > fret[1]) {
		frets = frets.reverse();
		//startindex = startindex.reverse();
	}
	practice_scale16(Emp, minp_grades, fret, frets, startindex, bpm, repeat);
}


function practice_scale16(scale, gradescale, fret, frets, startindex, bpm, repeat) {
	let filtered_frets = frets;
	let filtered_startindex = startindex;	
	$("#infobox3").html(bpm + " bpm");
	if ( Array.isArray(fret) ) {
		let lo = fret[0];
		let hi = fret[1];
		if ( fret[0] > fret[1]) {
			lo = fret[1];
			hi = fret[0];
			filtered_frets = filtered_frets.reverse();
			filtered_startindex = filtered_startindex.reverse();
		}
		
		for(i=frets.length-1; i>=0; i--) {
			if ( filtered_frets[i] >= hi) {
				filtered_frets.pop();
				filtered_startindex.pop();
			}
		}	

		while (filtered_frets[0] < lo) {
			filtered_frets.shift();
			filtered_startindex.shift();
		}

		if ( fret[0] > fret[1]) {
			filtered_frets = filtered_frets.reverse();
			filtered_startindex = filtered_startindex.reverse();			
		}
	}	
	else {
		filtered_frets = frets.filter(f => f === fret);
		filtered_startindex = startindex.filter((_, index) => frets[index] === fret);
	}
	
	let nextstart = 0;
	let gradescale2 = gradescale;
	let scale2 = scale;
	global_frettimeout = (60 / bpm) * 1000 ;
	global_inhibit_bgchord = false;
	//global_walking_repeat = repeat;
	global_mode = "learn";

	redraw();
	if ( majp_list.includes(scale)) {
		scale2 = maj_list[majp_list.indexOf(scale)];
		gradescale2 = maj_grades;
	}
	if ( minp_list.includes(scale)) {
		scale2 = min_list[minp_list.indexOf(scale)];
		gradescale2 = min_grades;
	}
	displaynotes(scale2, gradescale2);
		
	function prepareNotes(scale, fret, index) {
		
		let notes1 = scale_on_fret2fret(scale, gradescale, fret - 1, fret + 3, 4, 6);
		let notes2 = scale_on_fret2fret(scale, gradescale, fret - 1, fret + 3, 1, 3);
		if (filtered_startindex[index] == 1) {
			notes2 = jQuery.merge(scale_on_fret2fret(scale, gradescale, fret - 1, fret + 3, 2, 3), scale_on_fret2fret(scale, gradescale, fret - 1, fret + 5, 1, 1));
		}
		if (filtered_startindex[index] == 2) {
			notes2 = jQuery.merge(scale_on_fret2fret(scale, gradescale, fret - 1, fret + 3, 2, 3), scale_on_fret2fret(scale, gradescale, fret - 1, fret + 5, 1, 1));
		}
		const notes3 = jQuery.merge(notes1, notes2);
		let selectedNotes = [];
		let maxnote = 16;
		if ( gradescale == majp_grades || gradescale == minp_grades) maxnote = 12;
		for (let i = 0; i < maxnote; i++) {
			//selectedNotes.push(notes3[(startindex[index] + i) % notes3.length]);
			selectedNotes.push(notes3[(filtered_startindex[index] + i)]);
		}
		return prepare_walking_seq_0(selectedNotes);
	}
	
	filtered_frets.forEach( (fret,i) =>{
		let notes = prepareNotes(scale, fret, i);				
		let repeat_i = repeat;
		if ( Array.isArray(repeat) ) {
			repeat_i = repeat[i];
		}
		mysetTimeout(function() {
			walkn(notes, repeat_i);			
 		}, nextstart);
		nextstart += calc_to_walkn(notes, repeat_i);
	});
	timerWatch((nextstart)/1000);

}

function practice_ScaleRandomGrade(scale, gradescale, fret_from, fret_to, string_from = 1, string_to = 6) {
    let notes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);
	getRandomNoteAndUpdate(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("grade"), insert_rootnote_2nd = global_insert_rootnote_2nd);	
}

function practice_ScaleRandomNote(scale, gradescale, fret_from, fret_to, string_from = 1, string_to = 6) {
	let notes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);
	if (gradescale == "coln" ) {		
		getRandomNoteAndUpdate(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("coln"), insert_rootnote_2nd = global_insert_rootnote_2nd);
	}
	else if (gradescale == "coln_note" ) {		
		getRandomNoteAndUpdate(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("coln") + ' ' + note.attr("note"), insert_rootnote_2nd = global_insert_rootnote_2nd);
	} else {
		getRandomNoteAndUpdate(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("note"), insert_rootnote_2nd = global_insert_rootnote_2nd);
	}
	
}

function practice_ScaleRandomCombined(scale, gradescale, fret_from, fret_to, string_from = 1, string_to = 6) {
    let notes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);
	getRandomNoteAndUpdate(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("note") + ' ' + note.attr("grade"), insert_rootnote_2nd = global_insert_rootnote_2nd);
}

function practice_ScaleRandomMemorize(scale, gradescale, fret_from, fret_to, string_from = 1, string_to = 6) {
	let notes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);	
	getRandomNoteAndShow(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("note") + ' ' + note.attr("grade"), want_rootnote_2nd = global_insert_rootnote_2nd);
}

function practice_RepeatMemorize(scale, gradescale, fret_from, fret_to, string_from = 1, string_to = 6) {
    let notes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);	
	note = notes[global_previouses[global_RepeatMemorize_cnt++]];
	if ( global_RepeatMemorize_cnt == global_previouses.length ) global_RepeatMemorize_cnt = 0;
	const content = "dontcare";
	updateFretboard(note, content);
}

function practice_RandomNoteBetweenFrets(fret_from, fret_to, string_from = 1, string_to = 6) {
	do
		note = get_random_note_between_frets(fret_from, fret_to, [string_from , string_to]);
	while (note == lastnote);
	if (note.length == 1) {
		content = '' + note.attr("note")
	} else if (note.length == 2 ) {
		content = Array(2);
		content[0] = '' + note[0].attr("note")
		content[1] = '' + note[1].attr("note")
		
	}
	updateFretboard(note, content);				
}


//function play_rpattern(pattern, intro = "IIII IIII I--- I---") {
function play_rpattern(pattern, intro = "", ms = 60 / 60 * 250) {
	const allowedSet = new Set(['I', '-']);

	const filteredString = (intro + pattern)
		.split('')
		.filter(char => allowedSet.has(char)) // Keep only allowed characters
		.join(''); // Join the array back into a string

	console.log("filteredString: , ms", filteredString);
	for(i=0; i<filteredString.length; i=i+1) {
		if (filteredString[i] == "I") {
			setTimeout( function() { metronome_tick();}, i*ms);
		}
	}
}

function prepare_walking_seq_0(notes) {
	let notes2 = new Array(notes.length);
	for(i=0; i<notes.length; i++) {
		notes2[i]=notes[i];
	}
	return notes2;
}

function random_scale_quiz(array, span) {
	var r;
	do {
		r = getRandomItem(array);
	}
	while ( r == global_previous || r == array[0] || r == "1");
	global_previous = r;	
	$("#" + span).text(r);	
	metronome_tick();
}

function redraw() {
	document.getElementById('neck').innerHTML = orig_neck_content;
}

function removenote_fullscale(note_){
	let note = note_.attr("note");
	let coord = note_.attr("id");
	let r = parseInt(coord.match(/r(\d+)c/)[1]);
	let c = parseInt(coord.match(/c(\d+)/)[1]);		
	const basePositions = [0, 26, 21, 17, 12, 7, 2]; // Index 0 is unused
	position = basePositions[r] + c;
	let td = $('#table_fullscale tr:nth-child(1) td:nth-child(' + position+ ')');
	td.text(td.attr("def"));
	$('#table_fullscale tr:nth-child(1) td:nth-child(' + position+ ')').css("color", "black");
	
}

function reloadframe(id) {
	//console.log("reloadframe('" + id + "')");
	var tmp = $('#' + id).attr("src");
	$('#' + id).attr("src", "");		
	$('#' + id).attr("src", tmp);		
}

function timerWatch(_timeLeft=300, bpm = 0) {
	let timeLeft = Math.floor(_timeLeft);
	const timerDiv = document.getElementById('infobox');
	
	timerDiv.textContent = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;
	//timeLeft--;
	const countdown = mysetInterval(() => {
		const minutes = Math.floor(timeLeft / 60);
		const seconds = timeLeft % 60;

		// Format the time as MM:SS
		timerDiv.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

		if (timeLeft <= 0) {
			clearInterval(countdown);
			timerDiv.textContent = "00:00"; // Display 00:00 when the countdown ends
		}

		timeLeft--;
	}, 1000); // Update every second

	if (bpm != 0) {
		const metronomeInterval = mysetInterval(() => { metronome_tick(); }, 60000 / bpm);
		mysetTimeout(() => { clearInterval(metronomeInterval); }, _timeLeft * 1000);
	}
}

function scale_on_fret2fret(scale, gradescale=0, fret_from=0, fret_to=24, string_from = 1, string_to = 6) {
	let fret_to2;
	var notes = new Array();	
	//for(var i=string_from-1; i<string_to; i++) {
	for(var i=string_to-1; i>=string_from-1; i--) {
		if (fret_to > 24 && fret_from >= 21 && (scale == Cp || scale == C) && i==0) {
			fret_from2 = fret_from - 2 ;
		}
		else if (fret_to > 24 && fret_from >= 21 && (scale == Fp || scale == F) && (i==4 || i==0)) {
			fret_from2 = fret_from - 2 ;
		} 
		else if (fret_to > 24 && fret_from >= 21 && (scale == Dmp || scale == Dm) && (i==4 || i==0)) {
			fret_from2 = fret_from - 2 ;
		}
		else if (fret_to > 24 && fret_from >= 21 && (scale == Amp || scale == Am) && (i==0)) {
			fret_from2 = fret_from - 2 ;
		}		
		else fret_from2 = fret_from;
		
		if (fret_from == -1) {
			if ( i==2 ) {
				fret_to2 = fret_to;
			}
			else fret_to2 = fret_to+1;
		}
		else fret_to2 = fret_to;
		for(var j=fret_from2; j<=fret_to2; j++) {			
			for(var k=0; k<scale.length; k++) {
				if (necknotes_sharp[i][j] == scale[k]) {
					neck[i][j].attr("note", scale[k]);
					if ( gradescale !=0 ) {
						neck[i][j].attr("grade", gradescale[k]);
					} else {
						neck[i][j].attr("grade", '');
					}
					//console.log("DEBUG#1", neck[i][j]);
					notes.push(neck[i][j]);
				}					
				else if (necknotes_flat[i][j] == scale[k]) {
					neck[i][j].attr("note", scale[k]);
					
					if ( gradescale !=0 ) {
						neck[i][j].attr("grade", gradescale[k]);
					} else {
						neck[i][j].attr("grade", '');
					}
					//console.log("DEBUG#2", neck[i][j].attr("grade"));
					notes.push(neck[i][j]);
				}
				else if (necknotes_main[i][j] == scale[k]) {
					if (neck[i][j].attr("note") != scale[k] && (neck[i][j].attr("note"))) {
						neck[i][j].attr("note", neck[i][j].attr("note") + ' ' + scale[k]);
					} else {
						neck[i][j].attr("note", scale[k]);
					}
					//neck[i][j].attr("grade", k+1)
					if ( gradescale !=0 ) { 
						neck[i][j].attr("grade", gradescale[k]);
					} else {
						neck[i][j].attr("grade", '');
					}
					//console.log("DEBUG#3", neck[i][j]);
					notes.push(neck[i][j]);
				}				
			}
		}
	}
	return notes;
}

function scale_on_2_frets(scale, fret1, fret2, string_from = 1, string_to = 6) {
	var notes = new Array();
	for(var i=string_from-1; i<string_to; i++)
		for(var j=0; j<25; j++)
			for(var k=0; k<scale.length; k++) {
				if ((j==fret1 || j==fret2) && necknotes_sharp[i][j] == scale[k]) {
					neck[i][j].attr("note", scale[k])
					neck[i][j].attr("grade", k+1)
					//neck[i][j].text(neck[i][j].attr("note") + ' (' + neck[i][j].attr("grade") + ')')
					notes.push(neck[i][j])
				}					
				else if ((j==fret1 || j==fret2) && necknotes_flat[i][j] == scale[k]) {
					if (neck[i][j].attr("note") != scale[k] && (neck[i][j].attr("note"))) {
						neck[i][j].attr("note", neck[i][j].attr("note") + ' ' + scale[k]);
					} else {
						neck[i][j].attr("note", scale[k]);
					}
						
					neck[i][j].attr("grade", k+1)
					//neck[i][j].text(neck[i][j].attr("note") + ' (' + neck[i][j].attr("grade") + ')')
					notes.push(neck[i][j])
				}
			}
	return notes;
}

function schedule_practiceScaleRandomX(bpm, totalc, practiceFunction, scale, gradescale, fret1, fret2, string_from = 1, string_to = 6, timerWatch_duration = 0) {
	tick_bpm = 16 * bpm;
	tick_ms = 60 / tick_bpm * 1000;
	$("#infobox3").html(bpm + " beat bpm");
	$("#infobox4").html(tick_bpm + " tick bpm");
	const now = new Date();
	const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
	//console.log(formattedTime);
	//console.log;
	interval = 60 / bpm * 1000;
	global_frettimeout = interval;
	duration_ms = totalc * interval;
	let currentInterval = mysetInterval(practiceFunction, interval, scale, gradescale, fret1, fret2, string_from, string_to);
    //let currentInterval2 = mysetInterval(metronome_tick, interval);
	//let currentInterval3 = mysetInterval(play_rpattern, interval, "I-I- I-I- IIII II--", "", tick_ms);
	let currentInterval3 = mysetInterval(play_rpattern, interval, "I--- I--- I--- I---", "", tick_ms);
	//let currentInterval3 = mysetInterval(play_rpattern, interval, "-II- I-II", "", 60 / bpm * 125);
	if ( gradescale == empty_grades ) global_insert_rootnote_2nd = false;
	set_gbgchord(scale);
	stopinterval(currentInterval, duration_ms);
    //stopinterval(currentInterval2, duration_ms);
	stopinterval(currentInterval3, duration_ms);
	if ( timerWatch_duration == 0 ) {
		timerWatch(duration_ms/1000);
	} else if ( timerWatch_duration != -1){
		console.log("call timerWatch(",timerWatch_duration, ")");
		timerWatch(timerWatch_duration);
	}	
}

function schedule_practice_ScaleRandomNote(bpm , duration, scale, gradescale, fret1, fret2, string_from = 1, string_to = 6) {
	set_gbgchord(scale);
	schedule_practiceScaleRandomX(bpm, duration, practice_ScaleRandomNote, scale, gradescale, fret1, fret2, string_from, string_to);
}

function schedule_practice_ScaleRandomGrade(bpm, duration, scale, gradescale, fret1, fret2, string_from = 1, string_to = 6) {
    set_gbgchord(scale);
	schedule_practiceScaleRandomX(bpm, duration, practice_ScaleRandomGrade, scale, gradescale, fret1, fret2, string_from, string_to);
}

function schedule_practice_ScaleRandomCombined(bpm, duration, scale, gradescale, fret1, fret2, string_from = 1, string_to = 6) {
	set_gbgchord(scale);
	schedule_practiceScaleRandomX(bpm, duration, practice_ScaleRandomCombined, scale, gradescale, fret1, fret2, string_from, string_to);
}

function schedule_practice_ScaleRandomMemorize(bpm, duration, scale, gradescale, fret1, fret2, string_from = 1, string_to = 6) {
    global_previouses = [];
	rscale = scale;
	if ( Array.isArray(scale) ) {
		rscale = getRandomItem(scale);
	}
	global_last_memorize_params = {
		bpm: bpm,
		duration: duration,
		scale: rscale,
		gradescale: gradescale,
		fret1: fret1,
		fret2: fret2,
		string_from: string_from,
		string_to: string_to
	}
	
	console.log("----------------");
	global_mode = "test";
	schedule_practiceScaleRandomX(bpm, duration, practice_ScaleRandomMemorize, rscale, gradescale, fret1, fret2, string_from, string_to, duration);
}

function schedule_practice_RepeatMemorize() {	
	global_mode = "test";
	schedule_practiceScaleRandomX(global_last_memorize_params.bpm, global_last_memorize_params.duration, practice_RepeatMemorize, global_last_memorize_params.scale, global_last_memorize_params.gradescale, global_last_memorize_params.fret1, global_last_memorize_params.fret2, global_last_memorize_params.string_from, global_last_memorize_params.string_to);
}

function schedule_scale_quiz(elojegyzes, array, interval, iteration, span) {
	kvintpattern_maj(elojegyzes+11);
	
	$("#" + span).text("start!");	
	for(i=1; i<=iteration; i++) {
		mysetTimeout(random_scale_quiz, interval*i, array, span);
	}
}
function set_gbgchord(scale, force = false) {
	if ( force ) global_bgchord = chord;	
	else {
		switch ( scale ) {
			case Am:
			case Amp:
			case "Am":			
			case "Amp": global_bgchord = "Am"; break;
			
			case C:
			case Cp:
			case "C":
			case "Cp": global_bgchord = "C"; break;			
			
			case Dm:
			case Dmp:
			case "Dm": 
			case "Dmp": global_bgchord = "Dm"; break;
			
			case Diszm:
			case Diszmp:
			case "Diszm":
			case "Diszmp": global_bgchord = "Diszm"; break;
			
			case H:
			case Hp:
			case "H":
			case "Hp": global_bgchord = "H"; break;
			
			case Ebm:
			case Ebmp:
			case "Ebm":
			case "Ebmp": global_bgchord = "Ebm"; break;
			
			case F:
			case Fp:
			case "F":
			case "Fp": global_bgchord = "F"; break;
			
			case Gb:
			case Gbp:
			case "Gb":
			case "Gbp": global_bgchord = "Gb"; break;
			
			case G:
			case Gp:
			case "G":
			case "Gp": global_bgchord = "G"; break;
			
			case Fisz:
			case Fiszp:
			case "Fiszp":
			case "Fisz": global_bgchord = "Gb"; break;
			
			case "flats": global_bgchord = "Gb"; break;
			case "sharps": global_bgchord = "Diszm"; break;
			default: global_bgchord = 0; break;
		}

	}
}

function showall() {
	iframes = $('iframe');
	iframes.each( function(i) {
		if (! $(this).attr("src")) {
			$(this).attr("src", $(this).attr("srcx"));
		}
	});
	iframes.show();
}

function stopinterval(func, after) {
	mysetTimeout( function() {
		clearInterval(func);
		//window.alert('done');
		if (global_display_done ) updateFretboard(lastnote, "done");
	}, after);
}

function startKvintTimer_maj() {
	//PrepareKvintPattern();
	kvinttimer_maj = mysetInterval(PrepareKvintPattern, 15000);
}
	
function stopKvintTimer_maj() {
	clearInterval(kvinttimer_maj);
}

function stop_practice() {
	for (i=0; i<global_functions_settimeout.length; i=i+1) {
		//clearInterval(global_functions_settimeout[i]);
		clearTimeout(global_functions_settimeout[i]);
	}
	
	for (i=0; i<global_functions_setinterval.length; i=i+1) {
		//clearInterval(global_functions_settimeout[i]);
		clearInterval(global_functions_setinterval[i]);
	}	
	global_functions_settimeout = [];
	global_functions_setinterval = [];	
	global_walkcounter = 1;
	tickcounter = 0;
}

function updateFretboard(note, newcontent, play = true) {
	if (lastnote) {
			lastnote.text(lastnotetext);
			lastnote.css("color", lastnotecolor);
			lastfret.text(lastfrettext);
			lastfret.css("color", lastfretcolor);
			lastnote_displayed(lastnote);
	}
	let fret = $("td[fretnum=" + note.attr("coln") + "]");
	lastfret = fret;
	lastnote = note;		
	
	lastnotecolor = note.css("color");
	lastfretcolor = lastfret.css("color");
	
	lastnotetext = note.text();	
	lastfrettext = lastfret.text();

	note.css("color", "red");
	fret.css("color", "red");

	let width = convertCssPxToInt(note.css("width"));
	
	if ( width > 76) {
		content_x = '───X───';
	}
	if ( width <= 76  ) {
        content_x = '──X──';
    }
	if ( width <= 54 ) {        
		content_x = '─X─';
    }
    if (note.attr("is_zerofret") === "yes") {
        content_x = 'X';
    }
	
	if (newcontent == 'done') {
		note.text("done");
	} else if (global_mode == 'test') {
		note.text(content_x);
		fret.text("X");
	} else if (global_mode == 'half') {
		note.text(content_x);
		fret.text("X");
		mysetTimeout(function() {
			updateNoteText(note, newcontent);
			fret.text("" + note.attr("coln"));			
		}, global_frettimeout / 2);
	} else if (global_mode == 'learn') {
		updateNoteText(note, newcontent);
	}

	if (play) play_chord(global_bgchord);	
}

function updateNoteText(note, newcontent) {    
    let width = convertCssPxToInt(note.css("width"));
	//console.log(note.attr("id"), " ", width);
	
	if ( width >= 76) {
		note.text("──" + newcontent + "──");
	}
	if ( width < 76  ) {
        note.text("─" + newcontent + "─");
    }
	if ( width <= 54 ) {        
		note.text("─" + newcontent + "─");
    }
    if (note.attr("is_zerofret") === "yes") {
        note.text(newcontent);
	 	//note_displayed(note);
    }
}

function update_global_notegrade() {
    notesgrades.forEach(notegrade => {
        if ($(`#radio-notes`).is(":checked")) {
            global_notes_andor_grades = 'notes_only';
        }
		if ($(`#radio-grades`).is(":checked")) {
            global_notes_andor_grades = 'grades_only';
        }
		if ($(`#radio-columns`).is(":checked")) {
            global_notes_andor_grades = 'columns';
        }
    });	
}

function update_global_mode() {
    modes.forEach(mode => {
        if ($(`#radio-${mode}`).is(":checked")) {
            global_mode = mode;
        }
    });
	$('#tr_fretnums').find('td').each(function(index) {
		$(this).text(global_mode == 'test' ? 'X' : index);
	});
}

function update_global_walking_repeat() {
    global_repeats.forEach(repeat => {
        if ($(`#radio-${repeat}`).is(":checked")) {
            global_walking_repeat = repeat;
        }
    });
}

function updateNoteContent(note, delay, half_tick = global_half_tick, tickcounter) {
	mysetTimeout(function () {
		content = note.attr('actual');
		updateFretboard(note, content, false);
		if (!half_tick || tickcounter % 4 === 0) {
			metronome_tick();
			if ( tickcounter % 4 === 0 ) {
				if ( global_bgchord != 0) play_chord(global_bgchord);						
			}
		}
		console.log(tickcounter);
		tickcounter++;		
	}, delay);
}

function walk(period, notes, repeat = global_walking_repeat, reverse = true, half_tick = global_half_tick) {
	if (global_walkcounter > repeat) {
		global_walkcounter = 1;
	}
	$('#infobox').html(global_walkcounter++ + '/' + repeat);

	$.each(notes, function (i, note) {
		updateNoteContent(note, period + period * i, half_tick, i);		
	});

	if (reverse) {
		$.each(notes.slice().reverse(), function (i, note) {
			updateNoteContent(note, period + (period * i) + (notes.length * period), half_tick, i);
		});
	}
}

function walkn(notes, repeat = global_walking_repeat, reverse = true, half_tick = global_half_tick) {	
	if (reverse) {
		to = global_frettimeout + global_frettimeout * (notes.length-1)+(notes.length) * global_frettimeout;
	} else {
		to = global_frettimeout + global_frettimeout * (notes.length-1);
	}
	
	let tmp = global_bgchord;
	global_bgchord = 0;
	if ( repeat != 0) 
	for (i = 0; i < global_intro_repeat; i++) {
		updateNoteContent(notes[0], i * global_frettimeout, half_tick = false, i);		
	}
	tickcounter = 0;
				
	for(j=0; j<repeat; j++) {
		mysetTimeout(function() { 
			
			global_bgchord = tmp;
			walk(global_frettimeout, notes, repeat, reverse=reverse, half_tick=global_half_tick);			
		}, to*j+(global_intro_repeat-1)*global_frettimeout);	
	}
}
