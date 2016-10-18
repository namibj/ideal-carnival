/**
 * Created by Merlin on 18.10.2016.
 */
"use strict";
var base92_string = " !#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~";
function expandDefinition(deck) {
    var note_model_old_id = deck.note_models.find(function (x) {
        return x.name === "Alma Definition";
    }).crowdanki_uuid;
    var note_model_new_id = deck.note_models.find(function (x) {
        return x.name === "Alma Definition";
    }).crowdanki_uuid;
    var notes = deck.notes;
    var len = notes.length;
    for (i = 0; i < len; i += 1) {
        if (notes[i].note_model_uuid != note_model_old_id) continue;//only work on notes of specific type
        var note = JSON.parse(JSON.stringify(notes[i])); // "deep" copy
        notes[i].fields[0] = notes[i].fields[0].replace(/\{\{c1::[^}]*\}\}/, "{{c1::" + notes[i].fields[1] + "}}");
        note.note_model_uuid = note_model_new_id;
        var regex = /\{\{c\d+::([^}]*)\}\}/g;
        note.fields[0].replace(regex, "$1");
        note.guid[0] = base92_string[(base92_string.indexOf(note.guid[0]) + 1) % 92];
        notes.push(note);
    }
}