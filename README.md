# XunkCalendar Spanish

NOTE: This is a branch of the original Xunk-Calendar. The original was in English, and I made the changes to make use it in Spanish, also added certains features that I considered important. All the credit is due to the original Xunk Calendar. Part of the documentation has been develop by the original team. Thank you.

Link to original Xunk Calendar: https://github.com/radialapps/xunk-calendar

Took from original Github repo: 

"XunkCalendar is a simple calendar component with material design designed for Angular 6+ and Angular Material (might work with earlier versions too!). It allows creation of a heatmap for dates (with strange syntax, since this was designed for a specific project). Check the demo app's source for how to do this.
A live demo can be found at https://radialapps.github.io/xunk-calendar/"

# Installation

The package is hosted on npm, so you can install it just by

```Bash
npm install xunk-calendar-spanish
```

# Usage

First, import `XunkCalendarModule` into `app.module`. You may then use the component as
```HTML
<xunk-calendar [selectedDate]="selDate"></xunk-calendar>
```

`selectedDate` binds to a JSON object of the following format (say for 2018-02-16):
```javascript
{
  date: 16,
  month: 1,
  year: 18
}
```

Note that month starts with 0, but date starts with 1. To quickly make the initial selected date to today, you may do
```typescript
selDate = XunkCalendarModule.getToday();
```

## Events
`change` event gets triggered when you change the date in the calendar selects another date. Return an object of the type 
```javascript
{
  date: ,
  month: ,
  year: 
}
```

## Inputs 

```javascript
    @Input() public today;

    /** The page open with [xx, month, year] */
    @Input() public openPage;

    /** Currently selected date */
    @Input() public selectedDate;

    /** Array with all the calendar data */
    @Input() public calendar: any[] = [];

    /** Color for heat map */
    @Input() public heatMapColor = '#00ff00';

    /** Color for primary */
    @Input() public primaryColor = '#ff0000';

    /** Color for primary foreground */
    @Input() public primaryForeground = 'white';

    //The heatmap for the color in the background of the date
    @Input() public heatmap = {};

    //The object for badges over the date
    @Input() public badgesMap = {};
```

The heatmap receives an object with the day as key and a value between 0 and 1.
E.G. The heatmap in the demo is 
```javascript
   {'yyyyMM02': 1.0, 'yyyyMM06': 0.1, 'yyyyMM08': 0.4, 'yyyyMM13': 0.7, 'yyyyMM15': 0.3, 'yyyyMM21': 0.1, 'yyyyMM24': 0.5}
   
   //For the month of September 2018
   {'20180902': 1.0, '20180906': 0.1, '20180908': 0.4, '20180913': 0.7, '20180915': 0.3, '20180921': 0.1, '20180924': 0.5}
```

For the badges in the day icons you use a object where the key is the day and the value is the number in the badge.
![alt text](https://i.imgur.com/QpiKWnk.png "Badges Example")

for the following calendar we have the following value for the badgesMap input.

```javascript
   {05: 1, 10: 1, 12: 1, 14: 1, 17:3}   
```

# Work in Progress
- An event for the change of month
- Adaptative months and languages for different cultures 
- Color modification: Currently it only uses the default colors you have in Material Angular Theme (Example: deeppurple-amber)



# Dependencies
The component makes use of `mat-icon` and `mat-button` from `@angular/material`. You may need other dependencies in `package.json` to build the module.

# Known Issues
Currently, the selectedDate object has to be initialized properly, and a minimal initialization looks like
```typescript
public selDate = { date:1, month:1, year:1 };

ngOnInit() {
  this.selDate = XunkCalendarModule.getToday();
}
```

# Contributing
Contributing is free! You are welcome to criticize, help write code, file bugs or give me a lesson on how to properly comment code! If there is one thing, since circleci's build will test for it, it is absolutely imperative to lint your code (with `ng lint`).
