function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getCaption(obj, lang) {
	if (!obj) {
		console.log("Object for element with id=" + elemid + " is undefined");
		return 'undefined';
	}
	
	if (obj[lang])
		return obj[lang];
	else if (obj["en"])
		return obj['en'];
	return 'undefined';
}

function initCaption(elemid, obj, lang) {
	var el = document.getElementById(elemid);
	if (!el) {
		console.log("Element with id=" + elemid + " did not found");
		return;
	}
	el.innerHTML = getCaption(obj, lang);
};

function getLang() {
	var lang = getParameterByName("lang");
	if (lang != "ru" && lang != "en")
		lang = "en";
	return lang;
}

function init() {
	var lang = getLang();
	initCaption('menu_projects', data.projects.caption, lang);
	initCaption('menu_skills', data.skills.caption, lang);
	initCaption('menu_contacts', data.contacts.caption, lang);
	initCaption('content', data.content.text, lang);
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function validateUrl(url) {
    var re = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/i;
    return re.test(url);
}

function openContacts() {
	var lang = getLang();
	var el = document.getElementById('content');
	var content = '<strong>' + getCaption(data.contacts.caption, lang) + '</strong><br></br></br>';

	var values = data.contacts.values;
	for(var index in values) { 
		if (values.hasOwnProperty(index)) {
			var val = values[index];
			if (validateEmail(val))
				content += index + ': <a href="mailto:' + val + '">' + val + '</a></br></br>';
			else if (validateUrl(val))
				content += index + ': <a target="_blank" href="' + val + '">' + val + '</a></br></br>';
			else
				content += index + ": " + val + "</br></br>";
		}
	}
	el.innerHTML = content;
}

function openProjects() {
	var lang = getLang();
	var el = document.getElementById('content');
	var content = '<strong>' + getCaption(data.projects.caption, lang) + '</strong><br></br></br>';

	el.innerHTML = content;
}

function openSkills() {
	var lang = getLang();
	var el = document.getElementById('content');
	var content = '<strong>' + getCaption(data.skills.caption, lang) + '</strong><br></br></br>';

	el.innerHTML = content;
}
