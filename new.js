let classes = [
  'hide',
  "degree0",
  "degree1",
  "degree2",
  "degree3",
  "degree4",
  "degree5",
  "degree6",
  "degree7",
  "degree8",
  "degree9",
  "degree10",
  "degree11"
];

let code2note = {
  "0": "C",
  "1": "C#",
  "2": "D",
  "3": "D#",
  "4": "E",
  "5": "F",
  "6": "F#",
  "7": "G",
  "8": "G#",
  "9": "A",
  "a": "A#",
  "b": "B"
};

let note2code = {
  "C": "0",
  "C#": "1",
  "D": "2",
  "D#": "3",
  "E": "4",
  "F": "5",
  "F#": "6",
  "G": "7",
  "G#": "8",
  "A": "9",
  "A#": "a",
  "B": "b"
};

let num2code = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "a",
  11: "b"
};

let code2num = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "a": 10,
  "b": 11,
};

function drawFretboard() {
  let e_show = document.getElementById("show");
  let show = e_show.options[e_show.selectedIndex].value;

  let e_key = document.getElementById("key");
  let key = e_key.options[e_key.selectedIndex].value;
  let keyname = e_key.options[e_key.selectedIndex].innerHTML;

  let e_tuning = document.getElementById("tuning");
  let tuning = e_tuning.options[e_tuning.selectedIndex].value;
  let tname = e_tuning.options[e_tuning.selectedIndex].innerHTML;

  let field_chord = document.getElementById("chorddiv");
  let field_scale = document.getElementById("scalediv");
  let field_interval = document.getElementById("intdiv");

  field_chord.classList.remove("hide");
  field_scale.classList.remove("hide");
  field_interval.classList.remove("hide");

  let e_scale = document.getElementById("scale");
  let e_chord = document.getElementById("chord");

  let chord = '';
  let cname = '';
  let interval = [];
  let scale = '';
  let sname = '';
  let notes = [];
  let title = '';

  if (show === 'scale') {
    field_chord.classList.add("hide");
    field_interval.classList.add("hide");
    scale = e_scale.options[e_scale.selectedIndex].value;
    sname = e_scale.options[e_scale.selectedIndex].innerHTML;
    notes = scale.split(/ /);
    title = ['Scale:', sname, 'Key:', keyname, 'Tuning:', tname].join(' ');
  } else if (show === 'chord') {
    field_scale.classList.add("hide");
    field_interval.classList.add("hide");
    chord = e_chord.options[e_chord.selectedIndex].value;
    cname = e_chord.options[e_chord.selectedIndex].innerHTML;
    notes = chord.split(/ /);
    title = ['Chord:', cname, 'Key:', keyname, 'Tuning:', tname].join(' ');
  } else if (show === 'interval') {
    field_chord.classList.add("hide");
    field_scale.classList.add("hide");
    // handle intervals
  } else {
    field_chord.classList.remove("hide");
    field_scale.classList.remove("hide");
    field_interval.classList.remove("hide");
    title = 'NONE';
  }

  let telem = document.getElementById("title");
  telem.innerHTML = title;

  let notes_list = document.getElementById("notes_list");
  notes_list.innerHTML = '';
  for (let n in notes) {
    let degree = parseInt(notes[n]) % 12;
    let keyint = code2num[key];
    let num = (keyint + degree) % 12;
    let code = num2code[num];
    let note = code2note[code];
    let elem = document.createElement("div");
      elem.innerText = note;
      elem.classList.add('degree', 'degree'+degree );
    notes_list.appendChild(elem);

  }

  let notess = notes.join(" ");
  for (let s = 0; s < 6; s++) {
    let t = 5 - s;
    drawString(t, tuning.substr(s, 1), parseInt(key), notess);
  }
}

function drawString(s, open, key, notes) {
  let notes_arr = notes.split(' ');
  let notes_obj = {};
  let scale_obj = {};
  for (let n in notes_arr) {
    let degree = parseInt(notes_arr[n]) % 12;
    let num = (key + parseInt(notes_arr[n])) % 12;
    let code = num2code[num];
    notes_obj[num] = code;
    scale_obj[code] = degree;
  }

  let string = 'string' + s;
  let n = code2num[open];
  for (let i = 0; i <= 24; i++) {
    let num = (i + n) % 12;
    let code = num2code[num];
    let note = code2note[code];
    let fret = 'fret' + i;
    let id = string + fret;
    let degree = scale_obj[code];
    let degreename = 'degree' + degree;
    let elem = document.getElementById(id);

    for (let c in classes) {
      let clas = classes[c];
      elem.classList.remove(clas);
    }

    if (notes_obj[num]) {
      elem.classList.add(degreename);
    } else {
      elem.classList.add('hide');
    }
  }
}
