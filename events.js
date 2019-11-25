function Event(from, to, bg, logo) {

    var styles = 'html,body,ul { margin: 0; padding: 0; } .black-friday-banner ul { list-style: none; } .black-friday-banner ul { list-style: none } .black-friday-banner img { display: block; max-width: 100%; height: auto; margin: 0; padding: 0 } .black-friday-banner { background: url('+bg+') no-repeat center center; background-size: cover; padding: 10px; position: relative; z-index: 999999; } .black-friday-banner-content { width: 100%; max-width: 1200px; margin: 0 auto } .black-friday-banner-list { display: flex; justify-content: center; align-items: center; margin: -10px } .black-friday-banner-item { padding: 22px 20px; } .black-friday-banner-date .black-friday-banner-item{ padding:10px; } .black-friday-banner-date { font-family: sans-serif; display: inline-block; font-size: 26px; font-weight: 700; text-transform: uppercase; padding: 12px 16px; background-color: #eeca20; color: #141213; transform: skew(-14deg) } .black-friday-banner-date-text { display: inline-block; white-space: nowrap; transform: skew(14deg) } @media only screen and (max-width:640px) { .black-friday-banner-date { font-size: 22px; padding: 10px 14px } .black-friday-banner-date .black-friday-banner-item { padding: 0; } } @media only screen and (max-width:480px) { .black-friday-banner-list { flex-wrap: wrap } .black-friday-banner-date, .black-friday-banner-date-text { transform: skew(0); } .black-friday-banner-date{ width: 100%; text-align: center; } }';
    var styleEle = document.createElement('style');
    styleEle.rel = 'stylesheet';
    styleEle.type = 'text/css';
    styleEle.innerHTML = styles;
    document.head.append(styleEle);

    var banner = document.createElement('div');
    banner.classList.add('black-friday-banner');

    var bannerContent = document.createElement('div');
    bannerContent.classList.add('black-friday-banner-content');

    var bannerList = document.createElement('ul');
    bannerList.classList.add('black-friday-banner-list');

    var bannerItemImage = document.createElement('li');
    bannerItemImage.classList.add('black-friday-banner-item');

    var bannerImage = document.createElement('img');
    bannerImage.setAttribute('src', logo);

    var bannerItemDate = document.createElement('li');
    bannerItemDate.classList.add('black-friday-banner-item');


    var bannerDateDiv = document.createElement('div');
    bannerDateDiv.classList.add('black-friday-banner-date');

    var bannerDate = document.createElement('span');
    bannerDate.classList.add('black-friday-banner-date-text');
    bannerDate.innerHTML = from + ' - ' + to;

    // li
    bannerItemImage.append(bannerImage);
    bannerItemDate.append(bannerDate);
    // li
    bannerDateDiv.append(bannerItemDate);

    // ul
    bannerList.append(bannerItemImage)
    bannerList.append(bannerDateDiv)
    // ul

    bannerContent.append(bannerList);
    banner.append(bannerContent);
    var firstChild = document.body.firstChild;
    firstChild.parentNode.insertBefore(banner, firstChild);
}

var todayDate = new Date();
var theEventStartDate,theEventEndDate;

var events = {
  blackFriday: {
    startDate: todayDate.getFullYear() + '-11-25',
    startTime:'00:00:00',
    endDate: todayDate.getFullYear() + '-12-01',
    endTime:'23:59:59',
    img:{
      logo: 'https://raw.githubusercontent.com/biorkes/Events-banner/master/black-friday/logo.png',
      bg: 'https://raw.githubusercontent.com/biorkes/Events-banner/master/black-friday/bf-bg.jpg'
    }
  },
  cyberMonday: {
    startDate: todayDate.getFullYear() + '-12-02',
    startTime: '00:00:00',
    endDate: todayDate.getFullYear() + '-12-02',
    endTime: '23:59:59',
    img:{
      logo: 'https://raw.githubusercontent.com/biorkes/Events-banner/master/cyber-monday/cyber-monday.png',
      bg: 'https://raw.githubusercontent.com/biorkes/Events-banner/master/cyber-monday/cyber-monday-bg.jpg'
    }
  }
};


for(var event in events){
  
  var theEventStartDate = new Date(events[ event ].startDate+'T'+events[ event ].startTime+'Z');
  var theEventEndDate = new Date(events[ event ].endDate+'T'+events[ event ].endTime+'Z');
  
  if (todayDate >= theEventStartDate && theEventEndDate > todayDate) {
    var dateStarts = new Date(events[ event ].startDate);
    var dateEnds = new Date(events[ event ].endDate);
    var from = dateStarts.getDate() + '.' + (dateStarts.getMonth() + 1);
    var to = dateEnds.getDate() + '.' + (dateEnds.getMonth() + 1);

    Event( from, to, events[ event ].img.bg, events[ event ].img.logo);
  }
}