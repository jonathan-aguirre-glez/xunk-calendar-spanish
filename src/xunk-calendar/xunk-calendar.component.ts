import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'xunk-calendar',
    templateUrl: './xunk-calendar.component.html',
    styleUrls: ['./xunk-calendar.component.css']
  })
  export class XunkCalendarComponent implements OnInit {

    /** Today */
    @Input() public today;

    /** The page open with [xx, month, year] */
    @Input() public openPage;

    /** Currently selected date */
    @Input() public selectedDate;

    /** Array with all the calendar data */
    @Input() public calendar: any[] = [];

    /** RGB for heat map */
    @Input() public RGB_HM: any = {R: 0, G: 255, B: 0};

    @Input() public heatmap = {};

    /** Emits the new date on change */
    @Output() change: EventEmitter<any> = new EventEmitter();

    /** Constants */
    public readonly monthNames =
      [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];
    public readonly dayNames =
      [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thrusday', 'Friday', 'Saturday'
      ];

    /* Get today's date */
    public static getToday(): any {
      const dateNow = new Date();
      return {
        date: dateNow.getDate(),
        month: dateNow.getMonth(),
        year: dateNow.getFullYear()
      };
    }

    /** CalendarComponent */
    constructor() {
      /* Initialize */
      this.calendar = [];

      this.today = XunkCalendarComponent.getToday();
      this.openPage = {...this.today};
      this.selectedDate = {...this.today};
    }

    ngOnInit() {
      /* Display initial */
      this.displayCalendar();
    }

    /**
     * Returns true if two dates are the same
     * with the date taken separately
     */
    public sameDate(date, a, b): boolean {
      return date === b.date &&
             a.month === b.month &&
             a.year === b.year;
    }

    /** Returns true if fab! */
    public isFab(col: number): string {
      /* Check if date is selected */
      if (this.sameDate(col, this.openPage, this.selectedDate)) {
        return 'primary';
      }

      /* No matches found */
      return '';
    }

    /** Returns 'primary' if col is today */
    isToday(col: number): string {
      if (this.sameDate(col, this.openPage, this.today)) {
        return 'primary';
      }
      return '';
    }

    /** Select a day in the open page */
    public selectDay(col: number) {
      this.selectedDate.date = col;
      this.selectedDate.month = this.openPage.month;
      this.selectedDate.year = this.openPage.year;
      this.change.emit(this.selectedDate);
    }

    /** Change the month +1 or -1 */
    public changeMonth(diff: number) {
      this.openPage.month += diff;

      /* See if the year switches */
      if (this.openPage.month >= 12 ) {
        this.openPage.month = 0;
        this.openPage.year++;
      }

      if (this.openPage.month < 0 ) {
        this.openPage.month = 11;
        this.openPage.year--;
      }

      /* Refresh */
      this.displayCalendar();
    }

    /** Compute the calendar */
    public displayCalendar() {
      /* Generate a new object */
      const newCalendar = [[]];

      const month = this.openPage.month;
      const year = this.openPage.year;

      /* Days in next month, and day of week */
      let col = new Date(year, month, 0).getDay();
      let row = 0, counter = 1;
      const numOfDays = Number(this.getDaysOfMonth(month, year));

      /* Loop to build the calendar body */
      while (counter <= numOfDays) {
         /* When to start new line */
         if (col > 6) {
             col = 0;
             newCalendar[++row] = [];
         }

         /* Set the value and increment */
         newCalendar[row][col++] = counter++;
      }

      /* Set the calendar to the newly computed one */
      this.calendar = newCalendar;
    }

    /** Gets the DaysPerMonth array */
    public getDaysOfMonth(month: number, year: number): number {
      /* Check leap years if February */
      if (month === 1 && this.leapYear(year)) {
        return 29;
      }

      /** Return the number of days */
      return [31, 28, 31, 30, 31, 30,
        31, 31, 30, 31, 30, 31][month];
    }

    /** Returns true if leap year */
    public leapYear(year): boolean {
      return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    /** Gets the heat map color */
    public getHM(day): string {
      const ind = (this.zeropad(this.openPage.year, 4) + this.zeropad(this.openPage.month + 1, 2) + this.zeropad(day, 2));
      if (ind in this.heatmap) {
        return `rgba(${this.RGB_HM.R}, ${this.RGB_HM.G}, ${this.RGB_HM.B}, ${this.heatmap[ind]})`;
      } else {
        return 'inherit';
      }
    }

    /** Pad number with zeros */
    private zeropad(num, padlen, padchar = '0') {
        const pad_char = typeof padchar !== 'undefined' ? padchar : '0';
        const pad = new Array(1 + padlen).join(pad_char);
        return (pad + num).slice(-pad.length);
    }
}
