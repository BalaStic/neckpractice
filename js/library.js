var global_intro_repeat = 4;
var global_walking_repeat;
var global_frettimeout;
var saved_scale = 0;
var saved_gradescale = 0;
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
var global_tickdiv = 4;
var global_beatdiv = 2;
var tick = new Audio("assets/metronome.wav");
var lastnote;
var lastnotecolor;
var lastnotebackground;
var lastnotetext = "";
var global_RepeatMemorize_cnt = 0;
var global_chordfiles = {
	"C": new Audio("assets/C.wav"),
	"D": new Audio("assets/D.wav"),
	"Am": new Audio("assets/Am.wav"),
	"Dm": new Audio("assets/Dm.wav"),
	"Diszm": new Audio("assets/Diszm_low.wav"),
	"Ebm": new Audio("assets/Diszm_low.wav"),
	"E": new Audio("assets/E.wav"),
	"Em": new Audio("assets/Em.wav"),
	"Gb": new Audio("assets/Gb.wav"),
	"G": new Audio("assets/G.wav"),
	"H": new Audio("assets/H_2.wav"),
	"Hm": new Audio("assets/Hm.wav"),
	"F": new Audio("assets/F.wav"),
	"Fisz": new Audio("assets/Gb.wav"),
};
var global_introcount = 4;
var enya_hb = 24;
var C, D, E, F, G, A, H = 0;
var Cp, Dp, Ep, Fp, Gp, Ap, Hp = 0;
var Db, Eb, Gb, Ab, Hb = 0;
var Dbp, Ebp, Gbp, Abp, Bbp = 0;
var Cm, Dm, Em, Fm, Gm, Am, Hm = 0;
var Cmp, Dmp, Emp, Fmp, Gmp, Amp, Hmp = 0;
var Dbm, Ebm, Gbm, Abm, Bbm = 0;
var Dbmp, Gbmp, Abmp, Bbmp = 0;
var gradecolors = new Array(5);		

const global_frets_for_3notes_scale = {
	"Am": { "frets":  [0, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19],
			"startindex":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	"Amp": { "frets":  [0, 2, 4, 7, 9, 12, 14, 17, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	"Hmp": { "frets":  [0, 2, 4, 7, 9, 12, 14, 17, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	"Cp": { "frets": [0, 3, 5, 8, 10, 12, 15, 17, 20],  //, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0] //, 0]
		},
	
	"D": { "frets": [0, 2, 3, 5, 7, 9, 10, 12, 14, 15, 17, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	"Dp": { "frets": [0, 2, 5, 7, 10, 12, 14, 17, 19],  //, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0] //, 0]
		},
	"Dm": { "frets": [0, 1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	"Dmp": { "frets": [1, 3, 5, 8, 10, 13, 15, 18],
		"startindex": [0, 0, 0, 0, 0, 0, 0, 0]
	},
	"Diszmp": { "frets": [2, 4, 6, 9, 11, 14, 16, 19],
		"startindex": [0, 0, 0, 0, 0, 0, 0, 0]
	},
	"Em": { "frets": [0, 2, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},

	"Emp": { "frets": [0, 3, 5, 7, 10, 12, 15, 17, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	
	"F": { "frets": [0, 1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	"Fp": { "frets": [1, 3, 5, 8, 10, 13, 15, 18],
		"startindex": [0, 0, 0, 0, 0, 0, 0, 0]
	},
	"Gbp": { "frets": [2, 4, 6, 9, 11, 14, 16],  //, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0] //, 0]
		},
	/*"G": { "frets": [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		}*/
	"Gp": { "frets": [0, 3, 5, 7, 10, 12, 15, 17],  //, 19],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0] //, 0]
		}
};

const global_frets_for_scale16 = {
	/*"C": { "frets": [0, 0, 3, 5, 7, 8, 10, 12, 12, 15, 17, 20, 20, 22],
			"startindex": [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0]
	},*/
	"C": { "frets": [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22],
			"startindex": [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
		},
	"Cp": { "frets": [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22],
			"startindex": [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
		},
	"Dp": { "frets":  [0, 3, 5, 7, 10, 12, 15, 17, 19, 22],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	"Dm": { "frets": [1, 1, 3, 5, 5, 8, 10, 13, 13, 15, 17, 17, 20, 22, 22],
			"startindex": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1]
	},
	"Dmp": { "frets":  [1, 3, 6, 8, 10, 13, 15, 18, 20],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	"Diszmp": { "frets":  [2, 2, 4, 4, 7, 7, 9, 9, 11, 11, 14, 14, 16, 16, 19, 19, 21],
			"startindex": [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
	},
	/*"Em": { "frets":  [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22],
			"startindex": [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
	},*/
	"Em": { "frets":  [0, 3, 5, 8, 10, 12, 15, 17, 20, 22],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	"Emp": { "frets":  [0, 3, 5, 8, 10, 12, 15, 17, 20, 22],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	"G": { "frets": [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22],
			"startindex": [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
	},
	"Fp": { "frets": [1, 3, 5, 8, 10, 13, 15, 18, 20],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
	"Gbp": { "frets": [2, 4, 7, 9, 11, 14, 16, 19, 21],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	"Gp": { "frets": [0, 3, 5, 8, 10, 12, 15, 17, 20, 22],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	"Am": { "frets": [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22],
			"startindex": [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
	},
	"Amp": { "frets": [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22],
			"startindex": [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
	},
	"Hmp": { "frets":  [0, 3, 5, 7, 10, 12, 15, 17, 19, 22],
			"startindex": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
};

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
var C_triad = ['C', 'E', 'G']
var C145 = ['C', 'F', 'G'];
var CCm = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'H'];
var maj_grades = ['1', '2', '3', '4', '5', '6', 'maj7'];
var maj_grades = ['1', '2', '3', '4', '5', '6', 'maj7'];
var maj_grades_1_3_5_7 = ['1', '3', '5', 'maj7']; 	
var empty_grades = [ "", "", "", "", "", "", ""]
var CH = ['C', "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "H"];
var CDb = ['C', "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "H"];
var minU_grades = ['1', '2', '3b', '4', 'U', '5', '6b', 'b7'];
var min_grades = ['1', '2', '3b', '4', '5', '6b', '7'];
var minp_grades = ['1', 'b3', '4', '5', '7'];
var majp_grades = ['1', '2', '3', '5', '6'];
var majmin_grades = ['1', 'b2', '2', 'b3', '3',' 4', 'U', '5', 'm6', '6', '7', 'maj7'];
var Cm = ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'];
var CmU = ['C', 'D', 'Eb', 'F', 'Gb', 'G', 'Ab', 'Bb'];
var Db = ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'];
var Dbp = ['Db', 'Eb', 'F', 'Ab', 'Bb'];
var D = ['D', 'E', 'F#', 'G', 'A', 'H', 'C#'];
var Dp = ['D', 'E', 'F#', 'A', 'H'];
var Dm = ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'];
var Dmp = ['D', 'F', 'G', 'A', 'C'];
var Disz_only = ['D#'];
var Diszm = ['D#', 'E#', 'F#', 'G#', 'A#', 'H', 'C#'];
var Diszm_triad = ['D#', 'F#', 'A#'];
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
var F_1_3_5_7 = ['F', 'A', 'C', 'E'];
var FFm = ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'H', 'C', 'Db', 'D', 'Eb', 'E'];
var Fisz = ['F#', 'G#', 'A#', 'H', 'C#', 'D#', 'E#'];
var Fiszp = ['F#', 'G#', 'A#', 'C#', 'D#'];
var Fiszm = ['F#', 'G#', 'A', 'H', 'C#', 'D', 'E'];
var Fiszmp= ['F#', 'A', 'H', 'C#', 'E'];
var Fm = ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'];
var Gb = ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'];
var Gb_special = ['Gb', 'Ab', 'Bb', 'Db', 'Eb'];
var Gb_triad = ['Gb', 'Bb', 'Db']
var Gbmaj7 = ['Gb', 'Bb', 'Db', 'F'];
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
var Hmp = ['H', 'D', 'E', 'F#', 'A'];
var allnotes = ['C', 'D', 'E', 'F', 'G', 'A', 'H', 'C', 'C#', 'D#', 'F#', 'G#', 'A#', 'Cb', 'Db', 'Eb', 'Gb', 'Ab', 'Bb'];
var sharps = ['C#', 'D#', 'F#', 'G#', 'A#'];
var flats = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
var majp_list = [Cp, Dbp, Hp, Ep, Gbp, Fiszp, Gp, Fp];
var	maj_list = [C, Db, H, E, Gb, Fisz, G, F];
var minp_list = [Amp, Ebmp, Emp, Dmp, Diszmp];
var min_list = [Am, Ebm, Em, Dm, Diszm];
var Alapi_maj = [ [0, 2, 4, 5], [2, 4, 6, 7] , [4, 6, 7, 9], [6, 8, 9, 11], [9, 10, 12], [9, 11, 12]];
var Alapi_min = [ [0, 2, 3], [0, 2, 3, 5] , [2, 4, 5, 7], [4, 5, 7, 9], [7, 8, 10, 12], [8, 10, 12]];
var maj_4ths_horizontal = [[0, 2, 4, 5, 7, 9, 11, 12], [0, 2, 4, 6, 7, 9, 11, 12], [1, 2, 4, 6, 7, 9, 11, 13], [1, 2, 4, 6, 8, 9, 11, 13], [2, 4, 5, 7, 9, 10, 12, 12], [0, 2, 4, 5, 7, 9, 10, 12], [0, 2, 4, 5, 7, 9, 11, 12]];
var min_4ths_horizontal = [[0, 2, 3, 5, 7, 8, 10, 12], [0, 2, 3, 5, 7, 9, 10, 12], [0, 2, 4, 5, 7, 9, 10, 12], [0, 2, 4, 5, 7, 9, 11, 12], [1, 3, 5, 7, 8, 10, 12, 12], [0, 1, 3, 5, 7, 8, 10, 12], [0, 2, 3, 5, 7, 8, 10, 12]];

var maj_4ths_vertical = [[0, 0, 1, 1, 2, 2], [2, 2, 2, 2, 4, 4], [4, 4, 4, 4, 5, 5], [5, 6, 6, 6, 7, 7], [7, 7, 7, 8, 9, 9], [9, 9, 9, 9, 10, 11], [11, 11, 11, 11, 12, 12]];
var min_4ths_vertical = [[0, 0, 0, 0, 1, 2], [2, 2, 2, 2, 3, 3], [3, 3, 4, 4, 5, 5], [5, 5, 5, 5, 7, 7], [7, 7, 7, 7, 8, 8], [8, 9, 9, 9, 10, 10], [10, 10, 10, 11, 12, 12]];	

var scaleDict = {
	"C": C, "Db": Db, "D": D, "Eb": E, "E": E, "F": F, "Gb": Gb, "G": G, "Ab": Ab, "A": A, "Bb": Bb, "H": H,
	"Cp": Cp, "Dbp": Dbp, "Dp": Dp, "Ebp": Ep, "Ep": Ep, "Em" : Em, "Fp": Fp, "Gbp": Gbp, "Gp": Gp, "Abp": Abp, "Ap": Ap, "Bbp": Bbp, "Hp": Hp,
	"Cm": Cm, "Dbm": Dbm, "Dm": Dm, "Ebm": Ebm, "Em": Em, "Fm": Fm, "Gbm": Gbm, "Gm": Gm, "Abm": Abm, "Am": Am, "Amp": Amp, "Bbm": Bbm, "Hm": Hm,
	"Cmp": Cmp, "Dbmp": Dbmp, "Dmp": Dmp, "Diszmp": Diszmp, "Ebmp": Ebmp, "Emp": Emp, "Fmp": Fmp, "Gbmp": Gbmp, "Gmp": Gmp, "Abmp": Abmp, "Amp": Amp, "Bbmp": Bbmp, "Hmp": Hmp
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

/*let colors = ['blue', 'orange', 'cyan', 'red', 'lightgreen'];
for (let i = 0; i < 5; i++) {
	if (i === 0) continue;
	random = Math.floor(Math.random() * colors.length);
	gradecolors[i] = colors[random];
	
	colors.splice(random, 1);			
}
gradecolors[0] = "white";*/

function calc_to_walkn(notes, repeat = global_walking_repeat) {
    to = global_frettimeout + global_frettimeout * (notes.length - 1);
    if (repeat != 0 ) to = to * repeat + (global_intro_repeat ) * global_frettimeout;
	else to = 0;	
    return to;
}

function convertCssPxToInt(cssPxValue) {
    return parseInt(cssPxValue, 10);
}

function display_notes_actual(notes) {
	$.each(notes, function(i, note) {
		display_note_actual(note);
	});	
}

function display_notes_actual_randomly(notes) {
		
}

function displayNotes(scale, gradescale, bpm = 0, duration_minute = 0, bgchord = '' ) {
	let ms = 60 / bpm * 1000;
	let tick_bpm = 4 * bpm;
	let bar_bpm = bpm / 4;
	let bartick_ms = 60 / bar_bpm * 1000;
	let tick_ms = 60 / tick_bpm * 1000;
	let interval = 60 / bpm * 1000;
	set_gbgchord(bgchord);

	let notes = scale_on_fret2fret(scale, gradescale);
	prepare_notes_actual(scale, gradescale);
	
	$.each(notes, function(i, note) {
		
		//updateNoteText(note);
		display_note_actual(note);
	});	

	let tmp1 = null;
	let tmp2 = null;

	if ( bpm != 0 ) {
		tmp1 = mysetInterval(() => {
			metronome_tick();
		}, ms);
	}

	if ( bar_bpm != 0 ) {
		tmp2 = mysetInterval(() => {
			play_chord(bgchord);
		}, bartick_ms);
	}

	mysetTimeout(() => {
		if (tmp1 !== null) clearInterval(tmp1);
		if (tmp2 !== null) clearInterval(tmp2);
	}, duration_minute * 60 *1000);

	$("#infobox3").html(bpm + " bpm");
	if ( duration_minute !=0 ) {
		timerWatch(duration_minute*60)	;
	}
	
}

function getNoteGradeColor(grade) {
		if (grade == "1") {				
			return "white";
		} else if (grade == "2") {
			return "silver";
		}
		else if (grade == "3" || grade == "b3" || grade == "3b") {
			return "green";
		}
		else if (grade == "4") {
			return "cyan";
		}
		else if (grade == "5") {
			return "blue";
		}	
		else if (grade == "6" || grade == "6b") {
			return "magenta";
		}
		else  if (grade == "7" || grade == "maj7") {
			return "yellow";
		}
}

function prepare_notes_actual(scale, gradescale = 0, fret_from = 0, fret_to = 24, string_from = 1, string_to = 6, notes_andor_grades = global_notes_andor_grades) {
	//drawStrings();
	
	let notes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);
	const displayMap = {
		"notes_and_grades": (note, index) => note.attr('note') + ' ' + gradescale[index],
		"notes_only": (note) => note.attr('note'),
		"grades_only": (note, index) => gradescale[index],
		"columns": (note) => note.attr('coln')
	};
	
	$.each(notes, function(i, note) {
		const noteValue = note.attr('note');
		const grade = note.attr('grade');
		let index = Array.isArray(scale) ? scale.indexOf(noteValue) : -1;

		// Determine display text
		let to_display_as_note = noteValue;
		if (gradescale != 0 && displayMap[notes_andor_grades]) {
			to_display_as_note = displayMap[notes_andor_grades](note, index);			
		}
		note.attr('actual', to_display_as_note);
	
		note.css('color', note.attr("gradecolor"));		
		
	});

	return notes;
}

function display_note_actual(note, note_or_grade = global_notes_andor_grades) {
	if (note_or_grade == "notes_only") {
		note.text("──── " + note.attr("actual") + " ────");
	} else if (note_or_grade == "grades_only") {
		note.text("──── " + note.attr("grade") + " ────");
	};
}

function display_note_note(note) {
	note.text("──── " + note.attr("note") + " ────");
}


function drawString(string_id) {
	neck_tds_style.forEach((style, index) => {
		const td = document.createElement("td");
		Object.assign(td.style, style);
		if (style.textContent) {
			td.textContent = style.textContent;
		}

		const div = document.createElement("div");
		
		// Set div width equal to the td's width if defined in neck_tds_style
		if (style.width) {
			div.style.width = style.width;
		}
		div.style.overflow = "hidden";
		div.style.whiteSpace = "nowrap";
		div.style.display = "flex";
		div.style.justifyContent = "center";
		div.style.margin = "1px 1px 1px 1px";
		div.style.padding = "0px";
		div.style.border = "0px";
		td.appendChild(div);
		
		string = document.getElementById(string_id);
		string.appendChild(td);
		if (index == 0) {
			td.setAttribute("is_zerofret", "yes");			
		}
		td.setAttribute("id", "r" + string.getAttribute("row") + "c" + index);
		td.setAttribute("rown", string.getAttribute("row") );
		td.setAttribute("coln", index );
		if ( ( [3,5,7,9,15,17,19,21,24].includes(index)) && string_id=="tr_string_G") {
			td.style.backgroundImage = "url('assets/bundpötty_TOP3_black.png')";
			td.style.backgroundPosition = "center bottom";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ( ( [3,5,7,9,15,17,19,21,24].includes(index)) && string_id=="tr_string_D") {
			td.style.backgroundImage = "url('assets/bundpötty_BOTTOM3_black.png')";
			td.style.backgroundPosition = "center top";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ([12].includes(index) && string_id=="tr_string_A") {
			td.style.backgroundImage = "url('assets/bundpötty_TOP3_black.png')";
			td.style.backgroundPosition = "center bottom";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ([12].includes(index) && string_id=="tr_string_E6") {
			td.style.backgroundImage = "url('assets/bundpötty_BOTTOM3_black.png')";
			td.style.backgroundPosition = "center top";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ([12].includes(index) && string_id=="tr_string_E1") {
			td.style.backgroundImage = "url('assets/bundpötty_TOP3_black.png')";
			td.style.backgroundPosition = "center bottom";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		if ([12].includes(index) && string_id=="tr_string_H") {
			td.style.backgroundImage = "url('assets/bundpötty_BOTTOM3_black.png')";
			td.style.backgroundPosition = "center top";
			td.style.backgroundRepeat = "no-repeat";
			td.style.color = "white";			
		}
		
	});
}

function drawStrings() {
	for (var row=0; row<6; row++)
		for (var col=0; col<25; col++) {
			
			neck[row][col] = $("#neck tr:eq(" + row + ") td:eq(" + col + ") > div");
			note = neck[row][col];
			
			//if (note) {
				// Standard guitar tuning: E2, A2, D3, G3, B3, E4
				// String numbers: 1 (high E) to 6 (low E)
				const stringTunings = [329.63, 246.94, 196.00, 146.83, 110.00, 82.41]; // E4, B3, G3, D3, A2, E2
				// const row = parseInt(note.parent().attr("row") || note.attr("rown") || row, 10);
				// const col = parseInt(note.attr("coln") || col, 10);
				if (!isNaN(row) && !isNaN(col)) {
					// row: 0 (high E) to 5 (low E)
					const openFreq = stringTunings[row];
					// Each fret increases by a semitone: freq = openFreq * 2^(n/12)
					const freq = Math.round(openFreq * Math.pow(2, col / 12));
					note.attr("freq", freq);
					if (note && note.parent && typeof note.parent === "function") {
						const parentTd = note.parent();
						if (parentTd && parentTd.length > 0) {
							parentTd.attr("freq", freq);
						}
					}
				}
			//}
			note.text("");
			const width = convertCssPxToInt(note.css("width"));
			note.text("───────");
			
			note.css('font-size', '18px');
						
		}	
}

function getTextboxlines(textboxid) {
    // Get the textarea element
    const textarea = document.getElementById(textboxid);
    
    // Get the content of the textarea and split it into lines
    const lines = textarea.value.split('\n').map(line => line.trim()); // Trim whitespace from each line
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

	//removenote_fullscale(note_);
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

function mysetTimeout(callback, delay, ...args) {
    // Use the native setTimeout to execute the callback after the specified delay.
    // On iOS/WKWebView a single-shot timer is accurate enough; no drift correction needed.
    const func = setTimeout(() => callback(...args), delay);
    global_functions_settimeout.push(func);
    return func;
}

// --- Self-correcting interval registry (fixes iOS Chrome / WKWebView timer drift) ---
// setInterval on iOS accumulates unbounded drift because each tick is rescheduled
// independently with no feedback.  We replace it with a recursive setTimeout that
// measures actual elapsed time and shrinks / grows the next delay to compensate.
//
// Callers still pass the returned virtual ID to native clearInterval() – this works
// because we shadow window.clearInterval below to intercept those virtual IDs.
const _myIntervalRegistry = new Map();
let _myIntervalNextId = Number.MAX_SAFE_INTEGER; // far from real setInterval IDs (1, 2, 3…)

const _nativeClearInterval = window.clearInterval.bind(window);
window.clearInterval = function (id) {
    if (_myIntervalRegistry.has(id)) {
        const entry = _myIntervalRegistry.get(id);
        entry.cancelled = true;
        _nativeClearInterval(entry.timeoutId); // cancel the pending recursive step
        _myIntervalRegistry.delete(id);
    } else {
        _nativeClearInterval(id);
    }
};

function mysetInterval(callback, interval, ...args) {
    // Fire once immediately (preserves original behaviour)
    callback(...args);

    const virtualId = _myIntervalNextId--;
    const entry = { cancelled: false, timeoutId: null };
    _myIntervalRegistry.set(virtualId, entry);

    // `expected` is the wall-clock time the NEXT tick should fire
    let expected = Date.now() + interval;

    function step() {
        if (entry.cancelled) return;

        // How far past the expected time are we?  (positive = late, negative = early)
        const drift = Date.now() - expected;

        callback(...args);

        expected += interval;

        // Subtract the drift from the next delay so the cadence stays on track.
        // Clamp to 0 so we never pass a negative value to setTimeout.
        const nextDelay = Math.max(0, interval - drift);
        entry.timeoutId = setTimeout(step, nextDelay);
    }

    entry.timeoutId = setTimeout(step, interval);

    global_functions_setinterval.push(virtualId);
    return virtualId;
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
    updateNoteText(note, content);
	play_chord(global_bgchord);		
}


function getRandomNote_ShowPlay(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, contentCallback, want_rootnote_2nd = global_want_rootnote_2nd) {
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
	updateNoteText(note, content);
	play_chord(global_bgchord);		
    scale_note_counter++;
    $("#scale_note_counter").text(scale_note_counter + " / 10000");
}

/*function practice_scale16_C(fret, bpm, repeat) {
	let frets = [0, 0, 0, 3, 3, 5, 5, 5, 8, 8, 8, 10, 10, 10, 12, 12, 12];
	let startindex = [0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 0, 1, 2];
	practice_scale16(C, maj_grades, fret, frets, startindex, bpm, repeat);
}*/

function practice_scale16_D(fret, bpm, repeat) {
	let frets = [0, 0, 2, 2, 5, 7, 10, 10, 12, 14, 14, 17, 19, 22, 22, 24];
	let startindex = [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0];
	set_gbgchord("D");
	practice_scale16(D, maj_grades, fret, frets, startindex, bpm, repeat);		
}

function practice_scale16_F(fret, bpm, repeat, walking_seq_preparer ) {
	let frets = [1, 1, 3, 5, 5, 8, 10, 13, 13, 15, 17, 17, 20, 22, 22];
	let startindex = [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1];
	set_gbgchord("F");
	practice_scale16(F, maj_grades, fret, frets, startindex, bpm, repeat, walking_seq_preparer);	
}


function practice_scale16_Fp(fret, bpm, repeat) {
	let frets = [0, 0, 3, 3, 5, 5, 8, 8, 10, 10, 12, 12, 15, 15, 17, 17, 20, 20, 22, 22, 24];
	let startindex = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	set_gbgchord("F");
	practice_scale16(Fp, majp_grades, fret, frets, startindex, bpm, repeat);	
}

function practice_scale16_G(fret, bpm, repeat) {
	let frets = [0, 3, 3, 5, 7, 7, 10, 12, 15, 15, 17, 19, 19, 22];
	let startindex = [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0];
	set_gbgchord("G");
	practice_scale16(G, maj_grades, fret, frets, startindex, bpm, repeat);	
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

function practice_scale16_Dm(fret, bpm, repeat, walking_seq_preparer ) {
	let frets = [1, 1, 3, 5, 5, 8, 10, 13, 13, 15, 17, 17, 20, 22, 22];
	let startindex = [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1];
	set_gbgchord("Dm");
	practice_scale16(Dm, min_grades, fret, frets, startindex, bpm, repeat, walking_seq_preparer);	
}


/*function practice_scale16_Diszmp(fret, bpm, repeat, walking_seq_preparer) {
	
	set_gbgchord("Diszm");
	practice_scale16(Diszmp, minp_grades, fret, frets, startindex, bpm, repeat, walking_seq_preparer);	
}*/


function practice_scale16_H(fret, bpm, repeat) {
	let frets = [2, 2, 4, 4, 4, 7, 7, 7, 9, 9, 9, 14, 14, 16, 16, 16, 19, 19, 19, 21, 21, 21];
	let startindex = [0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2];
	
	practice_scale16(H, maj_grades, fret, frets, startindex, bpm, repeat);
}

function practice_scale16_Hm(fret, bpm, repeat) {
	let frets = [0, 2, 2, 5, 7, 10, 10, 12, 14, 14, 17, 19, 22, 22, 24];
	let startindex = [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0];
	set_gbgchord("Hm");
	practice_scale16(Hm, min_grades, fret, frets, startindex, bpm, repeat);	
}


function practice_scale16_Db(fret, bpm, repeat) {
	let frets = [2, 2, 2, 4, 4, 6, 6, 6, 9, 9, 9, 11, 11, 11, 14, 14, 14, 16, 16, 18, 18, 18, 21, 21, 21];
	let startindex = [0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2];
	
	practice_scale16(Db, maj_grades, fret, frets, startindex, bpm, repeat);
}

function practice_scale16_Am(fret, bpm, repeat, walking_seq_preparer) {
	let frets = [0, 0, 3, 5, 8, 8, 10, 12, 12, 15, 17, 20, 20, 22];
	let startindex = [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0];
	set_gbgchord("Am");
	practice_scale16(Am, min_grades, fret, frets, startindex, bpm, repeat, walking_seq_preparer);
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

function practice_scale16_Em(fret, bpm, repeat, walking_seq_preparer) {
	let frets = [0, 3, 3, 5, 7, 7, 10, 12, 15, 15, 17, 19, 19, 22];
	let startindex = [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0];
	set_gbgchord("Em");

	if ( fret[0] > fret[1]) {
		frets = frets.reverse();
		//startindex = startindex.reverse();
	}
	practice_scale16(Em, min_grades, fret, frets, startindex, bpm, repeat, walking_seq_preparer);
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

function practice_scale16(scale, gradescale, fret, bpm, repeat, walking_seq_preparer = function() { return this; }	) {
	const keyInScaleDict = Object.keys(scaleDict).find(k => scaleDict[k] === scale);
	let frets = global_frets_for_scale16[keyInScaleDict].frets;
	let startindex = global_frets_for_scale16[keyInScaleDict].startindex;
	set_gbgchord(scale);	
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
	global_mode = "learn";

	//redraw();
	if ( global_notes_andor_grades != "columns" ) {
		if ( majp_list.includes(scale)) {
			//scale2 = maj_list[majp_list.indexOf(scale)];
			//gradescale2 = maj_grades;
		}
		if ( minp_list.includes(scale)) {
			//scale2 = min_list[minp_list.indexOf(scale)];
			//gradescale2 = min_grades;
		}
	}	
	saved_scale = scale2;
	saved_gradescale = gradescale2;
		
	prepare_notes_actual(scale, gradescale);
		
	filtered_frets.forEach( (fret,i) => {		
		let notes = select_scalebox_notes(scale, gradescale, fret, i, filtered_startindex);					
		notes = walking_seq_preparer(notes);
		
		let repeat_i = repeat;
		if ( Array.isArray(repeat) ) {
			repeat_i = repeat[i];
		}		
		if ( repeat_i == 0 ) return;
		mysetTimeout(function() {
			display_notes_actual(notes);
			walk_seq_ntimes(notes, repeat_i);								
 		}, nextstart);		
		
		nextstart += calc_to_walkn(notes, repeat_i);		
	});
	timerWatch((nextstart)/1000);
	global_tickdiv = 4;
	if ( bpm > 180 ) global_beatdiv = 4;
}

function practice_scale_3_notes_by_string(scale, gradescale, fret, bpm, repeat, walking_seq_preparer = function() { return this; }	) {
	const keyInScaleDict = Object.keys(scaleDict).find(k => scaleDict[k] === scale);
	let frets = global_frets_for_3notes_scale[keyInScaleDict].frets;
	let startindex = global_frets_for_3notes_scale[keyInScaleDict].startindex;
	set_gbgchord(scale);	
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
	//global_inhibit_bgchord = false;
	//global_walking_repeat = repeat;
	global_mode = "learn";

	//redraw();
	if ( global_notes_andor_grades != "columns" ) {
		if ( majp_list.includes(scale)) {
			scale2 = maj_list[majp_list.indexOf(scale)];
			gradescale2 = maj_grades;
		}
		if ( minp_list.includes(scale)) {
			scale2 = min_list[minp_list.indexOf(scale)];
			gradescale2 = min_grades;
		}
	}	
	saved_scale = scale2;
	saved_gradescale = gradescale2;

	prepare_notes_actual(scale, gradescale);
		
	filtered_frets.forEach( (fret,i) => {
		let notes = select_3_notes_by_string(scale, gradescale, filtered_startindex, fret, i);				
		notes = walking_seq_preparer(notes);
		let repeat_i = repeat;
		if ( Array.isArray(repeat) ) {
			repeat_i = repeat[i];
		}		
		if ( repeat_i == 0 ) return;
		mysetTimeout(function() {
			drawStrings();
			walk_seq_ntimes(notes, repeat_i);					
 		}, nextstart);
		nextstart += calc_to_walkn(notes, repeat_i);
	});
	
	timerWatch((nextstart)/1000);	
	global_tickdiv = 2;
	global_beatdiv = 4;
}

function practice_ScaleRandomGrade(scale, gradescale, fret_from, fret_to, string_from = 1, string_to = 6) {
    let notes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);
	getRandomNote_ShowPlay(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("grade"), insert_rootnote_2nd = global_insert_rootnote_2nd);	
}

function practice_ScaleRandomNote(scale, gradescale, fret_from, fret_to, string_from = 1, string_to = 6) {
	let divnotes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);
	let tdnotes = $(divnotes).map(function() {
    	return $(this).closest('td').get(0);
	}).get();

	
	let tdnotespaths = findSequences(tdnotes ,$(tdnotes).filter("#r6c2")[0], $(tdnotes).filter("#r4c4")[0], 6);
	let tdnotespath = tdnotespaths[Math.floor(Math.random() * tdnotespaths.length)];
	
	let divnotespath = $($.map(tdnotespath, function(el) { 
    	return $(el).children('div').first().get(0); 
	}));
	
	let divnotespathArr = divnotespath.map(function(idx, el) {
		return $(el);
	}).get();

	prepare_notes_actual(scale, gradescale);	
	display_notes_actual(divnotes);
	if (gradescale == "coln" ) {		
		getRandomNote_ShowPlay(divnotes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("coln"), insert_rootnote_2nd = global_insert_rootnote_2nd);
	}
	else if (gradescale == "coln_note" ) {		
		getRandomNote_ShowPlay(divnotes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("coln") + ' ' + note.attr("note"), insert_rootnote_2nd = global_insert_rootnote_2nd);
	} else {
		getRandomNote_ShowPlay(divnotes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("note"), insert_rootnote_2nd = global_insert_rootnote_2nd);
	}
	
}

function practice_ScaleRandomPath(scale, gradescale, fret_from, fret_to, string_from = 1, string_to = 6) {
	let divnotes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to);
	let tdnotes = $(divnotes).map(function() {
    	return $(this).closest('td').get(0);
	}).get();
	
	let tdroots = tdnotes.filter(td => {
		const coln = parseInt(td.getAttribute('coln'), 10);
		if (coln >= fret_from && coln <= fret_to) {
			const div = td.querySelector('div');
			return div && div.getAttribute('note') === scale[0];
		}
		return false;
	});
	let found = false;
	let item1, item2;
	while (!found && tdroots.length >= 2) {
		const indices = getRandomInts(0, tdroots.length - 1, 2);
		item1 = tdroots[indices[0]];
		item2 = tdroots[indices[1]];
		const freq1 = parseFloat(item1.getAttribute('freq'));
		const freq2 = parseFloat(item2.getAttribute('freq'));
		const coln1 = parseInt(item1.getAttribute('coln'), 10);
		const coln2 = parseInt(item2.getAttribute('coln'), 10);
		if (Math.abs(freq2 - (2 * freq1)) < 2.0 && Math.abs(coln1 - coln2) <= 3) {
			found = true;
		}
	}
		
	// item1 and item2 now hold the required td elements if found

	let tdnotespaths = findSequencesOptimized(tdnotes ,item1, item2, 8);
	let tdnotespath = tdnotespaths[Math.floor(Math.random() * tdnotespaths.length)];
	
	let divnotespath = $($.map(tdnotespath, function(el) { 
    	return $(el).children('div').first().get(0); 
	}));
	
	let divnotespathArr = divnotespath.map(function(idx, el) {
		return $(el);
	}).get();
	drawStrings();
	prepare_notes_actual(scale, gradescale);	
	
	/*if (gradescale == "coln" ) {		
		getRandomNote_ShowPlay(divnotespathArr, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("coln"), insert_rootnote_2nd = global_insert_rootnote_2nd);
	}
	else if (gradescale == "coln_note" ) {		
		getRandomNote_ShowPlay(divnotespathArr, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("coln") + ' ' + note.attr("note"), insert_rootnote_2nd = global_insert_rootnote_2nd);
	} else {
		getRandomNote_ShowPlay(divnotespathArr, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("note"), insert_rootnote_2nd = global_insert_rootnote_2nd);
	}*/
	// display_notes_actual(divnotespathArr);
	//display_notes_actual_randomly(divnotespathArr);

	const shuffledNotes = [...divnotespathArr].sort(() => Math.random() - 0.5);

	$.each(shuffledNotes, function(i, note) {
		display_note_actual(note);
	});
	global_frettimeout = 500;
	global_introcount = 0;
	//walk_seq_ntimes(shuffledNotes.slice(0, 3), 1);
	//timerWatch(8*250);

	const allowedSet = new Set(['I', '-']);
	let ms = 250;
	let intro = "";
	let patterns = [ 
					"I-I- I-I- ---- ----",
					"---- ---I ---- ----",
					"I-I- -II- ---- ----",
					"II-- -II- ---- ----",
					"-II- I--I ---- ----",
					"I-I- III- ---- ----",
					"II-I -II- ---- ----",
					"--II II-I ---- ----",
					"-II- I-II ---- ----",
					"-II- IIII ---- ----",
										
					"I-I- IIII ---- ----",
					"III- -II- ---- ----",			
				];
	let pattern = patterns[Math.floor(Math.random() * patterns.length)];
	pattern = patterns[Math.floor(Math.random() * 3)];
	pattern = patterns[0];

	$("#infobox5").html(pattern);

	const filteredString = (intro + pattern)
		.split('')
		.filter(char => allowedSet.has(char)) // Keep only allowed characters
		.join(''); // Join the array back into a string
	
	let tickcount = filteredString.split('').filter(char => char === 'I').length
		
	let j=0;
	for(i=0; i<filteredString.length; i=i+1) {
		//one for the notes to display
		if (filteredString[i%8] == "I") {
			
			setTimeout( function(note) { 				
				updateNoteText(note,  note.attr('actual'));
				metronome_tick();
			}, i*ms, shuffledNotes[j++]);				
		}
		if (i==8) {				
			setTimeout( function() { 					
				play_by_conditions();
			}, 8*ms);				
		}

		if ( j>= tickcount  ) j=0;			

	}	
	
}

function practice_ScaleRandomCombined(scale, gradescale, fret_from, fret_to, string_from = 1, string_to = 6) {
    let notes = scale_on_fret2fret(scale, gradescale, fret_from, fret_to, string_from, string_to);
	getRandomNote_ShowPlay(notes, scale, gradescale, fret_from, fret_to, string_from, string_to, note => '' + note.attr("note") + ' ' + note.attr("grade"), insert_rootnote_2nd = global_insert_rootnote_2nd);
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
	updateNoteText(note, content);
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
	updateNoteText(note, content);				
}


//function play_rpattern(pattern, intro = "IIII IIII I--- I---") {
function play_rpattern(pattern, intro = "", ms = 60 / 60 * 250, tickFn = () => metronome_tick()) {
	const allowedSet = new Set(['I', '-']);

	const filteredString = (intro + pattern)
		.split('')
		.filter(char => allowedSet.has(char)) // Keep only allowed characters
		.join(''); // Join the array back into a string

		for(i=0; i<filteredString.length; i=i+1) {
			if (filteredString[i] == "I") {
				setTimeout( function() { tickFn();}, i*ms);
			}
	}
}

function select_3_notes_by_string(scale, gradescale, filtered_startindex, fret, index) {		
	//const notes3 = scale_3_notes_by_string(scale, gradescale, fret, fret + 5, 1, 6);
	const notes3 = scale_3_notes_by_string(scale, gradescale, fret, 24, 1, 6);
	let maxnote = 18;
	//if ( gradescale == majp_grades || gradescale == minp_grades) maxnote = 12;
	return notes3.slice(filtered_startindex[index], filtered_startindex[index] + maxnote);;
}

function select_scalebox_notes(scale, gradescale, fret, index, filtered_startindex) {		
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
		selectedNotes.push(notes3[(filtered_startindex[index] + i)]);
	}
	return selectedNotes;
}

	function prepare_wseq_for_notes_up_down(notes) {
	console.log("notes", notes);
	return notes.concat(notes.slice().reverse());
}

function prepare_wseq_for_16_notes_up_down_fifths(notes) {
	let notes2 = [];		
	notes2.push(
		notes[0], notes[4], notes[1], notes[5], notes[2], notes[6], notes[3], notes[4],
		notes[4], notes[8], notes[5], notes[9], notes[6], notes[10], notes[7], notes[11],
		notes[8], notes[12], notes[9], notes[13], notes[10], notes[14], notes[11], notes[15], notes[12]
	);

	for (let i = notes2.length - 1; i >= 0; i--) {
		notes2.push(notes2[i]);
	}
	return notes2;
}

function prepare_wseq_for_16_notes_up_down_fourths(notes) {
	let notes2 = [];		
	notes2.push(
		notes[0], notes[3], notes[1], notes[4], notes[2], notes[5], notes[3], notes[6],
		notes[4], notes[7], notes[5], notes[8], notes[6], notes[9], notes[7], notes[10],
		notes[8], notes[11], notes[9], notes[12], notes[10], notes[13], notes[11], notes[14], notes[12], notes[15]
	);

	for (let i = notes2.length - 1; i >= 0; i--) {
		notes2.push(notes2[i]);
	}
	return notes2;
}

function prepare_wseq_for_3_notes_by_string_fifths(notes) {
	let notes2 = [];		
	notes2.push(
		notes[0], notes[4], notes[1], notes[5], notes[2], notes[6], notes[3], notes[7],
		notes[4], notes[8], notes[5], notes[9], notes[6], notes[10], notes[7], notes[11],
		notes[8], notes[12], notes[9], notes[13], notes[10], notes[14], notes[11], notes[15], notes[12], notes[16], notes[13], notes[17]
	);

	for (let i = notes2.length - 1; i >= 0; i--) {
		notes2.push(notes2[i]);
	}
	return notes2;
}

function prepare_wseq_for_3_notes_by_string_fourths(notes) {
	let notes2 = [];		
	notes2.push(
		notes[0], notes[3], notes[1], notes[4], notes[2], notes[5], notes[3], notes[6],
		notes[4], notes[7], notes[5], notes[8], notes[6], notes[9], notes[7], notes[10],
		notes[8], notes[11], notes[9], notes[12], notes[10], notes[13], notes[11], notes[14], notes[12], notes[15], notes[13], notes[16], notes[14], notes[17]
	);

	for (let i = notes2.length - 1; i >= 0; i--) {
		notes2.push(notes2[i]);
	}
	return notes2;
}

function prepare_wseq_for_3_notes_by_string_fourths_fourths(notes) {
	let notes2 = [];		
	notes2.push(
		notes[0], notes[3], notes[6], notes[9], notes[12], notes[15], notes[15], notes[12], notes[9], notes[6], notes[3], notes[0],
		notes[1], notes[4], notes[7], notes[10], notes[13], notes[16], notes[16], notes[13], notes[10], notes[7], notes[4], notes[1],
		notes[2], notes[5], notes[8], notes[11], notes[14], notes[17], notes[17], notes[14], notes[11], notes[8], notes[5], notes[2]
	);

	for (let i = notes2.length - 1; i >= 0; i--) {
		notes2.push(notes2[i]);
	}
		
	return notes2;
}

function prepare_wseq_for_3_notes_fourths(notes) {
	return notes.concat(notes.slice().reverse());;
}


function prepare_wseq_for_N_notes_123_234(notes) {
	const n = notes.length;
	let notes2 = [];
	// Forward pattern: 0,1,2 | 1,2,3 | ... | n-3,n-2,n-1
	for (let i = 0; i <= n - 3; i++) {
		notes2.push(notes[i], notes[i + 1], notes[i + 2]);
	}
	// Backward pattern: n-3,n-2,n-1 | n-4,n-3,n-2 | ... | 0,1,2
	for (let i = n - 3; i >= 0; i--) {
		notes2.push(notes[i + 2], notes[i + 1], notes[i]);
	}
	return notes2;
}

function prepare_wseq_for_N_notes_123_234_4x(notes) {
	const n = notes.length;
	let notes2 = [];
	// Forward pattern: 0,1,2 | 1,2,3 | ... | n-3,n-2,n-1
	
		for (let i = 0; i <= n - 3; i++) {
			for ( let j = 0; j < 4; j++) {
				notes2.push(notes[i], notes[i + 1], notes[i + 2]);
			}
		}

	// Backward pattern: n-3,n-2,n-1 | n-4,n-3,n-2 | ... | 0,1,2
	
		for (let i = n - 3; i >= 0; i--) {
			for ( let j = 0; j < 4; j++) {
				notes2.push(notes[i + 2], notes[i + 1], notes[i]);
			}
		}
	
	return notes2;
}

function prepare_wseq_for_N_notes_1324(notes) {
	const n = notes.length;
	let notes2 = [];

	// Forward pattern: 1,3,2,4 | 3,5,4,6 | ... (indices 0,2,1,3 | 2,4,3,5 | ...)
	for (let i = 0; i < n - 3; i += 2) {
		notes2.push(notes[i], notes[i + 2], notes[i + 1], notes[i + 3]);
	}

	// Handle remaining notes if n is odd
	if (n % 2 === 1) {
		notes2.push(notes[n - 3], notes[n - 1], notes[n - 2]);
	}

	const notes2_reversed = notes2.slice().reverse();
	notes2 = notes2.concat(notes2_reversed);
	return notes2;
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
	//neck[1][1].text("HELLO");
	drawStrings();
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

function scale_3_notes_by_string(scale, gradescale=0, fret_from=0, fret_to=24, string_from = 1, string_to = 6) {
	let lastnote = neck[5][0];	
	var notes = new Array();	
	for(var i=string_to-1; i>=string_from-1; i--) {
		//console.log("i", i);
		for(var j=fret_from, notecounter = 0; notecounter < 3 && j < 25; j++) {			
			//console.log("i j notecounter", i, j, notecounter);
			//console.log('neck[i][j].attr("freq") lastnote.attr("freq")', neck[i][j].attr("freq"), lastnote.attr("freq"));
			currentFreq = parseFloat(neck[i][j].attr("freq"));
			lastFreq = parseFloat(lastnote.attr("freq"));				
			for(var k=0; k<scale.length; k++) {
				if ( i == 5 && j == 0)  { lastFreq = 0}
				if (necknotes_sharp[i][j] == scale[k] && currentFreq > lastFreq ) {
					neck[i][j].attr("note", scale[k]);
					if ( gradescale !=0 ) {
						neck[i][j].attr("grade", gradescale[k]);
					} else {
						neck[i][j].attr("grade", '');
					}
					lastnote = neck[i][j];
					notes.push(lastnote);
					notecounter++;
					//console.log("DEBUG#1 i j notecounter", i, j, notecounter);					
				}					
				else if (necknotes_flat[i][j] == scale[k] && currentFreq > lastFreq ) {
					neck[i][j].attr("note", scale[k]);					
					if ( gradescale !=0 ) {
						neck[i][j].attr("grade", gradescale[k]);
					} else {
						neck[i][j].attr("grade", '');
					}
					//console.log("DEBUG#2", neck[i][j].attr("grade"));
					lastnote = neck[i][j];
					notes.push(lastnote);
					notecounter++;
				}
				else if (necknotes_main[i][j] == scale[k] && currentFreq > lastFreq) {
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
					lastnote = neck[i][j];
					notes.push(lastnote);
					notecounter++;
				}				
			}
			
		}
	}
	return notes;
}

function schedule_rootstar(bpm, totalc, scale, gradescale, timerWatch_duration = 0) {
	tick_bpm = 4 * bpm;
	tick_ms = 60 / tick_bpm * 1000;
	$("#infobox3").html(bpm + " beat bpm");
	$("#infobox4").html(tick_bpm / 2 + " tick bpm");
	const now = new Date();
	const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
	//console.log(formattedTime);
	//console.log;
	interval = 60 / bpm * 1000;
	global_frettimeout = interval;
	duration_ms = totalc * interval;
	displayNotes(scale, gradescale);
	
	set_gbgchord(scale);
	let currentInterval3 = mysetInterval(play_rpattern, interval, "I--- I--- I--- I---", "", tick_ms);
	let currentInterval4 = mysetInterval(play_by_conditions, interval*4);
		
	if ( gradescale == empty_grades ) global_insert_rootnote_2nd = false;
	

	stopinterval(currentInterval3, duration_ms);
	stopinterval(currentInterval4, duration_ms);
	if ( timerWatch_duration == 0 ) {
		timerWatch(duration_ms/1000);
	} else if ( timerWatch_duration != -1){
		//console.log("call timerWatch(",timerWatch_duration, ")");
		timerWatch(timerWatch_duration);
	}	
}



function scale_on_fret2fret(scale, gradescale=0, fret_from=0, fret_to=24, string_from = 1, string_to = 6) {
	let fret_to2;
	var notes = new Array();
	
	const grade = note.attr("grade");
	
	let colors = ['blue', 'orange', 'cyan', 'red', 'lightgreen'];
	
	//for(var i=string_from-1; i<string_to; i++) {
	for(var i=string_to-1; i>=string_from-1; i--) {
		if (fret_to > 24 && fret_from >= 21 && ([Cp, C, Gp, G].includes(scale))  && (i==0)) {
			fret_from2 = fret_from - 1 ;			
		}
		else if (fret_to > 24 && fret_from >= 21 && (scale == Cp || scale == C) && (i==4)) {
			fret_from2 = fret_from - 1  ;
		}
		else if ( (scale == Cp || scale == C) && (i==1)) {
			fret_from2 = fret_from + 1  ;
		}
		else if (fret_to > 24 && fret_from >= 21 && (scale == Fp || scale == F) && (i==4 || i==0) ) {
			fret_from2 = fret_from - 1 ;
			fret_to2 = fret_to - 1 ;
		}
		else if (fret_to > 24 && fret_from >= 21 && (scale == Fp || scale == F) && (i==3) ) {
			fret_from2 = fret_from -1 ;
		} 
		else if (fret_to > 24 && fret_from >= 21 && (scale == Dmp || scale == Dm) && (i==4 || i==0)) {
			fret_from2 = fret_from - 2 ;
		}
		else if (fret_to > 24 && fret_from >= 21 && (scale == Emp || scale == Em) && i==0) {
			fret_from2 = fret_from - 1 ;
		}
		else if (fret_to > 24 && fret_from >= 21 && (scale == Amp || scale == Am) && (i==0)) {
			fret_from2 = fret_from - 1 ;
		}
		else if (fret_to > 24 && fret_from >= 21 && (scale == Amp || scale == Am) && (i==4)) {
			fret_from2 = fret_from - 1 ;
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
					neck[i][j].attr("gradecolor", getNoteGradeColor(neck[i][j].attr("grade")));
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
					neck[i][j].attr("gradecolor", getNoteGradeColor(neck[i][j].attr("grade")));
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
					neck[i][j].attr("gradecolor", getNoteGradeColor(neck[i][j].attr("grade")));
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

function schedule_pattern(scale, gradescale, pattern, startcol, bpm, repeat, walking_seq_preparer) {
	tick_bpm = bpm;
	tick_ms = 60 / tick_bpm * 1000;
	$("#infobox3").html(bpm + " beat bpm");
	$("#infobox4").html(tick_bpm + " tick bpm");
	let divnotes = scale_on_fret2fret(scale, gradescale);
	divnotes.forEach(note => {
		note.css('color', note.attr("gradecolor"));
	});
	let tdnotes = $(divnotes).map(function() {
    	return $(this).closest('td').get(0);
	}).get();
	//console.log("tdnotes", tdnotes);
	let startnote = tdnotes.find(n => parseInt($(n).attr("rown"), 10) === 6 && parseInt($(n).attr("coln"), 10) === startcol);
	//console.log("startnote", startnote);
	let rown0 = 6;
	let coln0 = startcol;
	
	let selectednotes = [];
	
	for (let i = 0; i < pattern.length; i++) {
		for (let j = 0; j < pattern[i].length; j++) {
			let row = rown0 - i;
			let col = coln0 + pattern[i][j];
			// Use row and col variables here
			let note = tdnotes.find(n => parseInt($(n).attr("rown"), 10) === row && parseInt($(n).attr("coln"), 10) === col);
			if (note) {
				// Use the note element
				selectednotes.push(note);
			}
		}
	}
	let divselectednotes = [];
	$($.map(selectednotes, function(el) { 
    	return $(el).children('div').first().get(0); 
	})).each(function() {
		divselectednotes.push($(this));
	});

	global_frettimeout = tick_ms;
	let seq = walking_seq_preparer(divselectednotes);
	walk_seq_ntimes(seq, repeat);	
	timerWatch(calc_to_walkn(seq, repeat)/1000);
	set_gbgchord(scale);
	global_tickdiv = 2;
	global_beatdiv = 8;

}

function schedule_pattern_hangközök_horizontal(scale, gradescale, pattern, startcol, bpm, repeat, walking_seq_preparer) {
	tick_bpm = bpm;
	tick_ms = 60 / tick_bpm * 1000;
	$("#infobox3").html(bpm + " beat bpm");
	$("#infobox4").html(tick_bpm + " tick bpm");
	let divnotes = scale_on_fret2fret(scale, gradescale);
	let tdnotes = $(divnotes).map(function() {
    	return $(this).closest('td').get(0);
	}).get();
	//console.log("tdnotes", tdnotes);
	let startnote = tdnotes.find(n => parseInt($(n).attr("rown"), 10) === 6 && parseInt($(n).attr("coln"), 10) === startcol);
	//console.log("startnote", startnote);
	
	divnotes.forEach(note => {
		note.css('color', note.attr("gradecolor"));		
	});

	let selectednotes = [];
	
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < pattern[i].length; j++) {
			let row1 = 6-i;
			let row2 = row1-1;
			let col1 = startcol + pattern[i][j];
			let col2 = startcol + pattern[i+1][j];
			if ( row1 == 2 && row2 == 1) {
				col1 = startcol + pattern[i+1][j];
				col2 = startcol + pattern[i+2][j];				
			}

			// Use row and col variables here
			let note = tdnotes.find(n => parseInt($(n).attr("rown"), 10) === row1 && parseInt($(n).attr("coln"), 10) === col1);
			if (note) {
				// Use the note element
				selectednotes.push(note);
			}			
			note = tdnotes.find(n => parseInt($(n).attr("rown"), 10) === row2 && parseInt($(n).attr("coln"), 10) === col2);
			if (note) {
				// Use the note element
				selectednotes.push(note);				
			}
		}
	}
	
	let divselectednotes = [];
	$($.map(selectednotes, function(el) { 
    	return $(el).children('div').first().get(0); 
	})).each(function() {
		divselectednotes.push($(this));
	});

	global_frettimeout = tick_ms;
	let seq = walking_seq_preparer(divselectednotes);
	walk_seq_ntimes(seq, repeat);	
	timerWatch(calc_to_walkn(seq, repeat)/1000);
	set_gbgchord(scale);
	global_tickdiv = 1;
}

function schedule_pattern_hangközök_vertical(scale, gradescale, pattern, startcol, bpm, repeat, walking_seq_preparer) {
	tick_bpm = bpm;
	tick_ms = 60 / tick_bpm * 1000;
	$("#infobox3").html(bpm + " beat bpm");
	$("#infobox4").html(tick_bpm + " tick bpm");
	let divnotes = scale_on_fret2fret(scale, gradescale);
	let tdnotes = $(divnotes).map(function() {
    	return $(this).closest('td').get(0);
	}).get();
	//console.log("tdnotes", tdnotes);
	let startnote = tdnotes.find(n => parseInt($(n).attr("rown"), 10) === 6 && parseInt($(n).attr("coln"), 10) === startcol);
	//console.log("startnote", startnote);
	let notes = scale_on_fret2fret(scale, gradescale);
	notes.forEach(note => {
		note.css('color', note.attr("gradecolor"));		
	});
	let selectednotes = [];
	
	for (let i = 0; i < pattern.length; i++) {
		for (let j = 0; j < 5; j++) {		
			let row = 6-j;
			let col = startcol + pattern[i][j];
			
			// Use row and col variables here
			let note = tdnotes.find(n => parseInt($(n).attr("rown"), 10) === row && parseInt($(n).attr("coln"), 10) === col);
			if (note) {
				// Use the note element
				selectednotes.push(note);
				
			}
			row = 5-j;
			col = startcol + pattern[i][j+1];
			
			// Use row and col variables here
			note = tdnotes.find(n => parseInt($(n).attr("rown"), 10) === row && parseInt($(n).attr("coln"), 10) === col);
			if (note) {
				// Use the note element
				selectednotes.push(note);
			}						
		}
	}
	
	let divselectednotes = [];
	$($.map(selectednotes, function(el) { 
    	return $(el).children('div').first().get(0); 
	})).each(function() {
		divselectednotes.push($(this));
	});

	global_frettimeout = tick_ms;
	let seq = walking_seq_preparer(divselectednotes);
	walk_seq_ntimes(seq, repeat);	
	timerWatch(calc_to_walkn(seq, repeat)/1000);
	set_gbgchord(scale);
	global_tickdiv = 2;
	global_beatdiv = 4;
}


function schedule_pattern_roots(scale, gradescale, additional_grades, bgchord, bpm, repeat) {
	tick_bpm = bpm;
	tick_ms = 60 / tick_bpm * 1000;
	$("#infobox3").html(bpm + " beat bpm");
	$("#infobox4").html(tick_bpm + " tick bpm");
	let divnotes = scale_on_fret2fret(scale, gradescale);
	
	//let rootnotes = divnotes.filter(n => $(n).attr("note") === rootnote);
	let rootnotes = divnotes.filter(n => $(n).attr("grade") === "1" );
	let foundnotes;
	//let fithnotes = divnotes.filter(n => $(n).attr("grade") === "5" );
	//let fourthnotes = divnotes.filter(n => $(n).attr("grade") === "4" );
	//let r = Math.floor(Math.random() * 6); 
	//let randomnotes = divnotes.filter(n => $(n).attr("grade") === gradescale[r+1].toString() );
	//console.log("r", r+1);
	foundnotes = divnotes.filter(n => additional_grades.includes($(n).attr("grade")));

	foundnotes.forEach(note => {
		note.css('color', note.attr("gradecolor"));
		note.text("────" + note.attr("note") + "────");
	});

	rootnotes.forEach(note => {
		note.css('color', note.attr("gradecolor"));
		note.text("────" + note.attr("note") + "────");
	});
	/*fithnotes.forEach(note => {
		note.css('color', note.attr("gradecolor"));
		note.text("────" + note.attr("note") + "────");
	});
	fourthnotes.forEach(note => {
		note.css('color', note.attr("gradecolor"));
		note.text("────" + note.attr("note") + "────");
	})*/;

	let tdnotes = $(rootnotes).map(function() {
    	return $(this).closest('td').get(0);
	}).get();

	//console.log("tdnotes", tdnotes);
	tdnotes.sort((a, b) => {
		const colnA = parseInt($(a).attr("coln"), 10);
		const colnB = parseInt($(b).attr("coln"), 10);
		return colnA - colnB;
	});

	let selectednotes = [];
	
	tdnotes.forEach(note => {
		selectednotes.push(note);		
	});
	
	let divselectednotes = [];
	$($.map(selectednotes, function(el) { 
    	return $(el).children('div').first().get(0); 
	})).each(function() {
		divselectednotes.push($(this));
	});

	global_frettimeout = tick_ms;
	let seq = prepare_wseq_for_notes_up_down(divselectednotes);
	walk_seq_ntimes(seq, repeat);	
	timerWatch(calc_to_walkn(seq, repeat)/1000);
	set_gbgchord(bgchord);
	global_tickdiv = 1;
}

function schedule_pattern_roots_fifths(rootnote, fifthnote, bpm, repeat) {
	tick_bpm = bpm;
	tick_ms = 60 / tick_bpm * 1000;
	$("#infobox3").html(bpm + " beat bpm");
	$("#infobox4").html(tick_bpm + " tick bpm");
	let divnotes = scale_on_fret2fret(scaleDict[rootnote], maj_grades);
	
	//console.log("tdnotes", tdnotes);
	//let rootnotes = divnotes.find(n => $(n).attr("note") == rootnote );
	let rootnotes = divnotes.filter(n => $(n).attr("note") === rootnote || $(n).attr("note") === fifthnote);
	
	let tdnotes = $(rootnotes).map(function() {
    	return $(this).closest('td').get(0);
	}).get();

	console.log("tdnotes", tdnotes);
	tdnotes.sort((a, b) => {
		const colnA = parseInt($(a).attr("coln"), 10);
		const colnB = parseInt($(b).attr("coln"), 10);
		return colnA - colnB;
	});

	let selectednotes = [];
	
	tdnotes.forEach(note => {
		selectednotes.push(note);
		//selectednotes.push(note);
	});
	
	let divselectednotes = [];
	$($.map(selectednotes, function(el) { 
    	return $(el).children('div').first().get(0); 
	})).each(function() {
		divselectednotes.push($(this));
	});

	global_frettimeout = tick_ms;
	let seq = prepare_wseq_for_notes_up_down(divselectednotes);
	walk_seq_ntimes(seq, repeat);	
	timerWatch(calc_to_walkn(seq, repeat)/1000);
	set_gbgchord(rootnote);
	global_tickdiv = 1;
}

function schedule_practiceScaleRandomX(bpm, totalc, practiceFunction, scale, gradescale, fret1, fret2, string_from = 1, string_to = 6, timerWatch_duration = 0) {
	tick_bpm = 16 * bpm;
	tick_ms = 60 / tick_bpm * 1000;
	$("#infobox3").html(bpm + " beat bpm");
	$("#infobox4").html(tick_bpm / 2 + " tick bpm");
	const now = new Date();
	const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
	//console.log(formattedTime);
	//console.log;
	interval = 60 / bpm * 1000;
	global_frettimeout = interval;
	duration_ms = totalc * interval;
	let currentInterval = mysetInterval(practiceFunction, interval, scale, gradescale, fret1, fret2, string_from, string_to);
    //let currentInterval2 = mysetInterval(metronome_tick, interval);
	let currentInterval3 = mysetInterval(play_rpattern, interval, "I-I- -II- ---- ----", "", tick_ms);
	//let currentInterval3 = mysetInterval(play_rpattern, interval, "I--- I--- I--- I---", "", tick_ms);
	//let currentInterval3 = mysetInterval(play_rpattern, interval, "-II- I-II ---- ----", "", tick_ms);
	//let currentInterval3 = mysetInterval(play_rpattern, interval, "--II II-I ---- ----", "", tick_ms);
	//let currentInterval3 = mysetInterval(play_rpattern, interval, "I-I- I-I- ---- ----", "", tick_ms);
		
	if ( gradescale == empty_grades ) global_insert_rootnote_2nd = false;
	set_gbgchord(scale);
	stopinterval(currentInterval, duration_ms);
    //stopinterval(currentInterval2, duration_ms);
	stopinterval(currentInterval3, duration_ms);
	if ( timerWatch_duration == 0 ) {
		timerWatch(duration_ms/1000);
	} else if ( timerWatch_duration != -1){
		//console.log("call timerWatch(",timerWatch_duration, ")");
		timerWatch(timerWatch_duration);
	}	
}

function schedule_practice_ScaleRandomNote(bpm , duration, scale, gradescale, fret1, fret2, string_from = 1, string_to = 6) {
	set_gbgchord(scale);
	schedule_practiceScaleRandomX(bpm, duration, practice_ScaleRandomNote, scale, gradescale, fret1, fret2, string_from, string_to);
}

function schedule_practice_ScaleRandomPath(beatbpm , totalc, scale, gradescale, fret1, fret2, string_from = 1, string_to = 6, timerWatch_duration = 0) {
	set_gbgchord(scale);	
	tick_bpm = 32 * beatbpm;
	tick_ms = 60 / tick_bpm * 1000;
	$("#infobox3").html(beatbpm + " beat bpm");
	$("#infobox4").html(tick_bpm + " tick bpm");
	const now = new Date();
	const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
	interval = 60 / beatbpm * 1000;
	global_frettimeout = interval;
	duration_ms = totalc * interval;
	let currentInterval = mysetInterval(practice_ScaleRandomPath, interval, scale, gradescale, fret1, fret2, string_from, string_to);
    //let currentInterval2 = mysetInterval(metronome_tick, interval);
	let rpatterns = [
		"I--- I--- I--- I--- I--- I--- I--- I---",
		"-II- I-II -II- I-II I--- I--- I--- I---",
		"--II II-I --II II-I I--- I--- I--- I---"
	];

	//rpattern = rpatterns[Math.floor(Math.random() * rpatterns.length)];
	rpattern = rpatterns[0];

	//let currentInterval3 = mysetInterval(play_rpattern, interval, rpattern, "", tick_ms);  // -> egyenletes metronóm 0-s mintával
	//$("#infobox5").html(rpattern);
	if ( gradescale == empty_grades ) global_insert_rootnote_2nd = false;
	set_gbgchord(scale);
	stopinterval(currentInterval, duration_ms);
    //stopinterval(currentInterval2, duration_ms);
	//stopinterval(currentInterval3, duration_ms);
	if ( timerWatch_duration == 0 ) {
		timerWatch(duration_ms/1000);
	} else if ( timerWatch_duration != -1){
		timerWatch(timerWatch_duration);
	}	
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
	
	//console.log("----------------");
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

function set_gbgchord(scale) {
    global_bgchord = 0;
	// Map scale references to chord names
    const chordMap = new Map([
        [[Am, Amp, A, "A", "Am", "Amp"], "Am"],
        [[C, C_triad, Cp, "C", "Cp"], "C"],
        [[D, Dp, "D", "Dp"], "D"],
        [[Dm, Dmp, "Dm", "Dmp"], "Dm"],
        [[Diszm, Diszmp, "Diszm", "Diszmp"], "Diszm"],
        [[E, Ep, "E", "Ep"], "E"],
		[[Em, Emp, "Em", "Emp"], "Em"],
		[[H, Hp, "H", "Hp"], "H"],
        [[Em, Emp, "Em", "Emp"], "Em"],
        [[Ebm, Ebmp, "Ebm", "Ebmp"], "Ebm"],
        [[F, Fp, F_1_3_5_7, "F", "Fp"], "F"],
        [[Gb, Gb_special, Gb_triad, Gbp, "Gb", "Gbp"], "Gb"],
        [[G, Gp, "G", "Gp"], "G"],
        [[Fisz, Fiszp, "Fiszp", "Fisz"], "Gb"],
        [["flats"], "Gb"],
        [["sharps"], "Diszm"],
        [[Hm, Hmp, "Hm", "Hmp"], "Hm"]
    ]);

    //let found = false;
    for (const [keys, chord] of chordMap.entries()) {
        if (keys.some(k => k === scale)) {
            global_bgchord = chord;
            //found = true;
            break;
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
		if (global_display_done ) updateNoteText(lastnote, "done");
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

function updateNoteText(note, newcontent) {
	if (lastnote) {
			//lastnote.text(lastnotetext);			
			//lastnote.text("─────────");		ezt keresed!	
			lastnote.css("color", lastnotecolor);
			lastnote.css("background", lastnotebackground);
			lastnote_displayed(lastnote);
	}
	
	lastnote = note;		
	lastnotetext = note.text();
	lastnotebackground = note.css("background");
	
	lastnotecolor = note.css("color");
	//note.css("color", "red");
	//console.log("note.css('background')", note.css("background"));
	if (note.css("background") == "rgb(234, 234, 234)") {
		note.css("color", "white");
		note.css("background", "red");
	} else {
		// KÖVETÉS KIKAPCSOLVA !!!
		//note.css("color", "black");
		//note.css("background", "white");
	}
	content_x = 'X';
	
	if (newcontent == 'done') {
		note.text("───" + "done" + "───");    
	} else if (global_mode == 'test') {
		note.text("───" + content_x + "───");    
	} else if (global_mode == 'half') {
		note.text("───" + content_x + "───");    
		mysetTimeout(function() {
			note.text("───" + newcontent + "───");    
		}, global_frettimeout / 2);
	} else if (global_mode == 'learn') {
		note.text("───" + newcontent + "───");    
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
	$('#tr_fretnums').find('td').find('div').each(function(index) {
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

function schedule_noteupdate_and_play(note, delay, half_tick = global_half_tick, tickcounter, inhibit_bgchord = false) {
	mysetTimeout(function () {
		updateNoteText(note, note.attr('actual'), false);
		if (!half_tick || tickcounter % global_tickdiv === 0) {
			metronome_tick();
			play_by_conditions(tickcounter, inhibit_bgchord);
		}
		tickcounter++;		
	}, delay);
}

function play_by_conditions(tickcounter = 0, inhibit_bgchord = false) {
	if (global_bgchord && !inhibit_bgchord && tickcounter % global_beatdiv === 0) {
		play_chord(global_bgchord);
	}
}

function walk_seq_ntimes(notes, repeat = global_walking_repeat, half_tick = global_half_tick) {
	const period = global_frettimeout;
	const totalNotes = notes.length;
	/*const walkTime = reverse
		? period * (2 * totalNotes)
		: period * totalNotes;*/
	const walkTime = period * totalNotes;

	// Play intro notes
	for (let i = 0; i < global_introcount; i++) {
		schedule_noteupdate_and_play(notes[0], i * period, false, i, true);
	}
	tickcounter = 0;

	// Main walking loop
	for (let j = 0; j < repeat; j++) {
		mysetTimeout(() => {
			$('#infobox').html((global_walkcounter++) + '/' + repeat);

			notes.forEach((note, i) => {
				schedule_noteupdate_and_play(note, period + period * i, half_tick, i, false);				
			});		
			
			
			/*if (j % 2 == 0) {
				mysetTimeout(() => {
					notes.forEach(note => {
						note.attr('actual', note.attr('note'));
						note.text("───" + note.attr('actual') + "───");
					});
					lastnotetext = notes[0].text();
				}, period / 2);				
			} else {
				mysetTimeout(() => {
					notes.forEach(note => {
						note.attr('actual', note.attr('grade'));
						note.text("───" + note.attr('actual') + "───");
					});
					lastnotetext = notes[0].text();
				}, period / 2);
			}*/
			
		}, walkTime * j + (global_introcount - 1) * period);
	}
	global_walkcounter = 1;
}
