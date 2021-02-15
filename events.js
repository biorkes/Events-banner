function BannerEvent(from, to, bg, logo) {
	
	var styles =
		"html,body,ul { margin: 0; padding: 0; }.event-banner ul { list-style: none; } .event-banner ul { list-style: none } .event-banner img { display: block; max-width: 100%; height: auto; margin: 0; padding: 0 } .event-banner { background: url(" +
		bg +
		") no-repeat center center; background-size: cover; padding: 10px; position: relative; z-index: 999999; } .event-banner-content { width: 100%; max-width: 1200px; margin: 0 auto } .event-banner-list { display: flex; justify-content: center; align-items: center; margin: -10px } .event-banner-item { padding: 0; } .event-banner-date .event-banner-item{ padding:10px; } .event-banner-date { font-family: sans-serif; display: inline-block; font-size: 26px; font-weight: 700; text-transform: uppercase; padding: 12px 16px; background-color: #eeca20; color: #141213; transform: skew(-14deg) } .event-banner-date-text { display: inline-block; white-space: nowrap; transform: skew(14deg) } @media only screen and (max-width:640px) { .event-banner-date { font-size: 22px; padding: 10px 14px } .event-banner-date .event-banner-item { padding: 0; } } @media only screen and (max-width:480px) { .event-banner-list { flex-wrap: wrap } .event-banner-date, .event-banner-date-text { transform: skew(0); } .event-banner-date{ width: 100%; text-align: center; } }";

	var styleEle = document.createElement("style");
	styleEle.rel = "stylesheet";
	styleEle.type = "text/css";
	styleEle.innerHTML = styles;
	document.head.append(styleEle);

	var banner = document.createElement("div");
	banner.classList.add("event-banner");

	var bannerContent = document.createElement("div");
	bannerContent.classList.add("event-banner-content");

	var bannerList = document.createElement("ul");
	bannerList.classList.add("event-banner-list");

	var bannerItemImage = document.createElement("li");
	bannerItemImage.classList.add("event-banner-item");

	var bannerImage = document.createElement("img");
	bannerImage.setAttribute("src", logo);

	var bannerItemDate = document.createElement("li");
	bannerItemDate.classList.add("event-banner-item");

	var bannerDateDiv = document.createElement("div");
	bannerDateDiv.classList.add("event-banner-date");

	var bannerDate = document.createElement("span");
	bannerDate.classList.add("event-banner-date-text");
	bannerDate.innerHTML = from + " - " + to;

	// li
	bannerItemImage.append(bannerImage);
	bannerItemDate.append(bannerDate);
	// li
	bannerDateDiv.append(bannerItemDate);

	// ul
	bannerList.append(bannerItemImage);
	bannerList.append(bannerDateDiv);
	// ul

	bannerContent.append(bannerList);
	banner.append(bannerContent);

	// var firstChild = document.body.firstChild;
	// firstChild.parentNode.insertBefore(banner, firstChild);

	if (document.querySelectorAll(".site").length) {
		document.querySelectorAll(".site")[0].prepend(banner);
	} else {
		document.body.prepend(banner);
	}
}

var todayDate = new Date();
var theEventStartDate, theEventEndDate;

var events = {
	blackFriday: {
		startDate: todayDate.getFullYear() + "-11-16",
		startTime: "00:00:00",
		endDate: todayDate.getFullYear() + "-11-27",
		endTime: "23:59:59",
		img: {
			logo:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/black-friday/logo.jpg",
			bg:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/black-friday/bf-bg.jpg",
		},
	},
	cyberMonday: {
		startDate: todayDate.getFullYear() + "-11-28",
		startTime: "00:00:00",
		endDate: todayDate.getFullYear() + "-12-05",
		endTime: "23:59:59",
		img: {
			logo:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/cyber-monday/cyber-monday.png",
			bg:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/cyber-monday/cyber-monday-bg.jpg",
		},
	},
	christmasPromo: {
		startDate: todayDate.getFullYear() + "-12-06",
		startTime: "00:00:00",
		endDate: todayDate.getFullYear() + 1 + "-01-10",
		endTime: "23:59:59",
		img: {
			logo:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/christmas/christmas-logo.png",
			bg:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/christmas/christmas-bg.jpg",
		},
	},
};

/**
 * Add leading zero infront of the month
 * @param  {int} n month number
 * @return {string}
 */
function pad(n) {
	return n < 10 ? "0" + n : n;
}

for (var event in events) {
	var theEventStartDate = new Date(
		events[event].startDate + "T" + events[event].startTime + "Z"
	);
	var theEventEndDate = new Date(
		events[event].endDate + "T" + events[event].endTime + "Z"
	);

	if (todayDate >= theEventStartDate && theEventEndDate > todayDate) {
		var dateStarts = new Date(events[event].startDate);
		var dateEnds = new Date(events[event].endDate);
		var from = dateStarts.getDate() + "." + pad(dateStarts.getMonth() + 1);
		var to = dateEnds.getDate() + "." + pad(dateEnds.getMonth() + 1);

		BannerEvent(from, to, events[event].img.bg, events[event].img.logo);
	}
}
