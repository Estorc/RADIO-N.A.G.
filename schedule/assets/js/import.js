function getRandomInt(max) {
  return Math.floor(Math.random() * max)+1;
}


$.getJSON("https://guillarda.ddns.net/api/week-info", function(json) {
	const maxEvent = 4;
	const week = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
	
	
	console.log(week)
	week.forEach(function(day) {
		console.log(day)
		json[day].forEach(function(element){
			
			let data_start = element.start_timestamp.substr(11, 5)
			let data_end = element.end_timestamp.substr(11, 5)
			let name = element.name;
			let description = element.description + element.instance_description;
			
			document.getElementById(`${day}`).innerHTML += 
			(`
				<li class="cd-schedule__event">
				  <a data-start="${data_start}" data-end="${data_end}" data-content="${description}" data-event="event-${getRandomInt(maxEvent)}" href="#0">
					<em class="cd-schedule__name">${name}</em>
				  </a>
				</li>
			`)
			
		});
	});
});