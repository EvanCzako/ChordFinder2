type AudioGlobals = {
	audioCtx: AudioContext,
	gainNodes: GainNode[],
	oscs: OscillatorNode[],
	lpFilter?: BiquadFilterNode,
	volume: number
}

type FreqKeyMap = {
	[key: string]: number
}

let audioObjs: AudioGlobals = {
	audioCtx: new AudioContext(),
	gainNodes: [],
	oscs: [],
	lpFilter: undefined,
	volume: 100
}

const keyArrSharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const keyArrFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const keyArr = keyArrFlats;

const freqMap: FreqKeyMap = {
	"C3":  130.81,
	"C#3":  138.59,
	"D3":  146.83,
	"D#3":  155.56,
	"E3":  164.81,
	"F3":  174.61,
	"F#3":  185.00,
	"G3":  196.00,
	"G#3":  207.65,
	"A3":  220.00,
	"A#3":  233.08,
	"B3":  246.94,
	"C4":  261.63,
	"C#4":  277.18,
	"D4":  293.66,
	"D#4":  311.13,
	"E4":  329.63,
	"F4":  349.23,
	"F#4":  369.99,
	"G4":  392.00,
	"G#4":  415.30,
	"A4":  440.00,
	"A#4":  466.16,
	"B4":  493.88,
	"C5":  523.25,
	"C#5":  554.37,
	"D5":  587.33,
	"D#5":  622.25,
	"E5":  659.26,
	"F5":  698.46,
	"F#5":  739.99,
	"G5":  783.99,
	"G#5":  830.61,
	"A5":  880.00,
	"A#5":  932.33,
	"B5":  987.77,
	"C6": 1046.50,
}

let allChordSets;

// All courtesy of ME, yo. You're welcome. - Evan Czako

const getAllChordSets = () => {
    
	// Quick Memoization

	if (allChordSets){
		return allChordSets;
	}

	//   ### Power Chord ###

    let powerChordSet = {
		set: new Set([0,7]),
		name: "Power"
	};

	let powerTypes = [
		powerChordSet
	];

	    //   ### Major Chords ###

    let majSet = {
        set: new Set([0,4]),
        name: "Maj"
    };
    let maj7Set = {
        set: new Set([0, 4, 11]),
        name: "Maj7"
    };
    let maj9Set = {
        set: new Set([0, 4, 11, 2]),
        name: "Maj9"
    };
    let maj11Set = {
        set: new Set([0, 4, 11, 2, 5]),
        name: "Maj11"
    };
    let maj13Set = {
        set: new Set([0, 4, 11, 2, 5, 9]),
        name: "Maj13"
    };
    let majAdd9Set = {
        set: new Set([0, 4, 2]),
        name: "MajAdd9"
    };
    let majAdd11Set = {
        set: new Set([0, 4, 5]),
        name: "MajAdd11"
    };
    let maj6Set = {
        set: new Set([0, 4, 9]),
        name: "Maj6"
    };
    let majAdd9Add11Set = {
        set: new Set([0, 4, 2, 5]),
        name: "MajAdd9Add11"
    };
    let sixNineSet = {
        set: new Set([0, 4, 2, 9]),
        name: "Maj69"
    };
    let majAdd11Add13Set = {
        set: new Set([0, 4, 5, 9]),
        name: "MajAdd11Add13"
    };
    let majAdd9Add11Add13Set = {
        set: new Set([0, 4, 2, 5, 9]),
        name: "MajAdd9Add11Add13"
    };
    let maj9Add13Set = {
        set: new Set([0, 4, 11, 2, 9]),
        name: "Maj9Add13"
    };
    let maj7Add13Set = {
        set: new Set([0, 4, 11, 9]),
        name: "Maj7Add13"
    };
    
    let majTypes = [
        majSet,
        maj7Set,
        maj9Set,
        maj11Set,
        maj13Set,
        majAdd9Set,
        majAdd11Set,
        maj6Set,
        majAdd9Add11Set,
        sixNineSet,
        majAdd11Add13Set,
        majAdd9Add11Add13Set,
        maj9Add13Set,
        maj7Add13Set
    ];

    //   ### Minor Chords ###

    let minSet = {
        set: new Set([0, 3]),
        name: "min"
    };
    let min6Set = {
        set: new Set([0, 3, 9]),
        name: "min6"
    };
    let min7Set = {
        set: new Set([0, 3, 10]),
        name: "min7"
    };
    let min9Set = {
        set: new Set([0, 3, 10, 2]),
        name: "min9"
    };
    let min11Set = {
        set: new Set([0, 3, 10, 2, 5]),
        name: "min11"
    };
    let min13Set = {
        set: new Set([0, 3, 10, 2, 5, 9]),
        name: "min13"
    };
    let minAdd9Set = {
        set: new Set([0, 3, 2]),
        name: "minAdd9"
    };
    let minAdd11Set = {
        set: new Set([0, 3, 5]),
        name: "minAdd11"
    };
    let minAdd9Add11Set = {
        set: new Set([0, 3, 2, 5]),
        name: "minAdd9Add11"
    };
    let min6Add9Set = {
        set: new Set([0, 3, 2, 9]),
        name: "min6Add9"
    };
    let minAdd9Add11Add13Set = {
        set: new Set([0, 3, 2, 5, 9]),
        name: "minAdd9Add11Add13"
    };
    let min7Add11Set = {
        set: new Set([0, 3, 10, 5]),
        name: "min7Add11"
    };

    let minTypes = [
        minSet,
        min6Set,
        min7Set,
        min9Set,
        min11Set,
        min13Set,
        minAdd9Set,
        minAdd11Set,
        minAdd9Add11Set,
        min6Add9Set,
        minAdd9Add11Add13Set,
        min7Add11Set,
    ];

    // ### Dominant Chords ###

    let dom7Set = {
        set: new Set([0, 4, 10]),
        name: "(Dom)7"
    };
    let dom9Set = {
        set: new Set([0, 4, 10, 2]),
        name: "(Dom)9"
    };
    let dom11Set = {
        set: new Set([0, 4, 10, 2, 5]),
        name: "(Dom)11"
    };
    let dom13Set = {
        set: new Set([0, 4, 10, 2, 5, 9]),
        name: "(Dom)13"
    };
    let dom7b9Set = {
        set: new Set([0, 4, 10, 1]),
        name: "(Dom)7b9"
    };
    let dom7Sharp9Set = {
        set: new Set([0, 4, 10, 3]),
        name: "(Dom)7#9"
    };
    let dom7b5Set = {
        set: new Set([0, 4, 10, 6]),
        name: "(Dom)7b5"
    };
    let dom7b13Set = {
        set: new Set([0, 4, 10, 8]),
        name: "(Dom)7b13"
    };
    let dom9b5Set = {
        set: new Set([0, 4, 10, 2, 6]),
        name: "(Dom)9b5"
    };
    let alteredSet = {
        set: new Set([0, 4, 10, 1, 3, 6, 8]),
        name: "Alt"
    };

    let domTypes = [
        dom7Set,
        dom9Set,
        dom11Set,
        dom13Set,
        dom7b9Set,
        dom7Sharp9Set,
        dom7b5Set,
        dom7b13Set,
        dom9b5Set,
        alteredSet,
    ];

    // ### Sus Chords ###

    let sus4Set = {
        set: new Set([0, 5]),
        name: "sus4"
    };
    let sus2Set = {
        set: new Set([0, 2]),
        name: "sus2"
    };
    let sus2sus4Set = {
        set: new Set([0, 2, 5]),
        name: "sus2sus4"
    };
    let dom7sus4Set = {
        set: new Set([0, 5, 10]),
        name: "(Dom)7sus4"
    };
    let dom7sus2Set = {
        set: new Set([0, 2, 10]),
        name: "(Dom)7sus2"
    };
    let dom9Sus4Set = {
        set: new Set([0, 5, 10, 2]),
        name: "(Dom)9sus4"
    };
    let dom7b9SusSet = {
        set: new Set([0, 5, 10, 1]),
        name: "(Dom)7b9sus"
    };
    let sus13Set = {
        set: new Set([0, 10, 2, 5, 9]),
        name: "sus13"
    };
    let sus13b9Set = {
        set: new Set([0, 10, 1, 5, 9]),
        name: "sus13b9"
    };
    let sus4b9Set = {
        set: new Set([0, 5, 1]),
        name: "sus4b9"
    };

    let susTypes = [
        sus4Set,
        sus2Set,
        sus2sus4Set,
        dom7sus4Set,
        dom7sus2Set,
        dom9Sus4Set,
        dom7b9SusSet,
        sus13Set,
        sus13b9Set,
        sus4b9Set
    ];

    // ### Dim Chords ###

    let dimSet = {
        set: new Set([0, 3, 6]),
        name: "dim"
    };
    let halfDimSet = {
        set: new Set([0, 3, 6, 10]),
        name: "halfDim"
    };
    let fullDimSet = {
        set: new Set([0, 3, 6, 9]),
        name: "fullDim"
    };

    let dimTypes = [
        dimSet,
        halfDimSet,
        fullDimSet,
    ];

    // ### MinMaj Chords ###


    let minMajSet = {
        set: new Set([0, 3, 11]),
        name: "minMaj"
    };
    let minMaj9Set = {
        set: new Set([0, 3, 11, 2]),
        name: "minMaj9"
    };
    let minMaj9b13Set = {
        set: new Set([0, 3, 11, 2, 8]),
        name: "minMaj9b13"
    };

    let minMajTypes = [
        minMajSet,
        minMaj9Set,
        minMaj9b13Set,
    ];

    // ### Aug Chords ###

    let augSet = {
        set: new Set([0, 4, 8]),
        name: "Aug"
    };
    let aug7Set = {
        set: new Set([0, 4, 8, 10]),
        name: "Aug7"
    };
    let augMaj7Set = {
        set: new Set([0, 4, 8, 11]),
        name: "AugMaj7"
    };

    let augTypes = [
        augSet,
        aug7Set,
        augMaj7Set,
    ];

    // ### b5 and #11 Chords ###

    let majb5Set = {
        set: new Set([0, 4, 6]),
        name: "Majb5"
    };
    let maj7b5Set = {
        set: new Set([0, 4, 6, 11]),
        name: "Maj7b5"
    };
    let maj9b5Set = {
        set: new Set([0, 4, 6, 11, 2]),
        name: "Maj9b5"
    };
    let maj7AddSharp11Set = {
        set: new Set([0, 4, 7, 11, 6]),
        name: "Maj7Add#11"
    };
    let maj9AddSharp11Set = {
        set: new Set([0, 4, 7, 11, 2, 6]),
        name: "Maj9Add#11"
    };
    let maj13Sharp11Set = {
        set: new Set([0, 4, 7, 11, 2, 6, 9]),
        name: "Maj13#11Set"
    };
    let majAddSharp11Set = {
        set: new Set([0, 4, 7, 6]),
        name: "MajAdd#11"
    };

    let otherTypes = [
        majb5Set,
        maj7b5Set,
        maj9b5Set,
        maj7AddSharp11Set,
        maj9AddSharp11Set,
        maj13Sharp11Set,
        majAddSharp11Set,
    ];

	return {
		powerTypes,
		majTypes,
		minTypes,
		domTypes,
		susTypes,
		augTypes,
		minMajTypes,
		dimTypes,
		otherTypes
	}

}

const notesSharps = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const notesFlats = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

const initFilters: () => void = () => {
    audioObjs.lpFilter = audioObjs.audioCtx.createBiquadFilter();
    audioObjs.lpFilter.type = 'lowpass';
    audioObjs.lpFilter.frequency.value = 800;
    audioObjs.lpFilter.Q.value = 5;
    audioObjs.lpFilter.connect(audioObjs.audioCtx.destination);
};

const clearAudioNodes: () => void = () => {
	audioObjs.gainNodes.forEach((gainNode: GainNode) => {
		gainNode.disconnect();
	});
	audioObjs.gainNodes = [];
	audioObjs.oscs.forEach((oscNode: OscillatorNode) => {
		oscNode.disconnect();
	})
	audioObjs.oscs = [];
}

const refreshAudio = (keysPressed: string[], volume: number, muted: boolean) => {

	initFilters();
	clearAudioNodes();

	for (let i = 0; i < keysPressed.length; i += 1){
        let gainNode = audioObjs.audioCtx.createGain();
        audioObjs.gainNodes.push(gainNode);
        gainNode.gain.value = 0;
        gainNode.connect(audioObjs.lpFilter as BiquadFilterNode);
        let osc  =  audioObjs.audioCtx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = freqMap[keysPressed[i]];
        osc.connect(gainNode);
        osc.start();
        audioObjs.oscs.push(osc);
    }

	const muteFactor = muted ? 0 : 1;
	for (let i = 0; i < keysPressed.length; i += 1) {
		audioObjs.gainNodes[i].gain.value = muteFactor*volume*0.7/(keysPressed.length+1);
	}
}

function refreshVolume(newVolume: number, muted: boolean){
	const muteFactor = muted ? 0 : 1;
	for (let i = 0; i < audioObjs.gainNodes.length; i += 1) {
		audioObjs.gainNodes[i].gain.value = muteFactor*newVolume*0.7/(audioObjs.gainNodes.length+1);
	}
}



function getChordInfo(chordNotes: string[], flats: boolean = false): {
	possibleChords: string[],
	mostLikely?: string
} {
    
	const allChords = getAllChordSets();

    let notesArr;
    if(flats){
        notesArr = notesFlats;
    } else {
        notesArr = notesSharps;
    }

	chordNotes = sortNotesArr(chordNotes).map((noteWithOctave: string) => {
		if(flats){
			return getFlatFromSharpNoOctave(noteWithOctave.slice(0, noteWithOctave.length-1));
		} else {
			return noteWithOctave.slice(0, noteWithOctave.length-1);
		}
		
	});

	const lowNote = chordNotes[0];

    let possibleChords: string[] = [];

    let chordNotesIndices: Set<number> = new Set();

    for(let i = 0; i < chordNotes.length; i += 1){
        let note = chordNotes[i];
        if(notesSharps.includes(note)){
            chordNotesIndices.add(notesSharps.indexOf(note));
        } else if (notesFlats.includes(note)){
            chordNotesIndices.add(notesFlats.indexOf(note));
        }
    }

    let checkList = Array.from(chordNotesIndices);
    let tempSet;

    for(let k = 0; k < 12; k += 1){

        tempSet = new Set();
        for(let i = 0; i < checkList.length; i += 1){
            tempSet.add((checkList[i]+k)%12);
        }
        tempSet.delete(7);
        for(let i = 0; i < allChords.powerTypes.length; i += 1){
            if (eqSet(tempSet, allChords.powerTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${allChords.powerTypes[i].name}`);
            }
        }

        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for(let i = 0; i < allChords.majTypes.length; i += 1){
            if (eqSet(tempSet, allChords.majTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${allChords.majTypes[i].name}`);
            }
        }

        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < allChords.minTypes.length; i += 1) {
            if (eqSet(tempSet, allChords.minTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${allChords.minTypes[i].name}`);
            }
        }

        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < allChords.domTypes.length; i += 1) {
            if (eqSet(tempSet, allChords.domTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${allChords.domTypes[i].name}`);
            }
        }

        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < allChords.susTypes.length; i += 1) {
            if (eqSet(tempSet, allChords.susTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${allChords.susTypes[i].name}`);
            }
        }

        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < allChords.dimTypes.length; i += 1) {
            if (eqSet(tempSet, allChords.dimTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${allChords.dimTypes[i].name}`);
            }
        }

        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < allChords.minMajTypes.length; i += 1) {
            if (eqSet(tempSet, allChords.minMajTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${allChords.minMajTypes[i].name}`);
            }
        }
 
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < allChords.augTypes.length; i += 1) {
            if (eqSet(tempSet, allChords.augTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${allChords.augTypes[i].name}`);
            }
        }

        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < allChords.otherTypes.length; i += 1) {
            if (eqSet(tempSet, allChords.otherTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${allChords.otherTypes[i].name}`);
            }
        }
    }

    let mostLikely;
    
    if(possibleChords.length === 1){
        mostLikely = possibleChords[0];
        possibleChords = [];
    } else if(lowNote){
        for(let i = 0; i < possibleChords.length; i += 1){
            if(lowNote===possibleChords[i].slice(0,lowNote.length)){
                mostLikely = possibleChords[i];
                possibleChords = possibleChords.slice(0,i).concat(possibleChords.slice(i+1,possibleChords.length));
                break;
            }
        }
    }

    return {
        possibleChords,
        mostLikely,
    }
}

function eqSet(xs: any, ys: any){
    return xs.size === ys.size &&
        [...xs].every((x) => ys.has(x));
}

function getFlatFromSharp(note: string): string {
    return keyArrFlats[keyArrSharps.indexOf(note.slice(0,note.length-1))] + note[note.length-1];
}

function getFlatFromSharpNoOctave(note: string): string {
	return keyArrFlats[keyArrSharps.indexOf(note)];
}

function sortNotesArr(notesArr: string[]): string[] {
    if(notesArr.length <= 1){
        return [...notesArr];
    }
    let midpoint = Math.floor(notesArr.length/2);
    let left = notesArr.slice(0,midpoint);
    let right = notesArr.slice(midpoint,notesArr.length);
    return mergeSortedArrays(sortNotesArr(left),sortNotesArr(right),noteCompare);
}

function noteCompare(note1: string, note2: string){
    // Returns 1 if note2 is higher (up to octave 9)
    let octave1 = parseInt(note1.slice(note1.length - 1, note1.length));
    let octave2 = parseInt(note2.slice(note2.length - 1, note2.length));
    if (octave1 < octave2){
        return 1;
    } else if (octave1 > octave2){
        return -1;
    } else {
        if (keyArr.indexOf(note1.slice(0, note1.length - 1)) < keyArr.indexOf(note2.slice(0, note2.length - 1))){
            return 1;
        } else if (keyArr.indexOf(note1.slice(0, note1.length - 1)) > keyArr.indexOf(note2.slice(0, note2.length - 1))) {
            return -1;
        } else {
            return 0;
        }
    }
}

function mergeSortedArrays(arr1: any, arr2: any, compFunc: any){
    let merged = [];
    while(arr1.length > 0 && arr2.length > 0){
        if(compFunc(arr1[0],arr2[0]) === 1){
            merged.push(arr1.shift());
        } else {
            merged.push(arr2.shift());
        }
    }
    return merged.concat(arr1).concat(arr2);
}

export {
	refreshAudio,
	refreshVolume,
	getChordInfo,
	getFlatFromSharp
}