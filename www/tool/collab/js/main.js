var editor = ace.edit("textEditor");
editor.session.setMode("ace/mode/markdown");
editor.commands.addCommand({
	Name : "testCommand",
	bindKey: {
		win : "Ctrl-A",
		mac : "Command-A"
	},
	exec: 
		function(editor) {
			alert("A")
			// onSaveFile();
		}
	}
);

var viewer = document.getElementById('viewer');
viewer.innerHTML = marked(editor.getValue());
editor.getSession().on("change" , function(e){
        viewer.innerHTML = marked(editor.getValue());
});