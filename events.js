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

/**
 * Add leading zero infront of the month
 * @param  {int} n month number
 * @return {string}
 */
function pad(n) {
	return n < 10 ? "0" + n : n;
}

/**
 * Format date as YYYY-MM-DD
 * @param  {Date} date
 * @return {string}
 */
function formatDate(date) {
	var year = date.getFullYear();
	var month = pad(date.getMonth() + 1);
	var day = pad(date.getDate());
	return year + "-" + month + "-" + day;
}

/**
 * Calculate the 4th Thursday of November for a given year
 * @param  {int} year
 * @return {Date}
 */
function getThanksgiving(year) {
	// Start with November 1st
	var date = new Date(year, 10, 1); // Month 10 = November (0-indexed)
	// Get the day of week for November 1st (0 = Sunday, 4 = Thursday)
	var firstDay = date.getDay();
	// Calculate days to add to get to the first Thursday
	// If Nov 1 is Thursday (4), add 0 days
	// If Nov 1 is Friday (5), add 6 days to get to next Thursday
	// If Nov 1 is Saturday (6), add 5 days
	// If Nov 1 is Sunday (0), add 4 days
	// If Nov 1 is Monday (1), add 3 days
	// If Nov 1 is Tuesday (2), add 2 days
	// If Nov 1 is Wednesday (3), add 1 day
	var daysToFirstThursday = (4 - firstDay + 7) % 7;
	// Add 21 days to get to the 4th Thursday (3 weeks = 21 days)
	date.setDate(date.getDate() + daysToFirstThursday + 21);
	return date;
}

/**
 * Calculate Black Friday (day after Thanksgiving)
 * @param  {int} year
 * @return {Date}
 */
function getBlackFriday(year) {
	var thanksgiving = getThanksgiving(year);
	var blackFriday = new Date(thanksgiving);
	blackFriday.setDate(blackFriday.getDate() + 1);
	return blackFriday;
}

/**
 * Get Monday of the week containing a given date
 * @param  {Date} date
 * @return {Date}
 */
function getMondayOfWeek(date) {
	var monday = new Date(date);
	var day = monday.getDay(); // 0 = Sunday, 1 = Monday, etc.
	var diff = day === 0 ? -6 : 1 - day; // Days to subtract to get to Monday
	monday.setDate(monday.getDate() + diff);
	monday.setHours(0, 0, 0, 0);
	return monday;
}

/**
 * Get Sunday of the week containing a given date
 * @param  {Date} date
 * @return {Date}
 */
function getSundayOfWeek(date) {
	var sunday = new Date(date);
	var day = sunday.getDay(); // 0 = Sunday, 1 = Monday, etc.
	var diff = day === 0 ? 0 : 7 - day; // Days to add to get to Sunday
	sunday.setDate(sunday.getDate() + diff);
	sunday.setHours(23, 59, 59, 999);
	return sunday;
}

/**
 * Calculate Cyber Monday (first Monday after Black Friday)
 * @param  {int} year
 * @return {Date}
 */
function getCyberMonday(year) {
	var blackFriday = getBlackFriday(year);
	var cyberMonday = new Date(blackFriday);
	// Black Friday is Friday (day 5), so add 3 days to get to Monday
	cyberMonday.setDate(blackFriday.getDate() + 3);
	cyberMonday.setHours(0, 0, 0, 0);
	return cyberMonday;
}

// Calculate dates for current year
var currentYear = todayDate.getFullYear();
var blackFriday = getBlackFriday(currentYear);
var blackWeekMonday = getMondayOfWeek(blackFriday);
var blackWeekSunday = getSundayOfWeek(blackFriday);
var cyberMonday = getCyberMonday(currentYear);
var cyberWeekMonday = getMondayOfWeek(cyberMonday);
var cyberWeekSunday = getSundayOfWeek(cyberMonday);

var events = {
	blackFriday: {
		startDate: formatDate(blackWeekMonday),
		startTime: "00:00:00",
		endDate: formatDate(blackWeekSunday),
		endTime: "23:59:59",
		img: {
			logo:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/black-friday/logo.jpg",
			bg:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/black-friday/bf-bg.jpg",
		},
	},
	cyberMonday: {
		startDate: formatDate(cyberWeekMonday),
		startTime: "00:00:00",
		endDate: formatDate(cyberWeekSunday),
		endTime: "23:59:59",
		img: {
			logo:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/cyber-monday/cyber-monday.png",
			bg:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/cyber-monday/cyber-monday-bg.jpg",
		},
	},
	christmasPromo: {
		startDate: currentYear + "-12-01",
		startTime: "00:00:00",
		endDate: currentYear + "-12-28",
		endTime: "23:59:59",
		img: {
			logo:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/christmas/christmas-logo.png",
			bg:
				"https://raw.githubusercontent.com/biorkes/Events-banner/master/christmas/christmas-bg.jpg",
		},
	},
};

// Check events in priority order and show only the first matching banner
// Priority: Black Friday > Cyber Monday > Christmas
var eventOrder = ['blackFriday', 'cyberMonday', 'christmasPromo'];

for (var i = 0; i < eventOrder.length; i++) {
	var event = eventOrder[i];
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
		break; // Only show one banner at a time
	}
}
